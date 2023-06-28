export type PrismaUser = {
  id: string;
  email: string;
  name: string;
  image: string;
};

export type Session = {
  user: PrismaUser;
  expires: string;
};

export type UserInfo = {
  profile: string;
  followers: number;
};

export type PrismaPrompt = {
  id: string;
  title: string;
  content: string;
  model: {
    id: string;
    name: string;
  };
  modelId: string;
  tags: string[];
  user: PrismaUser;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TPrompt = {
  id: string;
  title: string;
  content: string;
  modelId: string;
  model: {
    id: string;
    name: string;
  };
  tags: string[];
  user: {
    id: string;
    name: string;
    image: string;
  };
  userId: string;
};

export type Model = {
  id: string;
  name: string;
};

export type ModelOption = {
  value: string;
  label: string;
};
