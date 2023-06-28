import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Container from '@/components/common/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PromptBox from '@/components/Prompt';
import useFooter from '@/hooks/useFooter';
import useRefetch from '@/hooks/useRefetch';

const Home: NextPage = () => {
  const router = useRouter();
  const { footerUpdate } = useFooter();
  // const { data, refetch } = usePromptsQuery();
  // useRefetch({ router, refetch });

  useEffect(() => {
    footerUpdate();
  }, [footerUpdate]);

  return (
    <>
      <Head>
        <title>Quick start with Next.js</title>
      </Head>
      <main>
        <Header />
        <Container>
          <h1 className="text-3xl font-bold">Hello World</h1>
        </Container>

        <Footer />
      </main>
    </>
  );
};

export default Home;
