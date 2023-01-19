import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import { CartShopModal } from "../components/CartShopModal";

import Image from "next/image";
import Link from 'next/link';
import { CartProvider } from "../context/CartProvider";
import { useRouter } from "next/router";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname} = useRouter();

  const showCartButton = pathname !== '/success'

  return (
    <CartProvider>
      <Container>
        <Header>
          <Link href="/" prefetch={false}><Image src={logoImg} alt="" /></Link>

          {showCartButton && <CartShopModal />}
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
