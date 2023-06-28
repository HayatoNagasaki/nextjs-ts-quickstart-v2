import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

import useFooter from '@/hooks/useFooter';

const Footer: React.FC = () => {
  const { isFooterFixed, footerUpdate } = useFooter();

  useEffect(() => {
    footerUpdate();
  }, [footerUpdate]);

  return (
    <footer
      className={`${
        isFooterFixed && 'fixed'
      } bottom-0 w-full bg-white text-gray-700 py-4 h-[88px]`}
    >
      <div className="container mx-auto">
        <p className="text-center">
          &copy; 2023 Divcord Technologies LLC. All rights reserved.
        </p>
        <nav className="mt-2">
          <ul className="flex justify-center">
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                利用規約
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                プライバシーポリシー
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://www.divcord.com"
                className="text-gray-600 hover:text-gray-800"
              >
                運営会社
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                お問い合わせ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
