import { useEffect } from 'react';

type Argments = {
  router: any;
  refetch: () => void;
};

const useRefetch = ({ router, refetch }: Argments) => {
  useEffect(() => {
    // ページ遷移時にデータを再取得
    refetch();
  }, [router.asPath]);

  return {};
};

export default useRefetch;
