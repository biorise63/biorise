'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const clinicAddresses = [
  'г. Самара ул. Дыбенко 27Б',
  'г. Самара ул. Стара Загора 48',
  'г. Самара ул. Молодежная 18',
]

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: clinicAddresses[0],
  })

  const [consent, setConsent] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const addressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setIsAddressOpen(false)
      }
    }

    if (isAddressOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAddressOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        // Очистка формы
        setFormData({
          name: '',
          phone: '',
          address: clinicAddresses[0],
        })
        setConsent(true)
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
      } else {
        setSubmitStatus('error')
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.')
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      setSubmitStatus('error')
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddressSelect = (address: string) => {
    setFormData({
      ...formData,
      address,
    })
    setIsAddressOpen(false)
  }

  return (
    <section id="booking" className="section-spacing bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary mb-4 font-light">
            ОНЛАЙН ЗАПИСЬ
          </h2>
          <p className="text-base sm:text-lg text-olive-primary/70 max-w-2xl mx-auto">
            Оставьте свои данные и наши специалисты перезвонят вам, чтобы подобрать удобную дату и время приёма
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-beige-background rounded-2xl p-6 sm:p-8 md:p-12 shadow-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading"
                  placeholder="Имя"
                />
              </div>
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading"
                  placeholder="Телефон"
                />
              </div>
            </div>
            
            <div className="mb-6 relative" ref={addressRef}>
              <div
                onClick={() => setIsAddressOpen(!isAddressOpen)}
                className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all font-heading cursor-pointer flex items-center justify-between"
              >
                <span>{formData.address}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-olive-primary transition-transform ${isAddressOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              {isAddressOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-beige-accent rounded-lg shadow-premium overflow-hidden">
                  {clinicAddresses.map((address, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAddressSelect(address)}
                      className={`w-full text-left px-4 py-3 hover:bg-beige-background transition-colors font-heading ${
                        formData.address === address ? 'bg-beige-background text-olive-primary font-medium' : 'text-olive-primary'
                      }`}
                    >
                      {address}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5 rounded border-beige-accent text-olive-primary focus:ring-olive-primary focus:ring-2"
                />
                <span className="text-sm text-olive-primary font-heading leading-relaxed">
                  Я подтверждаю, что ознакомлен и даю согласие на обработку персональных данных на условиях и для целей, определяемых{' '}
                  <a href="https://biorise-clinic.ru/privacy/" className="text-olive-primary underline hover:text-olive-light">
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className={`w-full px-8 py-4 rounded-full text-lg transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 font-medium font-heading ${
                isSubmitting || !consent
                  ? 'bg-olive-primary/50 text-white cursor-not-allowed'
                  : 'bg-olive-primary text-white hover:bg-olive-light'
              }`}
            >
              {isSubmitting ? 'Отправка...' : 'Записаться на прием'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
