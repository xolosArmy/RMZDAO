import { Contract, SignatureTemplate, ElectrumNetworkProvider } from 'cashscript';
import { compileFile } from 'cashc';
import { alicePriv, alicePub } from '../src/common';

const provider = new ElectrumNetworkProvider('chipnet');

test('DAO contract creation', async () => {
    const artifact = compileFile('./contracts/dao.cash');
    const contract = new Contract(artifact, [alicePub, 'tokenCategoryHash'], { provider });
    expect(contract.address).toBeDefined();
});
