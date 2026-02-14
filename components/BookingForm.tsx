'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
          email: '',
          service: '',
          date: '',
          time: '',
        })
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
            Онлайн-запись
          </h2>
          <p className="text-base sm:text-lg text-olive-primary/70 max-w-2xl mx-auto">
            Заполните форму, и мы свяжемся с вами для подтверждения записи
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
                <label htmlFor="name" className="block text-olive-primary mb-2 font-medium">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-olive-primary mb-2 font-medium">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-olive-primary mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="service" className="block text-olive-primary mb-2 font-medium">
                Услуга
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
              >
                <option value="">Выберите услугу</option>
                <option value="detox">Детокс</option>
                <option value="immuno">Иммуно суппорт</option>
                <option value="energy">Энергия +</option>
                <option value="beauty">Красота и омоложение</option>
                <option value="consultation">Консультация</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="date" className="block text-olive-primary mb-2 font-medium">
                  Дата
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-olive-primary mb-2 font-medium">
                  Время
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-beige-accent bg-white text-olive-primary focus:outline-none focus:ring-2 focus:ring-olive-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 rounded-full text-lg transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 font-medium ${
                isSubmitting
                  ? 'bg-olive-primary/50 text-white cursor-not-allowed'
                  : 'bg-olive-primary text-white hover:bg-olive-light'
              }`}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
