export const SOLANA_MAINNET_RPC_URL = import.meta.env.VITE_RPC_URL;

export const SOLANA_MAINNET_CLUSTER = {
  name: "mainnet-beta" as const,
  rpcUrl: SOLANA_MAINNET_RPC_URL,
};

export const SOLANA_CHAIN = {
  id: 101,
  name: "Solana",
  network: "mainnet-beta",
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
  },
  testnet: false,
  rpcUrls: {
    default: {
      http: [SOLANA_MAINNET_RPC_URL],
    },
  },
} as const;
