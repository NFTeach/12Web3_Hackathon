import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from "../redux/store";

// const NoSSR = ({ children }) => (
//   <>
//     <div className="w-full h-full overflow-hidden" suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : children}
//     </div>
//   </>
// )

const LightApp = ({ component: Component, pageProps}) => {
  
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>  
  );
};

function MyApp({ Component, pageProps }) {
  return (
    // <NoSSR>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
      >
        <LightApp component={Component} pageProps={pageProps} />
      </MoralisProvider>
    // </NoSSR>
  );
}

export default wrapper.withRedux(MyApp);
