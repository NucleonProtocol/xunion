import { Dropdown, Button, MenuProps } from 'antd';
import { Locale } from '@/i18n';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { cn } from '@/utils/classnames';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages: { value: Locale; label: string }[] = [
  {
    value: 'en-US',
    label: 'English',
  },
  {
    value: 'zh-HK',
    label: '繁體中文',
  },
  {
    value: 'zh-CN',
    label: '简体中文',
  },
];

const Lang = () => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(lang: { value: Locale; label: string }) {
    const nextLocale = lang.value;
    console.log(nextLocale);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  console.log('locale', locale);
  const items: MenuProps['items'] = languages.map((lan) => ({
    key: lan.value,
    label: lan.label,
    onClick: () => {
      onSelectChange(lan);
    },
  }));

  const lang = languages.find((lan) => lan.value === locale);
  return (
    <Dropdown menu={{ items }}>
      <Button
        className={cn(
          'flex-center font-normal text-text-primary',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
      >
        <span className="text-[12px]">{lang?.label}</span>
      </Button>
    </Dropdown>
  );
};

export default Lang;
