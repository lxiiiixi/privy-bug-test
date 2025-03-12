import { usePrivy } from "@privy-io/react-auth";
import "./App.css";
import { useBoomWalletDelegate } from "./useWalletDelegate";

function App() {
  const { ready, authenticated, user, login } = usePrivy();
  const { delegateAllowanceStatus, onDelegate, onRevoke, option } =
    useBoomWalletDelegate();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated || !user || !user.email) {
    return (
      <div>
        <p>Not authenticated</p>
        <button onClick={() => login()}>Login</button>
      </div>
    );
  }

  return (
    <div>
      {delegateAllowanceStatus === "NOT_ALLOWED" && (
        <button onClick={onDelegate}>{option}</button>
      )}
      {delegateAllowanceStatus === "ALLOWED" && (
        <button onClick={onRevoke}>{option}</button>
      )}
    </div>
  );
}

export default App;
