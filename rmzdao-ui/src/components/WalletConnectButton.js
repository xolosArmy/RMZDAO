import React, { useState } from "react";
import { initializeWalletConnect, connectWallet } from "../utils/walletConnect";
import QRCodeComponent from "./QRCodeComponent";

const WalletConnectButton = () => {
  const [walletUri, setWalletUri] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = async () => {
    const client = await initializeWalletConnect();
    const uri = await connectWallet(client);
    setWalletUri(uri);
  };

  return (
    <div>
      {!isConnected ? (
        <>
          <button onClick={handleConnectWallet}>Conectar Billetera</button>
          {walletUri && <QRCodeComponent value={walletUri} />}
        </>
      ) : (
        <p>Billetera conectada.</p>
      )}
    </div>
  );
};

export default WalletConnectButton;
