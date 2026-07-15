'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/routing';

const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={toggleLang}
      aria-label={`Switch language to ${locale === 'en' ? 'Russian' : 'English'}`}
      className="
        group
        border-app-border
        bg-app-background
        px-3
        text-slate-400
        hover:border-app-primary/50
        hover:bg-app-surface-hover
        hover:text-slate-100
      "
    >
      <Languages
        className="
          size-4
          transition-transform
          duration-300
          group-hover:rotate-12
        "
        aria-hidden="true"
      />

      <span className="font-semibold">{locale.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageToggle;
