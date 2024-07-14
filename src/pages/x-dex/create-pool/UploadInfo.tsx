import { Button, GetProp, Input, Upload, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { Address, erc20Abi } from 'viem';

const { Dragger } = Upload;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const UploadInfo = ({ lpPairAddress }: { lpPairAddress?: string }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const { data } = useReadContract({
    abi: erc20Abi,
    address: lpPairAddress as Address,
    functionName: 'symbol',
    query: {
      enabled: !!lpPairAddress,
    },
  });

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as FileType);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        // message.success('upload successfully.');
      })
      .catch(() => {
        // message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    multiple: false,
    maxCount: 1,
    listType: 'picture',
    accept: 'image/png, image/jpeg, image/svg, image/jpg',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.size > 1000 * 1024) {
        return;
      }
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  return (
    <div className="mt-[20px] flex flex-col gap-[10px]">
      <div className="font-normal">Pool Info</div>
      <div className="flex-center-between text-tc-secondary">
        <div className="flex-center ">
          <span className="text-red-600">*</span>
          <span>LP Address</span>
        </div>
        <span>{data || ''}</span>
      </div>
      <div>
        <Input
          value={lpPairAddress || ''}
          disabled
          size="large"
          className="h-[48px]"
        />
      </div>
      <div>
        <Dragger {...props}>
          <div className="flex flex-1 flex-col items-start">
            <p className="">
              <UploadOutlined />
            </p>
            <p className="ant-upload-hint">Max size of 20KB</p>
            <p className="ant-upload-hint">
              The supported image formats are jpg, jpeg, png, svg
            </p>
          </div>
        </Dragger>
      </div>
      <div className="mt-[20px] w-full">
        <Button
          type="primary"
          size="large"
          className="w-full"
          loading={uploading}
          disabled={!lpPairAddress}
          onClick={() => {
            handleUpload();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UploadInfo;
