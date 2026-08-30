'use client'

import { useState, useRef, useEffect } from 'react'

export const clinicAddresses = [
  'г. Самара ул. Дыбенко 27Б',
  'г. Самара ул. Стара Загора 48',
  'г. Самара ул. Молодежная 18',
]

type BookingFormFieldsProps = {
  defaultPromoCode?: string
  submitButtonText?: string
  className?: string
  compact?: boolean
}

export default function BookingFormFields({
  defaultPromoCode = '',
  submitButtonText = 'Записаться на прием',
  className = '',
  compact = false,
}: BookingFormFieldsProps) {
  const TECH_MESSAGE = 'Свяжитесь, пожалуйста, с нами самостоятельно: на данный момент проводятся технические работы на сайте.'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: clinicAddresses[0],
    promoCode: defaultPromoCode,
  })
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const addressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, promoCode: defaultPromoCode }))
  }, [defaultPromoCode])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setIsAddressOpen(false)
      }
    }
    if (isAddressOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isAddressOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/online-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()

      if (response.ok && result?.success) {
        setFormData({ name: '', phone: '', address: clinicAddresses[0], promoCode: defaultPromoCode })
        setConsent(false)
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
      } else {
        alert(result?.message || TECH_MESSAGE)
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      alert(TECH_MESSAGE)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddressSelect = (address: string) => {
    setFormData({ ...formData, address })
    setIsAddressOpen(false)
  }

  const inputClass = compact
    ? 'w-full h-10 px-3 py-2 rounded-lg border border-beige-accent bg-white text-olive-primary text-sm focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading'
    : 'w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading'
  const selectClass = compact
    ? 'w-full h-10 px-3 py-2 rounded-lg border border-beige-accent bg-white text-olive-primary text-sm focus:outline-none focus:ring-2 focus:ring-olive-primary cursor-pointer flex items-center justify-between font-heading'
    : 'w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary cursor-pointer flex items-center justify-between font-heading'

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`grid ${compact ? 'gap-2 mb-2' : 'gap-4 grid-cols-1 md:grid-cols-2 gap-6 mb-6'}`}>
        <div>
          <input
            type="text"
            id="popup-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Имя"
          />
        </div>
        <div>
          <input
            type="tel"
            id="popup-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Телефон"
          />
        </div>
      </div>

      <div className={compact ? 'mt-2 mb-2' : 'mt-5 mb-4'}>
        <input
          type="text"
          id="popup-promoCode"
          name="promoCode"
          value={formData.promoCode}
          onChange={handleChange}
          className={inputClass}
          placeholder="Промокод (необязательно)"
        />
      </div>

      <div className={compact ? 'mb-2 relative' : 'mb-4 relative'} ref={addressRef}>
        <div
          onClick={() => setIsAddressOpen(!isAddressOpen)}
          className={`${selectClass} ${isAddressOpen ? 'ring-2 ring-olive-primary' : ''}`}
        >
          <span className="truncate">{formData.address}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 text-olive-primary transition-transform ${isAddressOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {isAddressOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-beige-accent rounded-lg shadow-premium overflow-hidden">
            {clinicAddresses.map((addr) => (
              <button
                key={addr}
                type="button"
                onClick={() => handleAddressSelect(addr)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-beige-background transition-colors font-heading ${
                  formData.address === addr ? 'bg-beige-background text-olive-primary font-medium' : 'text-olive-primary'
                }`}
              >
                {addr}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={compact ? 'mb-3' : 'mb-6'}>
        <label className={`flex cursor-pointer ${compact ? 'items-center gap-2' : 'items-start gap-3'}`}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className={compact ? 'w-4 h-4 shrink-0 rounded border-beige-accent text-olive-primary focus:ring-olive-primary focus:ring-2' : 'mt-1 w-5 h-5 rounded border-beige-accent text-olive-primary focus:ring-olive-primary focus:ring-2'}
          />
          <span className={compact ? 'text-[11px] sm:text-xs text-olive-primary font-heading leading-tight' : 'text-sm text-olive-primary font-heading leading-relaxed'}>
            Я подтверждаю согласие на обработку персональных данных в соответствии с{' '}
            <a href="https://biorise-clinic.ru/privacy/" className="text-olive-primary underline hover:text-olive-light">
              Политикой конфиденциальности
            </a>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !consent}
        className={`w-full rounded-full font-medium font-heading transition-all ${
          compact ? 'h-10 px-4 text-sm' : 'px-6 py-3 text-base'
        } ${
          isSubmitting || !consent
            ? 'bg-olive-primary/50 text-white cursor-not-allowed'
            : 'bg-olive-primary text-white hover:bg-olive-light'
        }`}
      >
        {isSubmitting ? 'Отправка...' : submitButtonText}
      </button>
    </form>
  )
}
