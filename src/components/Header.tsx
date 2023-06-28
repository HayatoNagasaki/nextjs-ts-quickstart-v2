import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import Container from '@/components/common/Container';
import Menu from '@/components/common/Menu';
import MenuItem from '@/components/common/MenuItem';
import Avatar from '@/components/daisy-ui/Avatar';
import type { Session } from '@/types';

const Header: React.FC = () => {
  const session = useSession().data as Session | null;
  const router = useRouter();

  return (
    <header className="bg-gray-800 text-white">
      <Container className="!max-w-7xl flex justify-between items-center h-[64px] !mt-0">
        <Link href="/">
          <h1 className="text-3xl text-white">Divcord Technologies</h1>
        </Link>
        <nav>
          <ul className="flex items-center">
            <li
              className="ml-4 cursor-pointer"
              onClick={() => router.push('/search/')}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </li>
            {!session ? (
              <>
                <li className="ml-4">
                  <Link href="/login/">
                    <span className="text-white">ログイン</span>
                  </Link>
                </li>
                <li className="ml-4">
                  <Link href="/register/">
                    <span className="text-white">新規登録</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="ml-4">
                  <Link href="/user/prompt/post/">
                    <span className="text-white">プロンプト投稿</span>
                  </Link>
                </li>
                <li className="ml-4">
                  <Menu
                    anchorEl={
                      <Avatar
                        className="w-[38px] h-[38px] cursor-pointer"
                        imageUrl={session.user.image}
                        alt={session.user.name}
                      />
                    }
                    className="z-50"
                  >
                    <MenuItem
                      onClick={() => router.push(`/${session.user.id}/`)}
                    >
                      マイページ
                    </MenuItem>
                    <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                      ログアウト
                    </MenuItem>
                  </Menu>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
