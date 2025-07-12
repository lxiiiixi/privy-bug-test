import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App.tsx";
import "./index.css";
import { SOLANA_CHAIN, SOLANA_MAINNET_CLUSTER } from "./constant.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      clientId={import.meta.env.VITE_PRIVY_CLIENT_ID}
      config={{
        appearance: {
          accentColor: "#99EF82",
          theme: "dark",
          showWalletLoginFirst: false, // 是否有限展示钱包链接的方式
          walletChainType: "ethereum-and-solana", // 展示支持链的钱包类型
          // walletList: ["phantom", "metamask", "okx_wallet", "detected_wallets"], // 可以选择的钱包列表 WalletListEntry
          // 'metamask' | 'coinbase_wallet' | 'rainbow' | 'phantom' | 'zerion' | 'cryptocom' | 'uniswap' | 'okx_wallet' | 'universal_profile'
        },
        // Display email and wallet as login methods
        loginMethods: ["email", "wallet"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors({
              // By default, shouldAutoConnect is enabled
              shouldAutoConnect: true,
            }),
          },
        },
        embeddedWallets: {
          showWalletUIs: false, // Overrides the value of "Add confirmation modals" you set in the Privy Dashboard
          // createOnLogin: 'off',
          solana: {
            createOnLogin: "off", // defaults to 'off'
          },
          requireUserPasswordOnCreate: false,
        },
        mfa: {
          // 多重身份验证（Multi-Factor Authentication
          noPromptOnMfaRequired: false,
        },
        defaultChain: SOLANA_CHAIN,
        supportedChains: [SOLANA_CHAIN],
        solanaClusters: [SOLANA_MAINNET_CLUSTER],
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
