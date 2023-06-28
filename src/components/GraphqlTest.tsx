import type { FC, FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

import {
  useCreateModelMutation,
  useModelsQuery,
} from '@/graphql/generated/request';

export const GraphqlTest: FC = () => {
  const [models, setModels] = useState([]);
  const { data, loading, error } = useModelsQuery();
  const [createModel] = useCreateModelMutation();

  const handleCreateModel: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const { data } = await createModel({
      variables: {
        name: 'TestGPT' as any,
      },
    });
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      console.log(data.models);
    }
  }, [data]);

  useEffect(() => {
    console.log('loading: ' + loading);
  }, [loading]);

  useEffect(() => {
    console.log('error: ' + error);
  }, [error]);

  return (
    <div>
      <div className="border-b border-red-400 mb-4"></div>
      <div>GraphQL Test</div>
      <button
        className="btn bg-gray-300 hover:bg-gray-4-0"
        onClick={handleCreateModel}
      >
        Create model
      </button>
      <div className="border-b border-red-400 mt-4"></div>
    </div>
  );
};
