import { StoreType, TezosNodeWriter, TezosParameterFormat, TezosWalletUtil } from "conseiljs";

import * as alphanet from "../config/alfanet";

export class InvokeSmartContractAction {

    public async invokeContract(keystore: any, contractAddress: string) {
        return await TezosNodeWriter.sendContractInvocationOperation(
            alphanet.tezosNode, keystore, contractAddress, 10000, 100000, "", 1000, 100000,
            `Left (Right (Pair "tz1grSQDByRpnVs7sPtaprNZRp531ZKz6Jmm" 42))`, TezosParameterFormat.Michelson);
    }
}
