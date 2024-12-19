import React, { useState } from "react";
import WalletConnect from "@walletconnect/client";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [walletConnector, setWalletConnector] = useState(null);
  const [pairingUri, setPairingUri] = useState("");

  // Function to connect the wallet
  const connectWallet = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Standard WalletConnect bridge
    });

    if (!connector.connected) {
      await connector.createSession();
      setPairingUri(connector.uri); // Set the pairing URI for QR Code
    }

    // Listen for connection event
    connector.on("connect", (error, payload) => {
      if (error) {
        console.error("Error connecting:", error);
        return;
      }

      const { accounts } = payload.params[0];
      setAccount(accounts[0]);
      setWalletConnected(true);
    });

    // Listen for disconnection event
    connector.on("disconnect", (error) => {
      if (error) {
        console.error("Error disconnecting:", error);
        return;
      }

      setWalletConnected(false);
      setAccount(null);
      setWalletConnector(null);
      setPairingUri("");
    });

    setWalletConnector(connector);
  };

  // Function to disconnect the wallet
  const disconnectWallet = () => {
    if (walletConnector) {
      walletConnector.killSession();
    }
  };

  // Simulate a transaction
  const sendTransaction = async () => {
    if (!walletConnector) return;

    const txData = {
      to: "bitcoincash:qq6ne0m5gdp8w9pwy5n2wea65pjv8sc8yx77c3arfr",
      value: "1000", // Amount in satoshis
      data: "",
    };

    try {
      const result = await walletConnector.sendCustomRequest({
        method: "bch_signTransaction",
        params: [txData],
      });
      console.log("Transaction signed:", result);
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Xolos $RMZ DAO</h1>
      {!walletConnected ? (
        <div>
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Conectar Billetera
          </button>
          {pairingUri && (
            <div style={{ marginTop: "20px" }}>
              <p>Escanea este código QR con tu billetera Paytaca:</p>
              <QRCodeCanvas value={pairingUri} size={200} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>
            <strong>Billetera conectada:</strong> {account}
          </p>
          <button
            onClick={disconnectWallet}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Desconectar Billetera
          </button>
          <button
            onClick={sendTransaction}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Enviar Transacción
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
