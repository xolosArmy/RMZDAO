import { Contract, SignatureTemplate, ElectrumNetworkProvider } from 'cashscript';
import { compileFile } from 'cashc';
import { alicePriv, alicePub } from '../src/common';

const provider = new ElectrumNetworkProvider('chipnet');

test('Treasury contract creation', async () => {
    const artifact = compileFile('./contracts/treasury.cash');
    const contract = new Contract(artifact, [alicePub], { provider });
    expect(contract.address).toBeDefined();
});
