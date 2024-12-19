import { Contract, ElectrumNetworkProvider } from 'cashscript';
import fs from 'fs';

// Llave pública del administrador (reemplaza con tu llave pública)
const adminPubkey = 'xpub6BhXVWkEXBNr8mxBnSZCMcB9gUJABZPfi6B8gYoX5Saneo5kxH9qQEkmqyejxH7CRgf78utv2ZsP1b6TeyyWcufP8upizmYPvEE1UY4486v';

// ID del token Xolos $RMZ
const tokenCategory = 'b09871964619cf43dbb15f05f64af007e3afed1a5fa0c0f45c121441aa3e7e18';

// Proveedor de red para CHIPNET o mainnet
const provider = new ElectrumNetworkProvider('mainnet'); // Usa 'mainnet' para red principal

async function main() {
  // Cargar el artefacto del contrato compilado
  const artifact = JSON.parse(fs.readFileSync('./artifacts/dao.json', 'utf-8'));

  // Instanciar el contrato
  const contract = new Contract(artifact, [adminPubkey, tokenCategory], { provider });

  console.log(`Contrato desplegado en la dirección: ${contract.address}`);
  console.log(`Balance inicial: ${await contract.getBalance()} satoshis`);
}

main().catch(console.error);
