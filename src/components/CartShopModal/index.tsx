import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useContext } from "react";

import {
  CartButton,
  CartCloseButton,
  CartDetails,
  CartShopModalContent,
  ImageContainerCart,
  OverlayModal,
  ProductDetails,
  ProductInCart,
} from "./style";
import { X, Handbag } from "phosphor-react";
import { CartProviderContext } from "../../context/CartProvider";

export function CartShopModal() {
  const { productsInCart, removeProductOnCart, handleBuyProducts, cartTotal, isCreatingCheckoutSession } =
    useContext(CartProviderContext);

    const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cartTotal);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton>
          {productsInCart.length > 0 && <span>{productsInCart.length}</span>}
          <Handbag size={24} />
        </CartButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <OverlayModal />

        <CartShopModalContent>
          <CartCloseButton>
            <X size={24} />
          </CartCloseButton>

          <div>
            <h2>Sacola de compras</h2>

            {productsInCart.map((product) => (
              <ProductInCart key={product.id}>
                <ImageContainerCart>
                  <Image
                    src={product.imageUrl}
                    width={94}
                    height={94}
                    priority
                    quality={100}
                    alt=""
                  />
                </ImageContainerCart>
                <ProductDetails>
                  <span>{product.name}</span>
                  <strong>{product.price}</strong>
                  <button onClick={() => removeProductOnCart(product)}>
                    Remover
                  </button>
                </ProductDetails>
              </ProductInCart>
            ))}
          </div>

          <CartDetails>
            <div>
              <span>Quantidade</span>
              <span>
                {productsInCart.length}{" "}
                {productsInCart.length === 1 
                  ? "item"
                  : "itens"}
              </span>
            </div>
            <div>
              <strong>Valor total</strong>
              <strong>{formattedCartTotal}</strong>
            </div>
            <button disabled={productsInCart.length === 0 || isCreatingCheckoutSession} onClick={() => handleBuyProducts()}>Finalizar compra</button>
          </CartDetails>
        </CartShopModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
