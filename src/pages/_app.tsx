import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }: AppProps) {

  //the chainid our app wants to be running on
  //example polygon Mumbai testnet 
  const desiredChainId = ChainId.Mumbai;


  //create a client
  const queryClient = new QueryClient();
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
    <QueryClientProvider client={queryClient}>
      
      <Component {...pageProps} />
    </QueryClientProvider>
  </ThirdwebProvider>
  )
}
