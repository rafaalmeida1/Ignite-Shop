import { styled } from "@stitches/react";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  aligntItems: "stretch",
  gap: "4rem",
  maxWidth: 1180,
  margin: "0 auto",

  "@media (max-width: 760px)": {
    padding: "0 1rem 1rem 1rem",
    gridTemplateColumns: "1fr",
    gap: '2rem', 
  },
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  // height: 'calc(656px - 0.5rem)', // fiz isso porque eu quero que a altura seja 656, e eu diminui 0.5rem, só para diminuir o padding que tenho em cima e baixo, poderia resolver isso com boxsizing
  height: 656,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
    scale: "0.9",
    transition: "scale 0.2s",

    "&:hover": {
      scale: "1",
    },
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: "1.6",
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    transition: "background-color 0.1s",

    "&:hover": {
      backgroundColor: "$green300",
    },
  },

  "@media (max-width: 760px)": {
    p: {
      marginBottom: '1.5rem'
    }
  },
});
