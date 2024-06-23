import { Contract, JsonRpcProvider } from 'ethers';
import { E_SPACE_MAIN_RPC } from '@/contracts';
import CIS from '@/contracts/CIS.json';
const useCISContract = () => {
  const provider = new JsonRpcProvider(E_SPACE_MAIN_RPC);
  const contract = new Contract(CIS.address, CIS.abi, provider);

  const getCISId = (address: string) => {
    return contract.getAddrId(address);
  };

  const getAddrByCISId = async (id: string) => {
    const result = await contract.getIdService(id).catch(() => {});
    if (result && result[1] !== '0x0000000000000000000000000000000000000000') {
      return result[1];
    }
  };

  return {
    getCISId,
    contract,
    getAddrByCISId,
  };
};

export default useCISContract;
