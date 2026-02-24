'use client'

import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-olive-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Премиальная клиника внутривенной терапии в Самаре. Индивидуальный подход к каждому пациенту.
            </p>
            <p className="text-white/80 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors underline">
                Политика конфиденциальности
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-heading mb-4">Контакты</h3>
            <p className="text-white/80 text-sm mb-2">ООО "МК Клиники Будущего"</p>
            <p className="text-white/80 text-sm mb-2">ИНН 6316291950</p>
            <p className="text-white/80 text-sm mb-2">ОГРН 1256300013441</p>
            <p className="text-white/80 text-sm mb-2">Юридический адрес: 443045, Самарская область, г. Самара, ул. Дыбенко, д. 27Б</p>
            <p className="text-white/80 text-sm mb-2">
              <a href="tel:+79967499747" className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+7 996 749 9747</span>
              </a>
            </p>
            <p className="text-white/80 text-sm mb-2">
              <a href="https://t.me/biorise_smr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Telegram: @biorise_smr
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-heading mb-4">Режим работы</h3>
            <p className="text-white/80 text-sm mb-2">Ежедневно: 8:00 - 20:00</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>&copy; 2026 BIORISE Самара. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
