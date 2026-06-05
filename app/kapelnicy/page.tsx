import KapelnicyPageClient from '@/components/kapelnicy/KapelnicyPageClient'
import { getInfusionCategories } from '@/lib/kapelnicy'

export const metadata = {
  title: 'Капельницы в Самаре | BIORISE',
  description:
    'Капельницы в Самаре в клинике BIORISE — витаминные, детокс, восстановительные и anti-stress инфузии. Подбор состава врачом, безопасная IV-терапия и наблюдение специалиста.',
  keywords: [
    'капельницы самара',
    'внутривенные капельницы самара',
    'витаминная капельница самара',
    'iv терапия самара',
    'инфузионная терапия самара',
    'медицинские капельницы самара',
    'капельницы для восстановления',
    'капельницы от усталости',
    'детокс капельницы самара',
  ],
}

export default function KapelnicyPage() {
  const categories = getInfusionCategories()

  const menu = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    items: cat.items.map((item) => ({ id: item.id, title: item.title })),
  }))

  return <KapelnicyPageClient categories={categories} menu={menu} />
}
