import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { BookingModalProvider } from '@/components/BookingModalProvider'

export const metadata: Metadata = {
  title: 'BIORISE Самара - Клиника внутривенной терапии',
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

        {/* Top.Mail.Ru counter — грузим до интерактива, попадает в <head> */}
        <Script
          id="top-mail-ru"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _tmr = window._tmr || (window._tmr = []);
              _tmr.push({id: "3749593", type: "pageView", start: (new Date()).getTime()});
              (function (d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
              })(document, window, "tmr-code");
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://top-fwz1.mail.ru/counter?id=3749593;js=na" style={{ position: 'absolute', left: -9999 }} alt="Top.Mail.Ru" />
          </div>
        </noscript>
      </body>
    </html>
  )
}
