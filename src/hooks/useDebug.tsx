import { useEffect } from 'react';

type Argments = {
  data: any;
  loading: boolean;
  error: any;
};

const useDebug = ({ data, loading, error }: Argments) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log('loading: ' + loading);
  }, [loading]);

  useEffect(() => {
    console.log('error: ' + error);
  }, [error]);
};

export default useDebug;
