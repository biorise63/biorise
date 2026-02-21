'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function BioimpedanceContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-beige-background to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-olive-primary mb-6 font-light">
              Биоимпедансный анализ композитного состава тела
            </h1>
            <p className="text-lg md:text-xl text-olive-primary/80 max-w-3xl mx-auto leading-relaxed">
              Метод оценки состава тела по электрическому сопротивлению тканей. Аппараты МЕДАСС применяются в клиниках, спортивной медицине и диетологии для быстрой и неинвазивной диагностики.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="/bioimpedance.png"
                alt="Аппарат МЕДАСС для биоимпедансного анализа"
                fill
                className="object-contain bg-beige-background p-4"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principle Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Принцип работы
              </h2>
            </div>
            
            <div className="space-y-6 text-olive-primary text-base md:text-lg leading-relaxed">
              <p>
                Через тело пропускается слабый безопасный переменный ток.
              </p>
              <p>
                <strong className="font-semibold">Разные ткани проводят ток по-разному:</strong>
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-olive-primary mt-1">•</span>
                  <span><strong>мышечная ткань и жидкости</strong> - хорошо проводят</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-olive-primary mt-1">•</span>
                  <span><strong>жировая ткань</strong> - оказывает большее сопротивление</span>
                </li>
              </ul>
              <p>
                На основе измерений рассчитываются показатели состава тела.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Shows Section */}
      <section className="py-16 bg-beige-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Что показывает анализ
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-olive-primary mb-6 leading-relaxed">
              Аппарат МЕДАСС позволяет определить:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'общую массу тела',
                'жировую массу и процент жира',
                'безжировую массу',
                'активную клеточную массу',
                'скелетно-мышечную массу',
                'общую воду организма',
                'внутриклеточную и внеклеточную жидкость',
                'основной обмен',
                'фазовый угол',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-olive-primary/10"
                >
                  <div className="text-olive-primary mt-1 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-olive-primary text-base md:text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-olive-primary/10 rounded-2xl border border-olive-primary/20">
              <p className="text-base md:text-lg text-olive-primary leading-relaxed">
                <strong className="font-semibold">Фазовый угол</strong> - важный показатель состояния клеточных мембран и общего метаболического статуса.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Procedure Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Как проходит процедура
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { step: '1', text: 'Пациент ложится на кушетку.' },
                { step: '2', text: 'На кисть и стопу накладываются одноразовые электроды.' },
                { step: '3', text: 'Измерение занимает 5-10 минут.' },
                { step: '4', text: 'Выдается протокол с результатами и интерпретацией.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-beige-background rounded-xl p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-olive-primary text-white flex items-center justify-center font-semibold">
                    {item.step}
                  </div>
                  <p className="text-olive-primary text-base md:text-lg leading-relaxed pt-2">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-olive-primary/5 rounded-xl border border-olive-primary/10">
              <p className="text-base md:text-lg text-olive-primary leading-relaxed">
                Процедура безболезненна и безопасна.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preparation Section */}
      <section className="py-16 bg-beige-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Подготовка к исследованию
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-olive-primary mb-6 leading-relaxed">
              Для точности результатов рекомендуется:
            </p>
            
            <div className="space-y-3">
              {[
                'не есть за 3-4 часа до процедуры',
                'не употреблять алкоголь за сутки',
                'не тренироваться за 12 часов',
                'проводить исследование в одно и то же время суток',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-olive-primary/10"
                >
                  <div className="text-olive-primary mt-1 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-olive-primary text-base md:text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Кому особенно полезен
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'людям, снижающим или набирающим вес',
                'спортсменам',
                'пациентам с метаболическими нарушениями',
                'при контроле программ питания',
                'в реабилитации',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-beige-background rounded-xl p-5 border border-olive-primary/10"
                >
                  <div className="text-olive-primary mt-1 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-olive-primary text-base md:text-lg leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contraindications Section */}
      <section className="py-16 bg-beige-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="text-olive-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="m10.29 3.86-8.37 14.5A1 1 0 0 0 2.76 20h18.48a1 1 0 0 0 .84-1.64l-8.37-14.5a1 1 0 0 0-1.68 0Z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-olive-primary font-light">
                Противопоказания
              </h2>
            </div>
            
            <div className="space-y-3">
              {[
                'наличие кардиостимулятора',
                'беременность - по решению врача',
                'выраженные отеки',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-olive-primary/10"
                >
                  <div className="text-olive-primary mt-1 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <span className="text-olive-primary text-base md:text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <a
              href="#booking"
              className="inline-block bg-olive-primary text-white px-8 lg:px-12 py-4 lg:py-5 rounded-full hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover transform hover:-translate-y-1 text-lg md:text-xl font-menu"
            >
              Получить консультацию
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
