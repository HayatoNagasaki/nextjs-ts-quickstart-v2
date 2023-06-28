import type { PrismaPrompt, PrismaUser } from '@/types';

export const isAuthorized = async (user: PrismaUser | null) => {
  if (!user) {
    return false;
  }
  return true;
};

// 権限を確認する関数
export const hasPermission = async (user: PrismaUser | null, object: any) => {
  if (user?.id !== object?.userId) {
    return false;
  }
  return true;
};
