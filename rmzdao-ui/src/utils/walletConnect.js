import SignClient from '@walletconnect/sign-client';

const connectedChain = "wc2-bch-bcr:mainnet"; // Replace with your desired chain ID
let signClient;
let session;

export const initializeWalletConnect = async () => {
  signClient = await SignClient.init({
    projectId: "your-project-id", // Get a project ID from WalletConnect
    relayUrl: "wss://relay.walletconnect.com", // Relay server
    metadata: {
      name: "Xolos $RMZ DAO",
      description: "Connect your wallet to Xolos $RMZ DAO",
      url: "http://localhost:3000",
      icons: ["https://your-icon-url.com/icon.png"],
    },
  });

  signClient.on("session_proposal", async (proposal) => {
    const { requiredNamespaces } = proposal;
    const namespaces = {}; // Approve required namespaces
    await signClient.approve({
      id: proposal.id,
      namespaces,
    });
  });

  signClient.on("session_delete", () => {
    session = null;
  });

  return signClient;
};

export const connectWallet = async () => {
  const pairUri = signClient.pairings[0]?.topic || (await signClient.pair());
  return pairUri;
};

export const signTransaction = async (wcTransactionObj) => {
  if (!session) {
    throw new Error("No active WalletConnect session");
  }

  return await signClient.request({
    topic: session.topic,
    chainId: connectedChain,
    request: {
      method: "bch_signTransaction",
      params: wcTransactionObj,
    },
  });
};
