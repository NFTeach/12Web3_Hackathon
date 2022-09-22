import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from "../redux/store";

const LightApp = ({ component: Component, pageProps}) => {
  
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>  
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <LightApp component={Component} pageProps={pageProps} />
    </MoralisProvider>
  );
}

export default wrapper.withRedux(MyApp);
