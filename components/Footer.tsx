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
            <div className="flex flex-col gap-3 mt-4">
              <p className="text-white/80 text-sm font-semibold">Мы в соцсетях:</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://t.me/biorise_smr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
                <a
                  href="https://vk.ru/biorise63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.095-1.492.077-1.492.077l-.35-.5s-.525-.722-1.184-1.45c-.72-.84-1.732-2.45-1.732-2.45s-.105-.21.015-.33c.105-.105.35-.21.35-.21s2.85-2.55 3.195-2.85c.21-.15.35-.105.35.015 0 .15.015.945.015.945s.09 1.35-.21 1.65c-.21.21-.525.525-.525.525s-.09.12-.015.24c.06.12.24.24.42.36.36.24.75.525 1.05.84.735.735 1.23 1.545 1.23 1.545s.09.18.015.3c-.06.12-.21.21-.21.21l-.525.36s-.39.24-.75.015c-.24-.15-1.545-1.545-2.1-2.55-.15-.24-.09-.36 0-.48.06-.09.24-.24.36-.36.36-.36.75-.75 1.05-1.05.15-.15.24-.24.15-.36-.09-.12-.24-.24-.24-.24l-.66-.51s-.525-.39-.15-.75c.24-.24.75-.75 1.35-1.35.66-.66 1.23-1.23 1.545-1.545.24-.24.36-.18.36-.03 0 .24.015.615.015.615s-.015.525.09.75c.09.24.3.36.3.36l1.05.69s.21.12.3.24c.09.12.09.24.09.24s-.015 1.05-.015 1.545c0 .495.09.75.24.84.15.09.36.09.36.09h.84c.15 0 .24.09.24.24 0 .15-.09.24-.24.24z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/biorise_samara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
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
