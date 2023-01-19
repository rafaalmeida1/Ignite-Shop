import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "../../styles";

export const CartButton = styled("button", {
  padding: "12px",
  display: "flex",
  alignItems: "center",
  background: "$gray800",
  borderRadius: "6px",
  border: 0,
  cursor: "pointer",
  color: '$gray100',
  position: 'relative',

  transition: "all 0.2s",

  span: { 
    position: 'absolute',
    top: '-7px',
    right: '-7px',
    background: '$green500',
    border: '3px solid $gray600',
    borderRadius: '1000px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    fontSize: '$md',
  },

  "&:hover": {
    opacity: 0.7,
  },

  "@media (max-width: 665px)": {
    marginRight: '1.125rem'
  },

});

export const CartCloseButton = styled(Dialog.Close, {
  position: "absolute",
  background: "transparent",
  border: "0",
  overlay: "none",
  top: "2rem",
  right: "2rem",
  color: '$gray100',
  cursor: "pointer",

  transition: "all 0.2s",
  "&:hover": {
    opacity: 0.7,
  },
});

export const OverlayModal = styled(Dialog.Overlay, {
  display: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "transparent",
});

export const CartShopModalContent = styled(Dialog.Content, {
  height: "100vh",
  maxWidth: "480px",
  width: "100%",
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto',

  position: "fixed",
  background: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  padding: "4.5rem 3rem",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  h2: {
    marginBottom: '2rem',
  }
});

export const ProductInCart = styled("div", {
  display: "flex",
  gap: "1.125rem",
  marginTop: "1rem",
});

export const ImageContainerCart = styled("div", {
  width: "100%",
  maxWidth: 102,
  height: 93,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  span: {
    fontSize: "$md",
    color: "$gray300",
    lineHeight: "160%",
  },

  strong: {
    fontSize: "$md",
    color: "$gray100",
    lineHeight: "160%",
    fontWeight: "bold",
  },

  button: {
    background: "transparent",
    border: 0,
    padding: 0,
    textAlign: "left",
    color: "$green500",
    fontSize: "$md",
    lineHeight: "160%",
    fontWeight: "bold",

    transition: "all 0.2s",
    cursor: "pointer",
  },
});

export const CartDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: '2rem',

  gap: '0.5rem',

    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

  span: {
    fontSize: '$md',
    color: '$gray100',
    lineHeight: '160%',
  },

  strong: {
    fontSize: '$lg',
    color: '$gray100',
    fontWeight: 'bold',
  },

  button: {
    marginTop: '3.5rem',
    background: '$green500',
    borderRadius: '8px',
    border: 0,
    padding: '1.125rem 1.75rem',
    fontSize: '$md',
    fontWeight: 'bold',
    lineHeight: '160%',
    color: '$white',
    cursor: 'pointer',

    transition: 'all 0.2s',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  }
});
