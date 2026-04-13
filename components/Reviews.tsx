'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { getIcon } from './kapelnicy/icon-map'

const TWO_GIS_IFRAME_ID = 'big_light_70000001110881050'

const TWO_GIS_WIDGET_HTML = `
<head>
  <script type="text/javascript">
    window.__size__='big';
    window.__theme__='light';
    window.__branchId__='';
    window.__orgId__='70000001110881050';
  </script>
  <script crossorigin="anonymous" type="module" src="https://disk.2gis.com/widget-constructor/assets/iframe.js"></script>
  <link rel="modulepreload" crossorigin="anonymous" href="https://disk.2gis.com/widget-constructor/assets/defaults.js">
  <link rel="stylesheet" crossorigin="anonymous" href="https://disk.2gis.com/widget-constructor/assets/defaults.css">
</head>
<body>
  <div id="iframe"></div>
</body>
`

export default function Reviews() {
  useEffect(() => {
    const iframe = document.getElementById(TWO_GIS_IFRAME_ID) as HTMLIFrameElement | null
    if (!iframe?.contentWindow) return

    const doc = iframe.contentWindow.document
    doc.open()
    doc.write(TWO_GIS_WIDGET_HTML)
    doc.close()
  }, [])

  return (
    <section id="reviews" className="section-spacing bg-beige-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-olive-primary">
              {getIcon('star')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-olive-primary font-light">
              Отзывы
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-3 sm:p-4 shadow-premium border border-olive-primary/10"
          >
            <h3 className="text-xl sm:text-2xl font-heading text-olive-primary mb-3">
              Яндекс Карты
            </h3>
            <div className="w-full h-[620px] sm:h-[760px] overflow-hidden relative rounded-xl">
              <iframe
                title="Отзывы о клинике BIORISE на Яндекс Картах"
                className="w-full h-full border border-[#e6e6e6] rounded-lg box-border"
                src="https://yandex.ru/maps-reviews-widget/49644656538?comments"
                loading="lazy"
              />
              <a
                href="https://yandex.com/maps/org/biorayz/49644656538/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 left-0 w-full px-4 text-center overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-[#b3b3b3]"
                style={{ fontFamily: 'YS Text, sans-serif' }}
              >
                Биорайз на карте Самары — Яндекс Карты
              </a>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-2xl p-3 sm:p-4 shadow-premium border border-olive-primary/10"
          >
            <h3 className="text-xl sm:text-2xl font-heading text-olive-primary mb-3">
              2ГИС
            </h3>
            <div className="w-full h-[620px] sm:h-[760px] overflow-hidden rounded-xl border border-[#e6e6e6]">
              <iframe
                id={TWO_GIS_IFRAME_ID}
                title="Отзывы о клинике BIORISE в 2ГИС"
                frameBorder="0"
                className="w-full h-full"
                sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                loading="lazy"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
