import { NotificationOutlined } from '@ant-design/icons';

const Tip = () => {
  return (
    <div className="mt-[30px] w-[500px]  rounded-[14px]  border border-theme p-[10px] text-[14px] max-md:mx-[20px] max-md:w-[calc(100%-40px)]">
      <span className="pr-[10px] text-theme">
        <NotificationOutlined />
      </span>
      <span>
        Direct SLC minting: Each currency can be directly minted at 90% to 99%
        of the SLC value, and the currency used for minting can be redeemed as
        specified currency at 95% value and 5% XCFX valued as reserve.
      </span>
    </div>
  );
};

export default Tip;
