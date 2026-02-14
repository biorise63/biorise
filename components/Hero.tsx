'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Фиксированная стоимость процедуры без доплат и скрытых платежей',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: 'Официальные препараты с регистрацией Минздрава РФ',
  },
]

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: '80px' }}>
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center bottom',
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-black mb-6 font-light leading-tight"
          >
            Клиника капельниц BIORISE в Самаре
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-black/90 mb-8 leading-relaxed"
          >
            Внутривенная терапия и инфузионная капельная терапия под контролем врача. Подбор состава по анализам и жалобам. Комплексный чек-ап организма.
          </motion.p>

          {/* Features with icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="space-y-4 mb-10"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-olive-primary flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <p className="text-base md:text-lg text-black/90 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#booking"
              className="bg-olive-primary text-white px-10 py-4 rounded-full text-lg hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 text-center"
            >
              Записаться на капельницу
            </a>
            <a
              href="#services"
              className="bg-white/95 text-olive-primary px-10 py-4 rounded-full text-lg hover:bg-white transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 text-center border-2 border-olive-primary"
            >
              Подобрать капельницу
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
