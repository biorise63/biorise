'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'

type VisitStatus = 'call' | 'booked' | 'came' | 'no_show' | 'cancelled'

type Visit = {
  id: number
  patient_id: number
  call_at: string | null
  booking_at: string | null
  service: string | null
  amount: number | null
  status: VisitStatus
  comment: string | null
  created_at: string
}

type Patient = {
  id: number
  phone: string
  visits: Visit[]
}

const STATUS_LABELS: Record<VisitStatus, string> = {
  call: 'Звонок',
  booked: 'Записан',
  came: 'Пришёл',
  no_show: 'Не пришёл',
  cancelled: 'Отмена',
}

const STATUS_COLORS: Record<VisitStatus, string> = {
  call: 'bg-[#EEE7DB] text-olive-text',
  booked: 'bg-[#DCE6D8] text-[#3F5A38]',
  came: 'bg-[#D8E6DD] text-[#2E6B46]',
  no_show: 'bg-[#F3D9D9] text-[#8C3B3B]',
  cancelled: 'bg-[#E6E1D8] text-[#6F7568]',
}

type Period = 'today' | 'week' | 'month' | 'all' | 'custom'

function formatPhone(e164: string) {
  const m = e164.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (!m) return e164
  return `+7 ${m[1]} ${m[2]}-${m[3]}-${m[4]}`
}

function formatDigitsLive(digits: string) {
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)].filter(Boolean)
  return parts
    .map((p, i) => (i === 0 ? p : (i === 1 ? ' ' : '-') + p))
    .join('')
}

function formatDateTime(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatMoney(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function toLocalInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function periodStart(period: Period, customFrom: string): Date | null {
  if (period === 'all') return null
  if (period === 'today') return startOfToday()
  if (period === 'week') {
    const d = startOfToday()
    d.setDate(d.getDate() - 6)
    return d
  }
  if (period === 'month') {
    const d = startOfToday()
    d.setDate(d.getDate() - 29)
    return d
  }
  if (period === 'custom' && customFrom) return new Date(customFrom)
  return null
}

function periodEnd(period: Period, customTo: string): Date | null {
  if (period === 'custom' && customTo) {
    const d = new Date(customTo)
    d.setHours(23, 59, 59, 999)
    return d
  }
  return null
}

const emptyForm = {
  phoneDigits: '',
  callAt: '',
  bookingAt: '',
  service: '',
  amount: '',
  status: 'call' as VisitStatus,
  comment: '',
}

export default function DirectTrackerContent() {
  const [patients, setPatients] = useState<Patient[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [period, setPeriod] = useState<Period>('month')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<VisitStatus | ''>('')

  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function loadRecords() {
    try {
      const res = await fetch('/api/direct-tracker/records')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setPatients(data.patients || [])
      setLoadError(null)
    } catch (e) {
      setLoadError('Не удалось загрузить данные. Проверьте подключение и обновите страницу.')
    }
  }

  useEffect(() => {
    loadRecords()
  }, [])

  const allServices = useMemo(() => {
    const set = new Set<string>()
    for (const p of patients || []) {
      for (const v of p.visits) {
        if (v.service) set.add(v.service)
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'))
  }, [patients])

  const existingPatientMatch = useMemo(() => {
    if (form.phoneDigits.length !== 10 || !patients) return null
    const phone = '+7' + form.phoneDigits
    return patients.find((p) => p.phone === phone) || null
  }, [form.phoneDigits, patients])

  const filtered = useMemo(() => {
    if (!patients) return []
    const start = periodStart(period, customFrom)
    const end = periodEnd(period, customTo)
    const searchDigits = searchPhone.replace(/\D/g, '')

    const result: Patient[] = []
    for (const p of patients) {
      if (searchDigits && !p.phone.replace(/\D/g, '').includes(searchDigits)) continue

      const visits = p.visits.filter((v) => {
        if (serviceFilter && v.service !== serviceFilter) return false
        if (statusFilter && v.status !== statusFilter) return false
        const ref = v.call_at || v.created_at
        const refDate = ref ? new Date(ref) : null
        if (start && (!refDate || refDate < start)) return false
        if (end && (!refDate || refDate > end)) return false
        return true
      })

      if (visits.length > 0) {
        result.push({ ...p, visits })
      }
    }

    result.sort((a, b) => {
      const lastA = a.visits[a.visits.length - 1]
      const lastB = b.visits[b.visits.length - 1]
      const dateA = lastA.call_at || lastA.created_at
      const dateB = lastB.call_at || lastB.created_at
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

    return result
  }, [patients, period, customFrom, customTo, searchPhone, serviceFilter, statusFilter])

  const stats = useMemo(() => {
    const allVisits = filtered.flatMap((p) => p.visits.map((v) => ({ ...v, patientId: p.id })))
    const totalCalls = allVisits.length
    const uniquePatients = filtered.length
    const repeatPatients = filtered.filter((p) => p.visits.length >= 2).length
    const totalAmount = allVisits.reduce((sum, v) => sum + (v.amount || 0), 0)
    const paidVisitsCount = allVisits.filter((v) => v.amount).length
    const avgCheck = paidVisitsCount ? totalAmount / paidVisitsCount : 0
    const bookedCount = allVisits.filter((v) => v.booking_at).length
    const camePatients = new Set(allVisits.filter((v) => v.status === 'came').map((v) => v.patientId)).size

    return { totalCalls, uniquePatients, repeatPatients, totalAmount, avgCheck, bookedCount, camePatients }
  }, [filtered])

  function patientTotal(p: Patient) {
    return p.visits.reduce((sum, v) => sum + (v.amount || 0), 0)
  }

  function patientServices(p: Patient) {
    const set = new Set(p.visits.map((v) => v.service).filter(Boolean) as string[])
    return Array.from(set).join(', ') || '—'
  }

  function openAddModal() {
    setForm({ ...emptyForm, callAt: toLocalInputValue(new Date()) })
    setSaveError(null)
    setModalOpen(true)
  }

  async function handleSave() {
    if (form.phoneDigits.length !== 10) {
      setSaveError('Укажите номер телефона полностью (10 цифр после +7)')
      return
    }
    setSaving(true)
    setSaveError(null)
    try {
      const res = await fetch('/api/direct-tracker/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+7' + form.phoneDigits,
          callAt: form.callAt ? new Date(form.callAt).toISOString() : null,
          bookingAt: form.bookingAt ? new Date(form.bookingAt).toISOString() : null,
          service: form.service,
          amount: form.amount,
          status: form.status,
          comment: form.comment,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setSaveError(data.message || 'Не удалось сохранить запись')
        return
      }
      setModalOpen(false)
      await loadRecords()
    } catch {
      setSaveError('Не удалось сохранить запись. Проверьте подключение.')
    } finally {
      setSaving(false)
    }
  }

  function updateVisitLocal(visitId: number, patch: Partial<Visit>) {
    setPatients((prev) =>
      prev?.map((p) => ({
        ...p,
        visits: p.visits.map((v) => (v.id === visitId ? { ...v, ...patch } : v)),
      })) ?? prev
    )
  }

  async function handleUpdateVisit(visitId: number, patch: { status?: VisitStatus; comment?: string }) {
    updateVisitLocal(visitId, patch)
    try {
      const res = await fetch(`/api/direct-tracker/records/${visitId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error()
    } catch {
      window.alert('Не удалось сохранить изменение, попробуйте ещё раз.')
      await loadRecords()
    }
  }

  async function handleDeleteVisit(visitId: number) {
    if (!window.confirm('Удалить эту запись безвозвратно?')) return
    try {
      const res = await fetch(`/api/direct-tracker/records/${visitId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      await loadRecords()
    } catch {
      window.alert('Не удалось удалить запись.')
    }
  }

  function exportCsv() {
    const rows = [
      ['Телефон', 'Дата первого звонка', 'Дата последнего звонка', 'Количество обращений', 'Услуги', 'Общая сумма', 'История обращений', 'Комментарии'],
    ]
    for (const p of filtered) {
      const first = p.visits[0]
      const last = p.visits[p.visits.length - 1]
      const history = p.visits
        .map((v) => `${formatDateTime(v.call_at)} - ${v.service || 'без услуги'} - ${v.amount ? formatMoney(v.amount) : '—'} - ${STATUS_LABELS[v.status]}`)
        .join(' | ')
      const comments = p.visits.map((v) => v.comment).filter(Boolean).join(' | ')
      rows.push([
        formatPhone(p.phone),
        formatDateTime(first.call_at),
        formatDateTime(last.call_at),
        String(p.visits.length),
        patientServices(p),
        String(patientTotal(p)),
        history,
        comments,
      ])
    }
    const csv = '﻿' + rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `direct-tracker-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-beige-background p-4 text-olive-text sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-heading font-light text-olive-primary sm:text-3xl">
            Учёт заявок с Яндекс Директа
          </h1>
          <button
            onClick={openAddModal}
            className="rounded-full bg-olive-primary px-6 py-3 text-sm font-semibold text-white shadow-premium transition-colors hover:bg-olive-light"
          >
            + Добавить запись
          </button>
        </div>

        {loadError && (
          <div className="mb-6 rounded-2xl border border-[#8C3B3B]/30 bg-[#F3D9D9] px-4 py-3 text-sm text-[#8C3B3B]">
            {loadError}
          </div>
        )}

        {/* Статистика */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {[
            ['Всего звонков', stats.totalCalls],
            ['Уникальных пациентов', stats.uniquePatients],
            ['Повторных обращений', stats.repeatPatients],
            ['Общая сумма', formatMoney(stats.totalAmount)],
            ['Средний чек', formatMoney(Math.round(stats.avgCheck))],
            ['Количество записей', stats.bookedCount],
            ['Пришло пациентов', stats.camePatients],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-2xl border border-olive-primary/10 bg-white/85 p-4 shadow-premium">
              <div className="text-xs text-olive-primary/60">{label}</div>
              <div className="mt-1 text-xl font-heading font-light text-olive-primary">{value}</div>
            </div>
          ))}
        </div>

        {/* Панель фильтров */}
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-olive-primary/10 bg-white/70 p-4">
          <div>
            <label className="mb-1 block text-xs text-olive-primary/70">Период</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
            >
              <option value="today">Сегодня</option>
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
              <option value="all">Всё время</option>
              <option value="custom">Произвольный период</option>
            </select>
          </div>
          {period === 'custom' && (
            <>
              <div>
                <label className="mb-1 block text-xs text-olive-primary/70">С</label>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-olive-primary/70">По</label>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
                />
              </div>
            </>
          )}
          <div>
            <label className="mb-1 block text-xs text-olive-primary/70">Поиск по телефону</label>
            <input
              type="text"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="999 111-22-33"
              className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-olive-primary/70">Услуга</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
            >
              <option value="">Все услуги</option>
              {allServices.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-olive-primary/70">Статус</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as VisitStatus | '')}
              className="rounded-lg border border-olive-primary/20 bg-white px-3 py-2 text-sm"
            >
              <option value="">Все статусы</option>
              {(Object.keys(STATUS_LABELS) as VisitStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <button
            onClick={exportCsv}
            className="rounded-lg border border-olive-primary/30 bg-white px-4 py-2 text-sm font-medium text-olive-primary transition-colors hover:bg-olive-primary/10"
          >
            Экспорт CSV
          </button>
        </div>

        {/* Таблица */}
        <div className="overflow-x-auto rounded-2xl border border-olive-primary/10 bg-white/85 shadow-premium">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-olive-primary/10 text-left text-xs text-olive-primary/60">
                <th className="px-4 py-3 font-medium">Телефон</th>
                <th className="px-4 py-3 font-medium">Первый звонок</th>
                <th className="px-4 py-3 font-medium">Последний звонок</th>
                <th className="px-4 py-3 font-medium">Обращений</th>
                <th className="px-4 py-3 font-medium">Услуги</th>
                <th className="px-4 py-3 font-medium">Сумма</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {patients === null && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-olive-primary/50">Загрузка...</td></tr>
              )}
              {patients !== null && filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-olive-primary/50">Нет записей за выбранный период</td></tr>
              )}
              {filtered.map((p) => {
                const last = p.visits[p.visits.length - 1]
                const isOpen = expandedPatientId === p.id
                return (
                  <Fragment key={p.id}>
                    <tr
                      onClick={() => setExpandedPatientId(isOpen ? null : p.id)}
                      className="cursor-pointer border-b border-olive-primary/5 transition-colors hover:bg-olive-primary/5"
                    >
                      <td className="px-4 py-3 font-medium text-olive-primary">{formatPhone(p.phone)}</td>
                      <td className="px-4 py-3">{formatDateTime(p.visits[0].call_at)}</td>
                      <td className="px-4 py-3">{formatDateTime(last.call_at)}</td>
                      <td className="px-4 py-3">{p.visits.length}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate" title={patientServices(p)}>{patientServices(p)}</td>
                      <td className="px-4 py-3">{formatMoney(patientTotal(p))}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[last.status]}`}>
                          {STATUS_LABELS[last.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-olive-primary/40">{isOpen ? '▲' : '▼'}</td>
                    </tr>
                    {isOpen && (
                      <tr key={`${p.id}-history`}>
                        <td colSpan={8} className="bg-beige-background/60 px-4 py-3">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-left text-olive-primary/60">
                                <th className="py-1.5 pr-3 font-medium">Дата звонка</th>
                                <th className="py-1.5 pr-3 font-medium">Дата записи</th>
                                <th className="py-1.5 pr-3 font-medium">Услуга</th>
                                <th className="py-1.5 pr-3 font-medium">Сумма</th>
                                <th className="py-1.5 pr-3 font-medium">Статус</th>
                                <th className="py-1.5 pr-3 font-medium">Комментарий</th>
                                <th className="py-1.5 font-medium"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {p.visits.map((v) => (
                                <tr key={v.id} className="border-t border-olive-primary/10">
                                  <td className="py-1.5 pr-3">{formatDateTime(v.call_at)}</td>
                                  <td className="py-1.5 pr-3">{formatDateTime(v.booking_at)}</td>
                                  <td className="py-1.5 pr-3">{v.service || '—'}</td>
                                  <td className="py-1.5 pr-3">{v.amount ? formatMoney(v.amount) : '—'}</td>
                                  <td className="py-1.5 pr-3" onClick={(e) => e.stopPropagation()}>
                                    <select
                                      value={v.status}
                                      onChange={(e) => handleUpdateVisit(v.id, { status: e.target.value as VisitStatus })}
                                      className={`rounded-full border-0 px-2 py-0.5 text-[11px] font-medium ${STATUS_COLORS[v.status]}`}
                                    >
                                      {(Object.keys(STATUS_LABELS) as VisitStatus[]).map((s) => (
                                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="py-1.5 pr-3" onClick={(e) => e.stopPropagation()}>
                                    <input
                                      type="text"
                                      defaultValue={v.comment || ''}
                                      onBlur={(e) => {
                                        if (e.target.value !== (v.comment || '')) {
                                          handleUpdateVisit(v.id, { comment: e.target.value })
                                        }
                                      }}
                                      placeholder="Добавить комментарий"
                                      className="w-full max-w-[220px] rounded-md border border-transparent bg-transparent px-1 py-0.5 text-xs transition-colors hover:border-olive-primary/20 focus:border-olive-primary/30 focus:bg-white focus:outline-none"
                                    />
                                  </td>
                                  <td className="py-1.5">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleDeleteVisit(v.id) }}
                                      className="text-olive-primary/40 transition-colors hover:text-[#8C3B3B]"
                                      title="Удалить запись"
                                    >
                                      ✕
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-heading font-light text-olive-primary">Новая запись</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-olive-primary/70">Телефон</label>
                <div className="flex items-center gap-2 rounded-lg border border-olive-primary/20 bg-white px-3 py-2">
                  <span className="font-medium text-olive-primary">+7</span>
                  <input
                    type="tel"
                    value={formatDigitsLive(form.phoneDigits)}
                    onChange={(e) => setForm((f) => ({ ...f, phoneDigits: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    placeholder="999 111-22-33"
                    className="w-full text-sm outline-none"
                    autoFocus
                  />
                </div>
                {existingPatientMatch && (
                  <p className="mt-1 text-xs text-olive-primary/70">
                    Этот номер уже есть в базе: {existingPatientMatch.visits.length} обращени{existingPatientMatch.visits.length === 1 ? 'е' : 'й'}, последнее - {formatDateTime(existingPatientMatch.visits[existingPatientMatch.visits.length - 1].call_at)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-olive-primary/70">Дата и время звонка</label>
                  <input
                    type="datetime-local"
                    value={form.callAt}
                    onChange={(e) => setForm((f) => ({ ...f, callAt: e.target.value }))}
                    className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-olive-primary/70">Дата и время записи</label>
                  <input
                    type="datetime-local"
                    value={form.bookingAt}
                    onChange={(e) => setForm((f) => ({ ...f, bookingAt: e.target.value }))}
                    className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-olive-primary/70">Услуга</label>
                <input
                  type="text"
                  list="dt-services"
                  value={form.service}
                  onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                  placeholder="Например, капельница Детокс"
                  className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                />
                <datalist id="dt-services">
                  {allServices.map((s) => <option key={s} value={s} />)}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-olive-primary/70">Сумма, ₽</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    placeholder="0"
                    className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-olive-primary/70">Статус</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as VisitStatus }))}
                    className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                  >
                    {(Object.keys(STATUS_LABELS) as VisitStatus[]).map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-olive-primary/70">Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-olive-primary/20 px-3 py-2 text-sm"
                />
              </div>

              {saveError && <p className="text-sm text-[#8C3B3B]">{saveError}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full border border-olive-primary/30 px-5 py-2.5 text-sm font-medium text-olive-primary"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-full bg-olive-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-olive-light disabled:opacity-60"
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
