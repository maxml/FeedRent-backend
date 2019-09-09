import { TezosNodeWriter, TezosParameterFormat, TezosWalletUtil } from "conseiljs";

import * as fs from "fs";
import * as alphanet from "../config/alfanet";

import * as logger from "../util/logger";

export class DelpoySmartContractAction {

    public async deploy(keystore: any) {
        logger.debug("deploy");

        // DEFAULT
        // const contract = `parameter string;
        // storage string;
        // code { DUP;
        //     DIP { CDR ; NIL string ; SWAP ; CONS } ;
        //     CAR ; CONS ;
        //     CONCAT;
        //     NIL operation; PAIR}
        //   `;
        const contract: string = fs.readFileSync("./nft/nft.m", {
            encoding: "utf8"
        });
        const storage = '"Sample"';

        // logger.debug("deploy, contract: " + contract);

        const result = await TezosNodeWriter
            .sendContractOriginationOperation(alphanet.tezosNode, keystore,
                100, undefined, false, true, 100000, "", 1000, 100000, contract,
                storage, TezosParameterFormat.Michelson);

        logger.debug(`Injected operation group id ${result.operationGroupID}`);

        return result;
    }
}
