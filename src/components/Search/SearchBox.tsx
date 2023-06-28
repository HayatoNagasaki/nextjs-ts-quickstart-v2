import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

type SearchBoxProps = {
  className?: string;
};

const SearchBox: React.FC<SearchBoxProps> = ({ className, ...rest }) => {
  const router = useRouter();
  const updateQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    router.push({
      pathname: '/search/',
      query: { q: query },
    });
  };

  return (
    <div
      className={`flex items-center pb-4 relative w-[360px] ${className}`}
      {...rest}
    >
      <MagnifyingGlassIcon className="h-5 w-5 absolute left-[0.5rem]" />
      <input
        type="text"
        placeholder="プロンプトを検索"
        className="flex-grow pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-blue-500"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') updateQuery(e);
        }}
      />
    </div>
  );
};

export default SearchBox;
