import { ClipboardCheck, Pill, Stethoscope, Syringe, TestTube } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import BodyScanIcon from '@/components/icons/BodyScanIcon'
import CrossedSyringesIcon from '@/components/icons/CrossedSyringesIcon'
import IvBagIcon from '@/components/icons/IvBagIcon'
import type { WeightLossFeatureIcon } from '@/lib/weightLossPrograms'

const ICON_MAP: Record<WeightLossFeatureIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  'test-tube': TestTube,
  'body-scan': BodyScanIcon,
  'iv-bag': IvBagIcon,
  syringe: Syringe,
  'crossed-syringes': CrossedSyringesIcon,
  pill: Pill,
  stethoscope: Stethoscope,
  'clipboard-check': ClipboardCheck,
}

export function FeatureIcon({
  icon,
  className,
}: {
  icon: WeightLossFeatureIcon
  className?: string
}) {
  const Icon = ICON_MAP[icon]
  return <Icon className={className} aria-hidden="true" />
}
