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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: clinicAddresses[0],
    promoCode: defaultPromoCode,
  })
  const [consent, setConsent] = useState(true)
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
      await response.json()
      setFormData({ name: '', phone: '', address: clinicAddresses[0], promoCode: defaultPromoCode })
      setConsent(true)
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
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

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading'
  const selectClass =
    'w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary cursor-pointer flex items-center justify-between font-heading'

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`grid gap-4 ${compact ? '' : 'grid-cols-1 md:grid-cols-2 gap-6 mb-6'}`}>
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

      <div className="mt-5 mb-4">
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

      <div className="mb-4 relative" ref={addressRef}>
        <div
          onClick={() => setIsAddressOpen(!isAddressOpen)}
          className={`${selectClass} ${isAddressOpen ? 'ring-2 ring-olive-primary' : ''}`}
        >
          <span>{formData.address}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-olive-primary transition-transform ${isAddressOpen ? 'rotate-180' : ''}`}
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
                className={`w-full text-left px-4 py-3 hover:bg-beige-background transition-colors font-heading ${
                  formData.address === addr ? 'bg-beige-background text-olive-primary font-medium' : 'text-olive-primary'
                }`}
              >
                {addr}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-5 h-5 rounded border-beige-accent text-olive-primary focus:ring-olive-primary focus:ring-2"
          />
          <span className="text-sm text-olive-primary font-heading leading-relaxed">
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
        className={`w-full px-6 py-3 rounded-full text-base font-medium font-heading transition-all ${
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
