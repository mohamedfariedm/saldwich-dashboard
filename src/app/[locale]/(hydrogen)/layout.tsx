'use client';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import * as tr from '@/app/[locale]/dictionaries/index';

export default function DefaultLayout({
  children, params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();
  const text = String(locale) == 'ar' ? tr['ar'] : tr['en'];

  if (!isMounted) {
    return null;
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return <HeliumLayout>{children}</HeliumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return <LithiumLayout>{children}</LithiumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return <BerylLiumLayout>{children}</BerylLiumLayout>;
  }

  return <HydrogenLayout text={text}>{children}</HydrogenLayout>;
}
