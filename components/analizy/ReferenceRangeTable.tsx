type ReferenceRow = {
  parameter: string
  range: string
}

export default function ReferenceRangeTable({
  title = 'Референсные значения',
  columnLabels = ['Показатель', 'Норма'],
  rows,
  note,
}: {
  title?: string
  columnLabels?: [string, string]
  rows: ReferenceRow[]
  note?: string
}) {
  return (
    <section className="mt-12">
      <div className="rounded-[2rem] border border-olive-primary/10 bg-white p-6 sm:p-8">
        <h2 className="text-[30px] font-light leading-tight text-olive-primary sm:text-[32px]">{title}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-olive-primary/15 text-xs uppercase tracking-[0.08em] text-olive-primary/70">
                <th className="py-3 pr-4 font-medium">{columnLabels[0]}</th>
                <th className="py-3 font-medium">{columnLabels[1]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.parameter} className="border-b border-olive-primary/8 last:border-0">
                  <td className="py-3 pr-4 text-olive-text">{row.parameter}</td>
                  <td className="py-3 text-olive-primary">{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {note && <p className="mt-5 text-sm leading-relaxed text-olive-primary/60">{note}</p>}
      </div>
    </section>
  )
}
