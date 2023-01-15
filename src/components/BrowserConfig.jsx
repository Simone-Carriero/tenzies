import React from 'react';
import { Helmet } from 'react-helmet';

const BrowserConfig = () => {
  return (
    <Helmet>
      <meta
        name='msapplication-TileColor'
        content='#da532c'
      />
      <meta
        name='msapplication-square150x150logo'
        content='/mstile-150x150.png'
      />
    </Helmet>
  );
};

export default BrowserConfig;
