import { useRouter } from 'next/router';

import Tag from '@/components/Prompt/Tag';
import type { Prompt } from '@/graphql/generated/request';

type PromptProps = {
  prompt: Prompt;
};

const PromptBox: React.FC<PromptProps> = ({ prompt }) => {
  const router = useRouter();
  return (
    <div
      className="p-4 rounded-lg bg-white h-[220px] relative hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/prompts/${prompt.id}/`)}
    >
      <h3 className="text-lg font-bold leading-tight">{prompt.title}</h3>
      <div className={`text-gray-500 text-sm ${!prompt.model && 'mb-2'}`}>
        {prompt.model.name}
      </div>
      <p className="limit-text-5 text-gray-700">{prompt.content}</p>
      <div className="absolute bottom-4">
        {prompt.tags
          .filter((tag) => tag !== '' && tag !== ' ' && tag !== null)
          .map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
      </div>
    </div>
  );
};

export default PromptBox;
