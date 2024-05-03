import { useTranslate } from '@/i18n';

function Home() {
  const { t } = useTranslate();
  return <div>{t('title')}</div>;
}

export default Home;
