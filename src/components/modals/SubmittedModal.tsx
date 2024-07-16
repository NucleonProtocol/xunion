import { Modal } from 'antd';
import useTxStore from '@/store/pending.ts';
import { confluxScan } from '@/components/notices/writeTxNotification.tsx';
import { ArrowRightTopIcon, ArrowUpIcon } from '@/components/icons';

const SubmittedModal = () => {
  const submittedTx = useTxStore((state) => state.submittedTx);
  const updateSubmitted = useTxStore((state) => state.updateSubmitted);
  return (
    <Modal
      open={!!submittedTx?.hash}
      title={submittedTx?.title}
      centered
      width={400}
      footer={null}
      onCancel={() => {
        updateSubmitted(null);
      }}
    >
      <div className="flex flex-col items-center gap-[20px]">
        <div className="flex-center h-[72px] w-[72px] rounded-full bg-theme text-[40px] text-white">
          <ArrowUpIcon />
        </div>
        <span className="text-[20px] font-bold">Submitted</span>
        <a
          href={`${confluxScan}${submittedTx?.hash}`}
          className="flex-center gap-[10px] py-[20px] text-theme hover:opacity-75"
          target="_blank"
        >
          <span> View on ConfluxScan</span>
          <ArrowRightTopIcon className="text-[12px]" />
        </a>
      </div>
    </Modal>
  );
};

export default SubmittedModal;
