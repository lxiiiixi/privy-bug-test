// import {
//   useWallets,
//   ConnectedWallet,
//   EIP1193Provider,
// } from "@privy-io/react-auth";
// import "./App.css";
// import { useEffect, useState } from "react";
// import { ethers } from "ethers";

// export const BSC_CHAIN_ID_HEX = "0x38" as `0x${string}`; // https://chainlist.org/chain/56
// export const BSC_CHAIN_ID_DEC = 56;
// export const PRIVY_BSC_CHAIN_ID = "eip155:56";

// function App() {
//   const { wallets } = useWallets();

//   const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

//   const evmWallet: ConnectedWallet | undefined = wallets.find(
//     (wallet) =>
//       wallet.type === "ethereum" && wallet.walletClientType === "privy"
//   );

//   useEffect(() => {
//     console.debug("Privy Evm Wallets", wallets);
//   }, [wallets]);

//   useEffect(() => {
//     console.debug(
//       `[useBscPrivyEmbeddedWallets] ${evmWallet?.address} ${evmWallet?.chainId}`
//     );
//     // 如果有 evm 钱包，但是不在 bsc 链上，则切换到 bsc 链
//     if (evmWallet && evmWallet.chainId !== PRIVY_BSC_CHAIN_ID) {
//       evmWallet.switchChain(BSC_CHAIN_ID_DEC);
//     }
//   }, [evmWallet]);

//   // 获取这个唯一的 bsc 钱包
//   const bscWallet = wallets.find(
//     (wallet) =>
//       wallet.type === "ethereum" &&
//       wallet.walletClientType === "privy" &&
//       wallet?.chainId == PRIVY_BSC_CHAIN_ID
//   ); // 可能有多个，但是我们目前只支持一个。

//   console.log("signer", {
//     signer,
//     bscWallet,
//     provider: bscWallet?.getEthereumProvider,
//     wallets,
//   });

//   useEffect(() => {
//     const initializeSigner = async () => {
//       if (!bscWallet) return;
//       const provider: EIP1193Provider | undefined =
//         await bscWallet.getEthereumProvider();
//       if (!provider) return;
//       const ethersProvider = new ethers.BrowserProvider(provider);
//       const initializedSigner = await ethersProvider.getSigner();
//       setSigner(initializedSigner);
//       // const signer = await bscWallet?.getEthereumSigner();
//       // setSigner(signer);
//     };

//     if (
//       bscWallet &&
//       bscWallet?.getEthereumProvider &&
//       typeof bscWallet?.getEthereumProvider === "function"
//     ) {
//       initializeSigner();
//     }
//   }, [bscWallet?.getEthereumProvider, bscWallet, bscWallet?.address]);

//   return (
//     <div>
//       <button
//         onClick={async () => {
//           const message = "Hello, world!";
//           const signature = await signer?.signMessage(message);
//           console.log("signature", signature);
//         }}
//       >
//         Sign Message
//       </button>
//     </div>
//   );
// }

// export default App;

export const App = () => {
  return <div>Hello</div>;
};

export default App;
