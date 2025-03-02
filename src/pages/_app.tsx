import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: React.ReactNode) => React.ReactNode
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = (Component).getLayout || ((page: React.ReactNode) => page);

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {getLayout(<Component {...pageProps} />)}
    </PersistGate>
  </Provider>
}
