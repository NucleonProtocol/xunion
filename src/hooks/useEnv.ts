const useEnv = () => {
  const env = import.meta.env.VITE_APP_ENV || 'testnet';
  //   const env = import.meta.env.VITE_APP_ENV || 'mainnet';

  return {
    isMainnet: env === 'mainnet',
  };
};

export default useEnv;
