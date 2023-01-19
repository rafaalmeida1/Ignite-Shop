import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useContext, MouseEvent, useEffect, useState } from "react";

import { HomeContainer, Product, SliderContainer } from "../styles/pages/home";

import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import { CartProviderContext, ProductProps } from "../context/CartProvider";
import { ProductSkeleton } from "../components/ProductSkeleton";
import useEmblaCarousel from "embla-carousel-react";

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addProductOnCart } = useContext(CartProviderContext);

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  useEffect(() => {
    // fake loading
    const timeOut = setTimeout(() => setIsLoading(false), 400);

    return () => clearTimeout(timeOut);
  }, []);

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
      <div style={{ overflow: "hidden", width: "100%" }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
                  <ProductSkeleton className="embla__slide" />
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
                        <Product className="embla__slide">
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
                            <button
                              onClick={(e) => handleAddToCart(e, product)}
                            >
                              <Handbag size={24} weight="bold" />{" "}
                            </button>
                          </footer>
                        </Product>
                      </Link>
                    );
                  })}
                </>
              )}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
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
