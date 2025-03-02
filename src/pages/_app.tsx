import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page); // fix an any

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {getLayout(<Component {...pageProps} />)}
    </PersistGate>
  </Provider>
}
