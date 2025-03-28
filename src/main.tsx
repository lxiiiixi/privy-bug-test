import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BoomWalletProvider } from "@boomeme/wallet-sdk";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BoomWalletProvider
      appId="cm485ehd706mjjqspwtpqlo74"
      clientId="client-WY5eKEXMXJeLZ3aMC2Z8ptnD446mVSsMgvCHVZfbo3FM2"
    >
      <App />
    </BoomWalletProvider>
  </StrictMode>
);
