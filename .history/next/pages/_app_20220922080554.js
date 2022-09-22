import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from "../redux/store";
import { NextRequest } from 'next/server';

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

export function middleware(NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname == "/") {
    return NextResponse.redirect("/welcome");
  }
  return NextResponse.next();
}