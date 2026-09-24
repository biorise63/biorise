import { ClipboardCheck, ShieldPlus, Stethoscope } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import IvBagIcon from '@/components/icons/IvBagIcon'
import type { ComplexProgramFeatureIcon } from '@/lib/complexPrograms'

const ICON_MAP: Record<ComplexProgramFeatureIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  'clipboard-check': ClipboardCheck,
  stethoscope: Stethoscope,
  'iv-bag': IvBagIcon,
  'shield-plus': ShieldPlus,
}

export function FeatureIcon({
  icon,
  className,
}: {
  icon: ComplexProgramFeatureIcon
  className?: string
}) {
  const Icon = ICON_MAP[icon]
  return <Icon className={className} aria-hidden="true" />
}
