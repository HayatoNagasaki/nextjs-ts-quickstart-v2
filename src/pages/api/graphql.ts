import { ApolloServer, gql } from 'apollo-server-micro';
import { readFileSync } from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import Cors from 'micro-cors';
import { join } from 'path';

import { createContext } from '@/graphql/context';
import { resolvers } from '@/graphql/resolvers';

const cors = Cors();

const path = join(process.cwd(), 'src/graphql/generated/schema.graphql');
const typeDefs = gql`
  ${readFileSync(path).toString('utf-8')}
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql/',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
