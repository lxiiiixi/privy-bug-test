/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useSolanaWallets,
  usePrivy,
  ConnectedSolanaWallet,
} from "@privy-io/react-auth";
import "./App.css";
import { useCallback, useMemo } from "react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const memoProgramId = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

function App() {
  const { user, ready: readyUser, authenticated, login, logout } = usePrivy();

  const {
    ready: readySolanaWallets,
    wallets: solanaWallets, // 可能是包含embedded钱包和用户自己的外部钱包
  } = useSolanaWallets();

  const solanaEmbeddedWallets = useMemo(() => {
    return solanaWallets.filter(
      (wallet) => wallet.walletClientType === "privy"
    );
  }, [solanaWallets]);

  const mainSolanaEmbeddedWallet =
    solanaEmbeddedWallets.find((w) => w.walletIndex == 0) ||
    solanaEmbeddedWallets[0];

  console.log("user", { user, readyUser, authenticated });

  console.log("SolanaWallets", {
    readySolanaWallets,
    solanaWallets,
    solanaEmbeddedWallets,
    mainSolanaEmbeddedWallet,
  });

  const signTransaction = useCallback(async (wallet: ConnectedSolanaWallet) => {
    if (!wallet) return;
    const transaction = new Transaction();

    transaction.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: new PublicKey(wallet.address),
            isSigner: true,
            isWritable: false,
          },
        ],
        programId: memoProgramId,
        data: new TextEncoder().encode("Hello Solana Transaction Test") as any,
      })
    );

    transaction.recentBlockhash = "Mf6HLb4ru42v4xW5b6fEi6HKEhwVDG5uYkud3HciLqU";
    transaction.feePayer = new PublicKey(wallet.address);
    console.time("[useSolanaPrivyEmbeddedWallet] preSignTransaction");
    await wallet.signTransaction(transaction);
    console.timeEnd("[useSolanaPrivyEmbeddedWallet] preSignTransaction");
  }, []);

  if (!authenticated) {
    return (
      <div>
        <button onClick={() => login()}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <button
        onClick={async () => {
          // const message = "Hello, world!";
          // const signature = await mainSolanaEmbeddedWallet?.signMessage(
          //   new TextEncoder().encode(message)
          // );
          // console.log("signature", signature);

          const wallet = solanaEmbeddedWallets.find(
            (w) => w.address === "DnQSkzywJLWjjfFCkaQ3dyXEVrDKmrDA2rokvGGU7R38"
          );
          console.log("wallet", {
            wallet,
            mainSolanaEmbeddedWallet,
          });
          if (!wallet) {
            console.log("wallet not found");
            return;
          }

          await signTransaction(wallet);
        }}
      >
        Sign Transaction
      </button>

      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default App;
