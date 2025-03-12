import {
  LinkedAccountWithMetadata,
  useDelegatedActions,
  usePrivy,
  WalletWithMetadata,
} from "@privy-io/react-auth";

export const useBoomWalletDelegate = () => {
  const { user } = usePrivy();

  const wallet = user?.wallet;

  const { delegateWallet, revokeWallets } = useDelegatedActions();

  // Find the embedded wallet to delegate from the array of the user's wallets
  const walletToDelegate =
    wallet?.walletClientType === "privy" ? wallet : undefined;

  // Check if the wallet to delegate by inspecting the user's linked accounts
  const isAlreadyDelegated = !!user?.linkedAccounts?.find(
    (account: LinkedAccountWithMetadata): account is WalletWithMetadata =>
      Boolean(account.type === "wallet" && account.address && account.delegated)
  );

  const isDisplay = !!walletToDelegate; // 准备好了并且有可以代理调用的钱包

  const onDelegate = async () => {
    try {
      if (isAlreadyDelegated) return;
      if (walletToDelegate && walletToDelegate.address) {
        delegateWallet({
          address: walletToDelegate.address,
          chainType: "solana",
        })
          .then(() => {
            alert("delegateWallet success");
          })
          .catch((error) => {
            alert(error);
          });
      }
    } catch (error) {
      console.error("Delegation failed:", error);
    }
  };

  const onRevoke = async () => {
    try {
      if (!isAlreadyDelegated) return; // Button is disabled to prevent this case
      await revokeWallets();
    } catch (error) {
      console.error("Revocation failed:", error);
    }
  };

  const option = isDisplay
    ? isAlreadyDelegated
      ? "REVOKE"
      : "DELEGATE"
    : null;

  const delegateAllowanceStatus: "ALLOWED" | "NOT_ALLOWED" = isAlreadyDelegated
    ? "ALLOWED"
    : "NOT_ALLOWED";

  return {
    option,
    delegateAllowanceStatus,
    onDelegate,
    onRevoke,
  };
};
