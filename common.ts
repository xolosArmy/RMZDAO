import { hash160 } from '@cashscript/utils';
import {
  deriveHdPrivateNodeFromSeed,
  deriveHdPath,
  deriveSeedFromBip39Mnemonic,
  secp256k1,
  encodeCashAddress,
} from '@bitauth/libauth';

const seed = deriveSeedFromBip39Mnemonic('Xolos DAO Key Seed');
const rootNode = deriveHdPrivateNodeFromSeed(seed, true);
const baseDerivationPath = "m/44'/145'/0'/0";

const adminNode = deriveHdPath(rootNode, `${baseDerivationPath}/0`);
if (typeof adminNode === 'string') throw new Error();
export const adminPriv = adminNode.privateKey;
export const adminPub = secp256k1.derivePublicKeyCompressed(adminNode.privateKey) as Uint8Array;
export const adminPkh = hash160(adminPub);
export const adminAddress = encodeCashAddress('bchtest', 'p2pkh', adminPkh);
