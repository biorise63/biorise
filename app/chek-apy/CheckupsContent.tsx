import Breadcrumbs from '@/components/Breadcrumbs'
import { checkupSections, featuredCheckups } from '@/lib/analyses'

export default function CheckupsContent() {
  return (
    <div className="pb-24" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Главная', href: '/' },
            { name: 'Чек-апы', href: '/chek-apy/' },
          ]}
        />

        <section className="mx-auto max-w-6xl rounded-[2rem] border border-olive-primary/12 bg-gradient-to-br from-beige-background via-white to-beige-background/60 px-6 py-8 shadow-[0_24px_60px_rgba(60,74,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-olive-primary/15 bg-white/80 px-4 py-1.5 text-sm text-olive-primary/80">
              Комплексные программы BIORISE
            </span>
            <h1 className="mt-5 text-4xl font-heading font-light leading-tight text-olive-primary sm:text-5xl">
              Чек-апы
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-olive-primary/80">
              Если нужен не один анализ, а готовая программа обследования, удобнее начать с check-up. Здесь собраны комплексы для женщин, мужчин, детей, профилактики после 40 лет, оценки дефицитов и отдельных направлений вроде щитовидной железы.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-olive-primary/45">Популярные программы</p>
            <h2 className="mt-2 text-3xl font-heading font-light text-olive-primary">С чего чаще всего начинают</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredCheckups.map((item) => (
              <article key={item.code} className="rounded-[1.75rem] border border-olive-primary/12 bg-white p-6 shadow-[0_14px_40px_rgba(51,64,35,0.06)]">
                <span className="inline-flex rounded-full bg-beige-background px-3 py-1 text-xs font-medium text-olive-primary/70">
                  {item.label}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-olive-primary">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-olive-primary/72">{item.note}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-olive-primary/45">Код {item.code}</span>
                  <span className="text-2xl font-semibold text-olive-primary">{item.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-olive-primary/45">Каталог программ</p>
            <h2 className="mt-2 text-3xl font-heading font-light text-olive-primary">Чек-апы по направлениям</h2>
          </div>
          <div className="mt-6 space-y-5">
            {checkupSections.map((section, index) => (
              <details
                key={section.slug}
                className="overflow-hidden rounded-[1.5rem] border border-olive-primary/12 bg-white shadow-[0_10px_28px_rgba(51,64,35,0.05)]"
                open={index < 2}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-beige-background/70 px-5 py-4 text-left transition-colors hover:bg-beige-background sm:px-6">
                  <div>
                    <h3 className="text-lg font-semibold text-olive-primary sm:text-xl">{section.title}</h3>
                    <p className="mt-1 text-sm text-olive-primary/65">{section.items.length} программ в разделе</p>
                  </div>
                  <span className="rounded-full border border-olive-primary/12 bg-white px-3 py-1 text-xs font-medium text-olive-primary/65">
                    Открыть
                  </span>
                </summary>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-olive-primary/80">
                    <thead className="border-b border-olive-primary/10 bg-white/90 text-xs uppercase tracking-[0.18em] text-olive-primary/50">
                      <tr>
                        <th className="px-5 py-4 font-medium sm:px-6">Программа</th>
                        <th className="px-5 py-4 font-medium">Срок</th>
                        <th className="px-5 py-4 text-right font-medium sm:px-6">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr key={`${section.slug}-${item.code}-${item.name}`} className="border-b border-olive-primary/8 last:border-b-0">
                          <td className="px-5 py-4 align-top sm:px-6">
                            <div className="text-xs uppercase tracking-[0.16em] text-olive-primary/38">Код {item.code}</div>
                            <div className="mt-1 font-medium leading-relaxed text-olive-primary">{item.name}</div>
                          </td>
                          <td className="px-5 py-4 align-top text-olive-primary/70">
                            {item.turnaround || 'По готовности лаборатории'}
                          </td>
                          <td className="px-5 py-4 text-right align-top font-semibold text-olive-primary sm:px-6">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
