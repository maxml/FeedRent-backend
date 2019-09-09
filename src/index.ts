import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";

import * as fs from "fs";

import { getConnectionManager } from "typeorm";
import * as data from "./config/ormconfig";

import objectRouter from "./routing/object.routing";
import reviewRouter from "./routing/review.routing";
import userRouter from "./routing/user.routing";

import { DelpoySmartContractAction } from "./actions/delpoy.action";
import { InitTezosAccount } from "./actions/init.action";
import { InvokeSmartContractAction } from "./actions/invoke.action";
import * as logger from "./util/logger";

const app = express();

const port = process.env.PORT || 3001;
logger.debug("Port is: " + port);

// ======================================== MIDDLEWARE
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);

function loggerMiddleware(request: express.Request, _: express.Response, next: () => void) {
    logger.debug(`loggerMiddleware, ${request.method} ${request.path}`);
    logger.debug("loggerMiddleware, time: " + new Date().toLocaleString());

    logger.debug("loggerMiddleware, request body: " + JSON.stringify(request.body));
    logger.debug("loggerMiddleware, request headers: " + JSON.stringify(request.headers));
    logger.debug("loggerMiddleware, request query params: " + JSON.stringify(request.query));

    next();
}

// ======================================== DATABASE
logger.debug("constructor, data: " + JSON.stringify(data));

// getConnectionManager().create(data).connect().then(() => {
//     logger.debug("connection is created successful");
// }).catch((err) => {
//     logger.error("connection is not created, err: " + err);
// });

// ======================================== ROUTING
app.get("/", (_, response) => {
    response.send("Hello, Feedrent!");
});

app.use("/user", userRouter);
app.use("/object", objectRouter);
app.use("/review", reviewRouter);

app.listen(port, () => {
    logger.info("Example app listening on port " + port);
});

// TODO: logging
// TODO: transactions

// import { setLogLevel, StoreType, TezosNodeWriter, TezosParameterFormat, TezosWalletUtil } from "conseiljs";
// "@stove-labs/granary": "^1.0.0-pre-alpha.24"

// setLogLevel("debug");

// const tezosNode = "";
// activete protocol
// rewill

// Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd

// api_key='bakingbad',
//                     api_host='https://conseil-dev.cryptonomic-infra.tech',
//                     api_version=2

// key='edsk3gUfUPyBSfrS9CCgmCiQsTCHGkviBDusMxDJstFtojtc1zcpsh', shell='sandboxnet'

// https://alphanet-node.tzscan.io/

// "secret": "9fe53005a5a75a5c039f6be7568981f3de4bddc8",
// "amount": "1359734103",
// "pkh": "tz1YHf677zBRXTEELNtxAR4JjkBtcTc4urnB",
// "password": "2VuyyhxxvE",
// "email": "nqsafend.tahbeiwl@tezos.example.org"

async function deployContract() {
    // TODO: can't find it

    // const keystore = {
    //     publicKey: "edpkuuGJ4ssH3N5k7ovwkBe16p8rVX1XLENiZ4FAayrcwUf9sCKXnG",
    //     privateKey: "edskRpVqFG2FHo11aB9pzbnHBiPBWhNWdwtNyQSfEEhDf5jhFbAtNS" +
    //         "41vg9as7LSYZv6rEbtJTwyyEg9cNDdcAkSr9Z7hfvquB",
    //     publicKeyHash: "tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z",
    //     seed: "",
    //     storeType: StoreType.Fundraiser
    // };

    // TODO: what is the sample?
    // const storage = '"Sample"';

    // const result = await TezosNodeWriter.
    //     sendContractOriginationOperation(tezosNode, keystore, 0, undefined, false,
    //         true, 100000, "", 1000, 100000, contract, storage, TezosParameterFormat.Michelson);
    // logger.debug(`Injected operation group id ${result.operationGroupID}`);
}

// const alphanetFaucetAccount = alphanet

// initAccount().then(res => {

// });
// deployContract();

// public key: edpkv37UvLjdT6NDc91cSuG8ZfGvNF2q59mGmSquMFFNen1ubYTp47
// secret key: edskRcTJuKtBFmHytzrVirGsi5WBTszKoe6S1P4EY4D3
// rvZYKF3ck2r2sa72sTCZs84of17Uy3a7AtnT4rduecvReKfgno2cnx

async function workTezos() {

    const action = new InitTezosAccount();
    const keystore = await action.init().then((res) => {
        logger.debug("workTezos, keystore: " + JSON.stringify(res));
        return res;
    });

    // await action.activate(keystore).then((res) => {
    //     logger.debug(`activate, Injected operation group id: ${JSON.stringify(res.operationGroupID)}`);
    //     logger.debug(`workTezos, res:  ${JSON.stringify(res)}`);
    //     return res;
    // });

    // await action.reveal(keystore).then((res) => {
    //     logger.debug(`reveal, Injected operation group id: ${JSON.stringify(res.operationGroupID)}`);
    //     logger.debug(`workTezos, res: ${JSON.stringify(res)}`);
    //     return res;
    // });

    // conseiljs can't do this
    // await new DelpoySmartContractAction().deploy(keystore).then((res) => {
    //     logger.debug("workTezos, deploy result: " + JSON.stringify(res));
    // });

    // must get from last operation
    const adress = "KT1NVcVt89pcy4WvLYEnXxhEhbaUivufuWHk";
    await new InvokeSmartContractAction().invokeContract(keystore, adress).then((res) => {
        logger.debug(`reveal, Injected operation group id: ${JSON.stringify(res.operationGroupID)}`);
        logger.debug(`workTezos, res: ${JSON.stringify(res)}`);
        return res;
    });

}

workTezos();
