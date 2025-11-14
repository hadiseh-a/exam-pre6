// src/components/Providers.jsx
'use client';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CartProvider } from "@/context/CartContext";

const theme = createTheme({
  palette: {
    primary: { main: "#00A8CC" },
    background: { default: "#0D1117" },
  },
});

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}