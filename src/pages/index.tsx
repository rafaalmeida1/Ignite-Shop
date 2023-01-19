import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useContext, MouseEvent, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";
import "keen-slider/keen-slider.min.css";

import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import { CartProviderContext, ProductProps } from "../context/CartProvider";
import { ProductSkeleton } from "../components/ProductSkeleton";

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addProductOnCart } = useContext(CartProviderContext);

  useEffect(() => {
    // fake loading
    const timeOut = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timeOut);
  }, []);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.2,
      spacing: 48,
    },
    // breakpoints: {
    //   "(max-width: 665px)": {
    //     slides: {
    //       perView: 1,
    //       spacing: 48,
    //     },
    //   },
    // },
  });

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: ProductProps
  ) {
    e.preventDefault();
    addProductOnCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {isLoading ? (
          <>
            <ProductSkeleton className="keen-slider__slide" />
            <ProductSkeleton className="keen-slider__slide" />
            <ProductSkeleton className="keen-slider__slide" />
          </>
        ) : (
          <>
            {products.map((product, i) => {
              return (
                <Link
                  href={`/product/${product.id}`}
                  prefetch={false}
                  key={`${product.id}-${i}`}
                >
                  <Product className="keen-slider__slide">
                    <Image
                      src={product.imageUrl}
                      width={520}
                      height={480}
                      alt=""
                    />

                    <footer>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price}</span>
                      </div>
                      <button onClick={(e) => handleAddToCart(e, product)}>
                        <Handbag size={24} weight="bold" />{" "}
                      </button>
                    </footer>
                  </Product>
                </Link>
              );
            })}
          </>
        )}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount! / 100,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
