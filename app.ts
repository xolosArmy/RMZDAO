import { Contract, SignatureTemplate, ElectrumNetworkProvider } from 'cashscript';
import { compileFile } from 'cashc';
import { alicePriv, alicePub } from './common';

const provider = new ElectrumNetworkProvider('chipnet');

(async () => {
    const daoArtifact = compileFile('./contracts/dao.cash');
    const daoContract = new Contract(daoArtifact, [alicePub, 'tokenCategoryHash'], { provider });

    console.log(`Contrato DAO creado: ${daoContract.address}`);

    const treasuryArtifact = compileFile('./contracts/treasury.cash');
    const treasuryContract = new Contract(treasuryArtifact, [alicePub], { provider });

    console.log(`Contrato del Tesoro creado: ${treasuryContract.address}`);
})();
