import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from "../redux/store";

const NoSSR = ({ children }) => (
  <>
    <div className="w-full h-full overflow-hidden" suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  </>
)

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

// const LightApp = ({ component: Component, pageProps}) => {
  
//   return (
//     <ChakraProvider>
//       <Component {...pageProps} isServerInfo={isServerInfo}/>
//     </ChakraProvider>  
//   );
// };

// function MyApp({ Component, pageProps }) {
//   return (
//     <NoSSR>
//       <MoralisProvider
//         appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID}
//         serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
//       >
//         <LightApp component={Component} pageProps={pageProps} />
//       </MoralisProvider>
//     </NoSSR>
//   );
// }
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <ChakraProvider>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Component {...pageProps} isServerInfo={isServerInfo}/>
      </MoralisProvider>
    </ChakraProvider>
    </>
  );
};

export default MyApp;
