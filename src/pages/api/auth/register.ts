import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { sha256 } from '@/utils/crypto';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;

  const createUser = async (email: string, password: string) => {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: await sha256(password),
      },
    });

    await prisma.userInfo.create({
      data: {
        userId: user.id as string,
        profile: '',
      },
    });

    return { user: user };
  };

  res.status(200).json(await createUser(email, password));
}

export default handler;
