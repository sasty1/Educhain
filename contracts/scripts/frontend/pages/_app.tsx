import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import WalletRequired from "../components/WalletRequired";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Pages that don't require wallet connection
  const publicPages = ["/", "/docs"];
  const isPublicPage = publicPages.includes(router.pathname);

  if (isPublicPage) {
    return (
      <>
        <Header />
        <div style={{ paddingTop: "80px" }}>
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  return (
    <WalletRequired>
      <Header />
      <div style={{ paddingTop: "80px" }}>
        <Component {...pageProps} />
      </div>
    </WalletRequired>
  );
}
