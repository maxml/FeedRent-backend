"use strict";

import * as express from "express";

import { FeedrentController } from "../controller/feedreent.controller";
import { RealEstate } from "../entity/RealEstate.entity";
import { AppSettings } from "../util/constants";
import * as logger from "../util/logger";

// const logger = Logger("user.router");
const router = express.Router();

router.post("/create", async (request: express.Request, response: express.Response) => {
    const input = request.body;
    logger.info("/create, input: " + JSON.stringify(input));

    new FeedrentController().createRealEstate(input).then((realEstate) => {
        logger.debug("/create, realEstate: " + JSON.stringify(realEstate));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            realEstate
        });
    }).catch((err) => {
        logger.debug("/create, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.post("/update", async (request: express.Request, response: express.Response) => {
    const input = request.body;
    logger.info("/update, input: " + JSON.stringify(input));

    new FeedrentController().updateRealEstate(input).then((realEstate) => {
        logger.debug("/update, realEstate: " + JSON.stringify(realEstate));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            realEstate
        });
    }).catch((err) => {
        logger.debug("/update, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/list", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.debug("/list, input: " + JSON.stringify(input));

    new FeedrentController().getAllEstates(input).then((res: RealEstate) => {
        logger.debug("/list, news: " + JSON.stringify(res));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            res
        });
    }).catch((err) => {
        logger.debug("/list, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/get", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/get, input: " + JSON.stringify(input));

    new FeedrentController().getOneRealEstate(input).then((res: RealEstate) => {
        logger.debug("/get, real estate: " + JSON.stringify(res));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            res
        });
    }).catch((err) => {
        logger.debug("/get, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/find", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/find, input: " + JSON.stringify(input));

    new FeedrentController().findRealEstate(input).then((res: RealEstate) => {
        logger.debug("/find, real estate: " + JSON.stringify(res));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            res
        });
    }).catch((err) => {
        logger.debug("/find, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

export default router;

function defaultErrorHandler(err: any, response: express.Response) {
    if (err && err.status) {
        logger.debug("defaultErrorHandler, another status");
        response.status(400).json(err);
        return;
    }

    response.status(400).json({
        status: AppSettings.ERROR_STATUS
    });
}
