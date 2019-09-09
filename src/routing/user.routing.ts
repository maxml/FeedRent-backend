"use strict";

import * as express from "express";

import { FeedrentController } from "../controller/feedreent.controller";
import { AppSettings } from "../util/constants";
import * as logger from "../util/logger";

// const logger = Logger("user.router");
const router = express.Router();

router.post("/create", async (request: express.Request, response: express.Response) => {
    const input = request.body;
    logger.info("/create, input: " + JSON.stringify(input));

    new FeedrentController().createUser(input).then((user) => {
        logger.debug("/create, user: " + JSON.stringify(user));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            user
        });
    }).catch((err) => {
        logger.debug("/create, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/accept", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/accept, input: " + JSON.stringify(input));

    new FeedrentController().acceptRealEstate(input).then((user) => {
        logger.debug("/accept, user: " + JSON.stringify(user));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            user
        });
    }).catch((err) => {
        logger.debug("/accept, err: " + JSON.stringify(err));
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
