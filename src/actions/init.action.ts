import { TezosNodeWriter, TezosWalletUtil } from "conseiljs";

import * as alphanet from "../config/alfanet";

import * as logger from "../util/logger";

export class InitTezosAccount {

    public async init() {
        logger.debug("init");

        const keystore = await TezosWalletUtil.unlockFundraiserIdentity(
            alphanet.mnemonic.join(" "),
            alphanet.email,
            alphanet.password,
            alphanet.pkh);

        logger.debug(`init, public key: ${keystore.publicKey}`);
        logger.debug(`init, secret key: ${keystore.privateKey}`);

        return keystore;
    }

    public async activate(keystore: any) {
        logger.debug("activate");

        return await TezosNodeWriter.sendIdentityActivationOperation(
            alphanet.tezosNode, keystore, alphanet.secret, "");
    }

    public async reveal(keystore: any) {
        logger.debug("reveal");
        return await TezosNodeWriter.sendKeyRevealOperation(alphanet.tezosNode, keystore);
    }

}
