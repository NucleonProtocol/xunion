import { Modal } from 'antd';
import useTxStore from '@/store/pending.ts';
import { ArrowRightTopIcon, ArrowUpIcon } from '@/components/icons';
import { useTranslate } from '@/i18n';
import { confluxScan } from '@/components/notices/usePendingNotice.tsx';

const SubmittedModal = () => {
  const { t } = useTranslate();
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
      maskClosable={false}
    >
      <div className="flex flex-col items-center gap-[20px]">
        <div className="flex-center h-[72px] w-[72px] rounded-full bg-theme text-[40px] text-white">
          <ArrowUpIcon />
        </div>
        <span className="text-[20px] font-bold">
          {t('common.pending.submitted.title')}
        </span>
        <a
          href={`${confluxScan}tx/${submittedTx?.hash}`}
          className="flex-center gap-[10px] py-[20px] text-theme hover:opacity-75"
          target="_blank"
        >
          <span> {t('common.pending.view.scan')}</span>
          <ArrowRightTopIcon className="text-[12px]" />
        </a>
      </div>
    </Modal>
  );
};

export default SubmittedModal;
