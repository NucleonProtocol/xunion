import { useTranslate } from '@/i18n';
import { LiquidityIcon, SettingIcon, SwapIcon } from '@/components/icons';
import TokenInput from '@/pages/trade/swap/component/TokenInput.tsx';
import { Button } from 'antd';
import {
  ArrowDownOutlined,
  UpOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { CFXIcon, ETHIcon } from '@/components/icons/tokens';

function Home() {
  const { t } = useTranslate();
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[70px]">
      <div className="flex-center gap-[40px]">
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] bg-theme-non-opaque px-[16px] text-theme">
          <SwapIcon />
          <span>Swap</span>
        </div>
        <div className="flex-center h-[40px] cursor-pointer gap-[12px] rounded-[20px] px-[16px] hover:bg-theme-non-opaque hover:text-theme">
          <LiquidityIcon />
          <span>Liquidity</span>
        </div>
      </div>
      <div className="bg-fill-niubi mt-[30px] min-h-[420px] w-[500px] rounded-[20px]  p-[20px]">
        <div className="flex items-center justify-between ">
          <div className="flex-center gap-[10px]">
            <div className="flex-center h-[36px] rounded-[20px] bg-fill-primary px-[16px]">
              {t('swap')}
            </div>
            <div className="flex-center h-[36px] rounded-[20px] px-[16px] text-tc-secondary">
              Limit
            </div>
            <div className="flex-center h-[36px] rounded-[20px] px-[16px] text-tc-secondary">
              Send
            </div>
          </div>
          <div className="flex-center gap-[5px]">
            <span className="text-[14px] text-tc-secondary">0.1%</span>
            <SettingIcon className="cursor-pointer hover:text-theme" />
          </div>
        </div>
        <div className="mt-[20px]">
          <TokenInput title="You pay" editable />
          <div className="relative h-[20px]">
            <div className="flex-center  absolute left-[50%]  top-[-8px] h-[36px] w-[36px] -translate-x-[50%] transform rounded-[2px] border-[3px] border-white bg-background-primary">
              <ArrowDownOutlined />
            </div>
          </div>
          <TokenInput title="You receive" />
        </div>
        <div className="px-[10px] py-[20px] text-[14px]">
          <div className="flex-center-between">
            <span>
              1USDT=0.00028ETH
              <span className="text-tc-secondary">($1.00)</span>
            </span>
            <div className="flex-center cursor-pointer gap-[5px]">
              <span className="text-tc-secondary">$8.97</span>
              <UpOutlined className="text-[14px]" />
            </div>
          </div>
          <div className="mt-[10px] flex flex-col gap-[6px]">
            <div className="flex-center-between">
              <span className="text-tc-secondary">Price impact</span>
              <span>~0.22%</span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">Slippage tolerance</span>
              <span>1.5%</span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">Fee(0.3%)</span>
              <span>$8.79</span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">Est.received</span>
              <span>3599.78 USDT</span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">Min.received</span>
              <span>3577.98 USDT</span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">Route</span>
              <div className="flex-center gap-[5px]">
                <span className="flex-center gap-[5px]">
                  <ETHIcon />
                  ETH
                </span>
                <RightOutlined className="mx-[10px] text-[12px] text-tc-secondary" />
                <span className="flex-center gap-[5px]">
                  <CFXIcon />
                  CFX
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[20px] w-full">
          <Button className="w-full" type="primary" size="large">
            Swap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
