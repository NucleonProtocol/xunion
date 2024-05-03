import { Button } from 'antd';
import { useTheme } from '@/components/Theme';

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => {
          setTheme('light');
        }}
      >
        白天
      </Button>
      <Button
        onClick={() => {
          setTheme('dark');
        }}
      >
        黑夜
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
