const normalize = (value: string) => value.trim().toLowerCase()

export function getSeoImageAlt(title: string) {
  const rawTitle = title.trim()
  const text = normalize(rawTitle)

  if (!rawTitle) {
    return 'BIORISE Самара'
  }

  if (text.includes('щитовид')) return 'Чек-ап щитовидной железы BIORISE Самара'
  if (text.includes('детский чек-ап') || (text.includes('школ') && text.includes('сад'))) {
    return 'Детский чек-ап BIORISE Самара'
  }
  if (text.includes('забота о родителях')) return 'Чек-ап для родителей BIORISE Самара'
  if (text.includes('диагностика дефицита железа')) return 'Чек-ап дефицита железа BIORISE Самара'
  if (text.includes('чек-ап') || text.includes('check-up') || text.includes('check up')) {
    return `${rawTitle} BIORISE Самара`
  }
  if (text.includes('анализ') || text.includes('диагностик')) {
    return `${rawTitle} BIORISE Самара`
  }

  if (text.includes('терзапатид')) return 'Терзапатид для снижения веса BIORISE Самара'
  if (text.includes('витамин d')) return 'Укол витамина D BIORISE Самара'
  if (text.includes('желез')) return 'Капельница железа BIORISE Самара'
  if (text.includes('золуш') || text.includes('красота') || text.includes('омолож')) {
    return 'Капельница Золушка BIORISE Самара'
  }
  if (text.includes('витамин')) return 'Витаминная капельница BIORISE Самара'
  if (text.includes('детокс')) return 'Детокс капельница BIORISE Самара'
  if (text.includes('энерг')) return 'Капельница для энергии BIORISE Самара'
  if (text.includes('постковид')) return 'Капельница после ковида BIORISE Самара'
  if (text.includes('лаеннек')) return 'Капельница Лаеннек BIORISE Самара'
  if (text.includes('густые волосы') || text.includes('волос')) return 'Капельница для волос BIORISE Самара'
  if (text.includes('протеин')) return 'Спортивная капельница BIORISE Самара'
  if (text.includes('спорт')) return 'Спортивная капельница BIORISE Самара'
  if (text.includes('джетлаг')) return 'Капельница после перелета BIORISE Самара'
  if (text.includes('вечерин')) return 'Капельница после вечеринки BIORISE Самара'
  if (text.includes('антистресс') || text.includes('стресс')) return 'Капельница от стресса BIORISE Самара'
  if (text.includes('брейнсторм') || text.includes('мозг')) return 'Капельница для мозга BIORISE Самара'
  if (text.includes('иммуно')) return 'Капельница для иммунитета BIORISE Самара'
  if (text.includes('сосуд') || text.includes('сердц')) return 'Капельница для сосудов BIORISE Самара'
  if (text.includes('сахар') || text.includes('диаб')) return 'Капельница при диабете BIORISE Самара'
  if (text.includes('вес') || text.includes('похуд')) return 'Капельница для похудения BIORISE Самара'
  if (text.includes('беремен') || text.includes('маме можно')) return 'Капельница при беременности BIORISE Самара'
  if (text.includes('мужск')) return 'Капельница для мужского здоровья BIORISE Самара'
  if (text.includes('полов') || text.includes('женск')) return 'Капельница для женского здоровья BIORISE Самара'
  if (text.includes('феринжект')) return 'Капельница Феринжект BIORISE Самара'

  if (text.startsWith('капельница')) {
    return `${rawTitle} BIORISE Самара`
  }

  return `${rawTitle} капельница BIORISE Самара`
}
