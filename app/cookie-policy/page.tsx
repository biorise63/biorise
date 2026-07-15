import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Политика обработки cookie | BIORISE',
  description:
    'Информация об использовании файлов cookie и аналитических сервисов на сайте клиники BIORISE.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-16 pt-32">
        <div className="container mx-auto max-w-4xl px-6">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Политика cookie', href: '/cookie-policy/' },
            ]}
          />
          <h1 className="mb-8 text-3xl font-heading font-light text-olive-primary sm:text-4xl md:text-5xl">
            Политика обработки cookie
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-olive-primary/90">
            <section className="space-y-3">
              <h2 className="text-2xl font-heading text-olive-primary">
                1. Общие положения
              </h2>
              <p>
                Настоящая политика описывает, какие cookie и похожие технологии
                используются на сайте biorise-clinic.ru, для каких целей они
                применяются и как пользователь может управлять согласием.
              </p>
              <p>
                Cookie и сведения, которые могут позволить идентифицировать
                пользователя (включая IP-адрес), обрабатываются в соответствии с
                требованиями законодательства Российской Федерации о
                персональных данных (Федеральный закон №152-ФЗ).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-heading text-olive-primary">
                2. Какие cookie мы используем
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Технические cookie: обеспечивают корректную работу интерфейса
                  сайта и пользовательских сценариев.
                </li>
                <li>
                  Функциональные cookie: запоминают выбор пользователя (например,
                  согласие или отказ от аналитики).
                </li>
                <li>
                  Аналитические cookie: используются для оценки посещаемости,
                  поведения пользователей и улучшения качества сайта.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-heading text-olive-primary">
                3. Передача данных третьим лицам
              </h2>
              <p>
                При наличии согласия пользователя сайт может использовать
                аналитические сервисы третьих лиц, в том числе:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Яндекс Метрика</li>
                <li>Top.Mail.Ru</li>
              </ul>
              <p>
                Указанные сервисы могут обрабатывать технические параметры
                устройства и сети (включая IP-адрес, сведения о браузере,
                времени посещения и действиях на сайте).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-heading text-olive-primary">
                4. Согласие и отказ
              </h2>
              <p>
                При первом посещении сайта пользователю предлагается выбрать:
                согласиться или отказаться от аналитических cookie. До получения
                согласия аналитические сервисы не активируются.
              </p>
              <p>
                Пользователь может изменить решение, очистив cookie/данные сайта
                в браузере, после чего баннер согласия появится повторно.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-heading text-olive-primary">
                5. Контакты оператора
              </h2>
              <p>
                Оператор персональных данных: ООО «МК Клиники Будущего»
              </p>
              <p>
                Сайт: biorise-clinic.ru
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
