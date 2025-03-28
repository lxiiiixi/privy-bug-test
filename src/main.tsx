import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App.tsx";
import "./index.css";
import { SOLANA_CHAIN, SOLANA_MAINNET_CLUSTER } from "./constant.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId="cm485ehd706mjjqspwtpqlo74"
      clientId="client-WY5eKEXMXJeLZ3aMC2Z8ptnD446mVSsMgvCHVZfbo3FM2"
      config={{
        appearance: {
          accentColor: "#FCD535",
          theme: "light",
          landingHeader: "Welcome",
          showWalletLoginFirst: false, // 是否有限展示钱包链接的方式
          // walletChainType: "solana-only", // 展示支持链的钱包类型
          // walletList: ["phantom", "metamask", "okx_wallet", "detected_wallets"], // 可以选择的钱包列表 WalletListEntry
          // 'metamask' | 'coinbase_wallet' | 'rainbow' | 'phantom' | 'zerion' | 'cryptocom' | 'uniswap' | 'okx_wallet' | 'universal_profile'
        },
        // Display email and wallet as login methods
        // loginMethods: ["email", "wallet"],
        loginMethods: ["email"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        // externalWallets: {
        //     solana: {
        //         connectors: toSolanaWalletConnectors({
        //             // By default, shouldAutoConnect is enabled
        //             shouldAutoConnect: true,
        //         }),
        //     },
        // },
        embeddedWallets: {
          showWalletUIs: false, // Overrides the value of "Add confirmation modals" you set in the Privy Dashboard
          // createOnLogin: 'off',
          ethereum: {
            createOnLogin: "users-without-wallets", // defaults to 'off'
          },
          solana: {
            createOnLogin: "users-without-wallets", // defaults to 'off'
          },
          requireUserPasswordOnCreate: false,
        },
        mfa: {
          // 多重身份验证（Multi-Factor Authentication
          noPromptOnMfaRequired: false,
        },
        supportedChains: [SOLANA_CHAIN],
        solanaClusters: [SOLANA_MAINNET_CLUSTER],
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
