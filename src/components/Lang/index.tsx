import { Dropdown, Button, MenuProps } from 'antd';
import { Locale, useLocale } from '@/i18n';
import { useTransition } from 'react';
import { cn } from '@/utils/classnames';

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
  const { locale, switchLocale } = useLocale();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(lang: { value: Locale; label: string }) {
    const nextLocale = lang.value;
    startTransition(() => {
      switchLocale(nextLocale);
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
          'flex-center text-text-primary font-normal',
          isPending && 'transition-opacity [&:disabled]:opacity-30'
        )}
      >
        <span className="text-[12px]">{lang?.label}</span>
      </Button>
    </Dropdown>
  );
};

export default Lang;
