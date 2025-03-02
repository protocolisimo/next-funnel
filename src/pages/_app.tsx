import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page);

    return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>;
}
