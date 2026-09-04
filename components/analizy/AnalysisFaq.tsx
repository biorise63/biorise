type FaqItem = {
  question: string
  answer: string
}

export default function AnalysisFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-12">
      <div className="rounded-[2rem] border border-olive-primary/10 bg-white p-6 sm:p-8">
        <h2 className="text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">Частые вопросы</h2>
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-olive-primary/10 bg-beige-background/45 p-4 open:bg-beige-background/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium text-olive-primary">
                {item.question}
                <span
                  className="shrink-0 text-olive-primary/50 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-olive-text">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
