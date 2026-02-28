import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { BookingModalProvider } from '@/components/BookingModalProvider'

export const metadata: Metadata = {
  title: 'BIORISE Самара - Клиника внутривенной терапии',
  description: 'Индивидуальный подбор инфузионной терапии под контролем врача. Премиальная медицинская эстетика в Самаре.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon-96x96.png',
  },
  other: {
    'yandex-verification': 'ff70510bc15914e1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <BookingModalProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </BookingModalProvider>
        
        {/* Яндекс.Метрика - невидимый счетчик */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106878489', 'ym');

              ym(106878489, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
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
