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
                  className="text-white/80 hover:text-[#0088cc] transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c.169 1.858.896 6.424 1.262 8.5.14.78.21 1.33.18 1.54-.06.38-.21.51-.345.52-.285.02-.5-.19-.99-.67-2.75-2.44-3.84-3.38-4.08-3.17-.18.15-.28.9-.41 1.32-.23.75-.48 1.5-.7 1.93-.27.54-.54.73-.88.75-.73.04-1.28-.48-1.99-.94-.78-.5-1.22-.78-1.97-1.25-.84-.52-.3-.81.19-1.27.13-.12 2.35-2.16 2.4-2.34.01-.03.02-.15-.06-.21-.08-.07-.19-.04-.27-.03-.11.02-1.82 1.16-5.14 3.41-.49.33-.93.49-1.33.48-.44-.01-1.29-.25-1.92-.46-.77-.26-1.38-.4-1.33-.85.03-.22.4-.87 1.12-1.68 3.9-3.66 8.14-7.65 10.6-9.95.49-.46.93-.69 1.32-.66.34.02.88.18 1.28.68.09.12.07.14-.05.23z"/>
                  </svg>
                </a>
                <a
                  href="https://vk.ru/biorise63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#0077FF] transition-colors"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.785 16.241s.336-.041.509-.25c.162-.196.157-.562.157-.562s-.023-1.574.7-1.806c.714-.223 1.63 1.49 2.596 2.147.713.488 1.251.363 1.251.363l2.596-.037s1.357-.084.747-1.156c-.056-.09-.414-.87-2.13-2.463-1.8-1.68-1.557-.468.608-1.428 1.31-.732 1.835-1.178 1.67-1.528-.158-.337-1.139-.248-1.139-.248l-2.939.018s-.217-.015-.378.073c-.156.085-.256.28-.256.28s-.458 1.22-1.065 2.26c-1.285 2.03-1.8 2.137-2.008 2.01-.49-.3-.368-1.21-.368-1.855 0-2.013.304-2.85-.595-3.064-.298-.071-.516-.12-1.278-.128-1.63-.01-2.87.01-3.62.19-.17.043-.295.2-.217.207.24.02.784.15 1.073.549.38.52.367 1.35.367 1.35s.22 1.63-.51 1.83c-.498.135-1.18-.14-2.65-1.38-1.88-1.52-3.3-3.2-3.3-3.2s-.28-.44-.78-.48l-2.24.014s-.5.015-.684.23c-.166.19-.012.6-.012.6s2.24 5.24 4.77 7.88c2.32 2.35 4.96 2.2 4.96 2.2h1.19z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/biorise_samara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#E4405F] transition-colors"
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
