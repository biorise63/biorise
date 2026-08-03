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
            <p className="text-white/80 text-sm mt-2">
              <a href="/cookie-policy" className="hover:text-white transition-colors underline">
                Политика обработки cookie
              </a>
            </p>
            <p className="text-white/80 text-sm mt-2">
              <a href="/sitemap/" className="hover:text-white transition-colors underline">
                Карта сайта
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
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.665 3.447 17.03 19.139c-.26 1.176-.944 1.466-1.911.912l-5.278-3.897-2.548 2.453c-.283.283-.52.52-1.07.52l.383-5.436 9.9-8.94c.43-.382-.093-.594-.67-.212L5.58 11.82.314 10.17c-1.15-.36-1.176-1.15.24-1.7L19.067 2.04c.944-.34 1.77.212 1.599 1.407Z" />
                  </svg>
                </a>
                <a
                  href="https://vk.ru/biorise63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#0077FF] transition-colors"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.893 16.07h-1.32c-.493 0-.646-.399-1.54-1.3-.78-.77-1.125-.87-1.32-.87-.267 0-.344.077-.344.45v1.54c0 .32-.103.492-.95.492-1.4 0-2.958-1.507-4.224-4.312-1.709-3.556-2.026-4.95-2.026-5.212 0-.23.09-.45.84-.45h1.32c.38 0 .52.18.664.58.72 2.1 1.93 4.073 2.394 4.073.19 0 .28-.09.28-.57V8.45c-.06-1.01-.6-1.1-.6-1.46 0-.17.14-.34.35-.34h2.07c.44 0 .6.19.6.6v3.58c0 .34.15.46.24.46.19 0 .35-.12.69-.46.97-1.08 1.67-2.77 1.67-2.77.12-.28.33-.43.62-.43h1.32c.44 0 .53.22.44.52-.18.81-1.94 3.33-1.94 3.33-.16.26-.23.39 0 .65.17.2.72.7 1.07 1.13.66.75 1.16 1.38 1.29 1.81.14.43-.09.65-.55.65Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/biorise_samara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#E4405F] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0Zm12 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                  </svg>
                </a>
                <a
                  href="https://max.ru/join/I8dvtxIVQ_gEOELaXkiwDZPefgBrLT6ojztVLP17oiQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Мессенджер MAX"
                >
                  <svg className="w-6 h-6" viewBox="0 0 720 720" aria-hidden="true" fill="currentColor">
                    <path d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-heading mb-4">Режим работы</h3>
            <p className="text-white/80 text-sm mb-2">Будни: 8:00 - 19:00, сб: 8:00 - 15:00, вс: выходной</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>&copy; 2026 BIORISE Самара. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
