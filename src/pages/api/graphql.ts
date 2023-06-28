import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import type { IncomingMessage } from 'http';
import Cors from 'micro-cors';
import type { NextRequest } from 'next/server';
import { join } from 'path';

import type { Context } from '@/graphql/context';
import { createContext } from '@/graphql/context';
import { resolvers } from '@/graphql/resolvers';

const cors = Cors();

const path = join(process.cwd(), 'src/graphql/generated/schema.graphql');
const typeDefs = gql`
  ${readFileSync(path).toString('utf-8')}
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
} as any);

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async ({ req }: { req: IncomingMessage }): Promise<Context> => {
    const context = await createContext({ req });
    return context;
  },
} as any);

export default handler;
