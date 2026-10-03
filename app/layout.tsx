import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { BookingModalProvider } from '@/components/BookingModalProvider'
import FloatingCallButton from '@/components/FloatingCallButton'
import CookieConsentBanner from '@/components/CookieConsentBanner'

export const metadata: Metadata = {
  title: 'BIORISE - Клиника капельниц в Самаре',
  description:
    'Клиника капельниц BIORISE в Самаре. Витаминные, детокс и восстановительные капельницы под контролем врача. Индивидуальный подбор IV-терапии, анализы и чек-ап организма.',
  keywords: [
    'биорайз самара',
    'biorise самара',
    'клиника капельниц самара',
    'витаминные капельницы самара',
    'инфузионная терапия самара',
    'медицинские капельницы самара',
    'капельница для энергии самара',
    'капельницы для иммунитета самара',
    'капельницы детокс самара',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon-96x96.png',
  },
  other: {
    'yandex-verification': 'ff70510bc15914e1',
    'google-site-verification': 'g5FhGHeugsuOVMZ-ED5LFpAnImcONe7Tb30-qJizZT8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <BookingModalProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <FloatingCallButton />
          <CookieConsentBanner />
        </BookingModalProvider>

        {/* Яндекс.Метрика - невидимый счетчик. На зеркале biorise-clinics.ru
            (намеренно закрытом от индексации, см. yc-pipeline/nginx/biorise-clinics-mirror.conf)
            работает отдельный счётчик 113363172, чтобы не смешивать трафик мёртвого
            домена со статистикой основного сайта. */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var __ymCounterId = (window.location.hostname === 'biorise-clinics.ru') ? 113363172 : 106878489;
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=' + __ymCounterId, 'ym');

              ym(__ymCounterId, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106878489"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  )
}
