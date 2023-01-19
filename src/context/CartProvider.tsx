import axios from "axios";
import { createContext, ReactNode, useState, useEffect } from "react";

export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartProviderContextProps {
  isCreatingCheckoutSession: boolean;
  productsInCart: ProductProps[];
  cartTotal: number;
  addProductOnCart: (data: ProductProps) => void;
  removeProductOnCart: (data: ProductProps) => void;
  handleBuyProducts: () => Promise<void>;
}

export const CartProviderContext = createContext(
  {} as CartProviderContextProps
);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [productsInCart, setProductsInCart] = useState<ProductProps[]>([]);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

    const cartTotal = productsInCart.reduce((total, product) => {
      return total + product.numberPrice;
    }, 0)

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: productsInCart,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      //Datadog / Sentry futuramente
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  function addProductOnCart(data: ProductProps) {
    const productAlreadyExistsInCart = productsInCart.findIndex(
      (item) => item.id === data.id
    );
    if (productAlreadyExistsInCart < 0) {
      setProductsInCart((state) => [...state, data]);
    } else {
      alert("Já existe esse produto no carrinho");
    }
  }

  function removeProductOnCart(data: ProductProps) {
    const newProductsInCart = productsInCart.filter(
      (item) => item.id !== data.id
    );

    setProductsInCart(newProductsInCart);
  }

  return (
    <CartProviderContext.Provider
      value={{
        isCreatingCheckoutSession,
        cartTotal,
        productsInCart,
        addProductOnCart,
        removeProductOnCart,
        handleBuyProducts,
      }}
    >
      {children}
    </CartProviderContext.Provider>
  );
}
