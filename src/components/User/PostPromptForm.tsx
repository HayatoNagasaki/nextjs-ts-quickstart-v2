import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/daisy-ui/Button';
import DaialogModal from '@/components/daisy-ui/DailogModal';
import Select from '@/components/daisy-ui/Select';
import Textarea from '@/components/daisy-ui/Textarea';
import TextField from '@/components/daisy-ui/TextField';
import type { Model, Prompt } from '@/graphql/generated/request';
import {
  useCreatePromptMutation,
  useDeletePromptMutation,
  useModelsQuery,
  usePromptQuery,
  useUpdatePromptMutation,
} from '@/graphql/generated/request';
import type { ModelOption } from '@/types';

type Props = {
  mode: 'post' | 'edit';
};

const PostPromptForm = (props: Props) => {
  const router = useRouter();

  const { mode } = props;

  const [prompt, setPrompt] = useState<Prompt>({
    id: '',
    title: '',
    content: '',
    modelId: '',
    model: {
      id: '',
      name: '',
    },
    tags: [],
    userId: '',
    user: {
      id: '',
      name: '',
      image: '',
    },
    createdAt: '',
    updatedAt: '',
  });

  // フォームデータ郡
  const [models, setModels] = useState<Model[]>([]);
  const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modelId, setModelId] = useState('');
  const [tags, setTags] = useState('');

  // GraphQL関数郡
  const { data } = useModelsQuery();
  const { data: promptData } = usePromptQuery({
    variables: { id: router.query.id as string } as any,
    skip: mode === 'post' || !router.query.id,
  });
  const [createPromptMutation] = useCreatePromptMutation();
  const [updatePromptMutation] = useUpdatePromptMutation();
  const [deletePromptMutation] = useDeletePromptMutation();

  // モーダル関数郡
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setModels(data.models);
    }
  }, [data]);

  useEffect(() => {
    setModelOptions(
      models.map((model: Model) => {
        return {
          label: model.name,
          value: model.id,
        };
      })
    );
    if (models.length > 0) {
      setModelId(models[0].id);
    }
  }, [models]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (mode === 'post') {
      // プロンプトを投稿する
      const response = await createPromptMutation({
        variables: {
          title: title,
          content: content,
          modelId: modelId,
          tags: tags.split(',').map((tag: string) => tag.replace(/ /g, '')),
        } as any,
      });
      if (response.data?.createPrompt) {
        router.push(`/prompts/${response.data.createPrompt.id}/`);
      }
    } else if (mode === 'edit' && prompt) {
      // プロンプトを更新する
      const response = await updatePromptMutation({
        variables: {
          id: prompt.id,
          title: title,
          content: content,
          modelId: modelId,
          tags: tags.split(',').map((tag: string) => tag.replace(/ /g, '')),
        } as any,
      });
      if (response.data?.updatePrompt) {
        router.push(`/prompts/${response.data.updatePrompt.id}/`);
      }
    }
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/');
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (mode === 'edit' && prompt) {
      // プロンプトを削除する
      const response = await deletePromptMutation({
        variables: {
          id: prompt.id,
        } as any,
      });
      if (response.data?.deletePrompt) {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    if (promptData) {
      setPrompt(promptData.prompt as Prompt);
    }
  }, [promptData]);

  useEffect(() => {
    if (mode === 'edit' && prompt) {
      setTitle(prompt.title);
      setContent(prompt.content);
      setModelId(prompt.modelId);
      setTags(prompt.tags.join(', '));
    }
  }, [mode, prompt]);

  return (
    <>
      <form className="max-w-lg mx-auto mb-4">
        <div className="mt-4">
          <TextField
            className="w-full"
            label="タイトル"
            name="title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Textarea
            className="h-[256px]"
            label="内容"
            name="content"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Select
            label="モデル"
            name="category"
            value={modelId}
            options={modelOptions}
            onChange={(e: any) => setModelId(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <TextField
            className="w-full"
            label="タグ"
            name="tags"
            value={tags}
            onChange={(e: any) => setTags(e.target.value)}
          />
        </div>
        <div className="mt-6">
          {mode === 'post' ? (
            <>
              <Button className="btn-primary mr-2" onClick={handleSubmit}>
                投稿
              </Button>
              <Button onClick={handleCancel}>キャンセル</Button>
            </>
          ) : (
            <>
              <Button className="btn-primary mr-2" onClick={handleSubmit}>
                編集
              </Button>
              <Button
                className="btn-error"
                onClick={() => setDeleteModalOpen(true)}
              >
                削除
              </Button>
            </>
          )}
        </div>
      </form>
      <DaialogModal
        open={deleteModalOpen}
        title=""
        content="本当に削除しますか？"
        actionEl={
          <>
            <Button className="btn-error" onClick={handleDelete}>
              削除
            </Button>
            <Button onClick={() => setDeleteModalOpen(false)}>
              キャンセル
            </Button>
          </>
        }
      />
    </>
  );
};

export default PostPromptForm;
