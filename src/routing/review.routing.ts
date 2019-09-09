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

    new FeedrentController().createReview(input).then((review) => {
        logger.debug("/create, review: " + JSON.stringify(review));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            review
        });
    }).catch((err) => {
        logger.debug("/create, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/list", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/list, input: " + JSON.stringify(input));

    new FeedrentController().getAllReviews(input).then((items) => {
        logger.debug("/list, reviews: " + JSON.stringify(items));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            items
        });
    }).catch((err) => {
        logger.debug("/list, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/get", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/get, input: " + JSON.stringify(input));

    new FeedrentController().get(input).then((items) => {
        logger.debug("/get, review: " + JSON.stringify(items));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            items
        });
    }).catch((err) => {
        logger.debug("/get, err: " + JSON.stringify(err));
        defaultErrorHandler(err, response);
    });
});

router.get("/getAllById", async (request: express.Request, response: express.Response) => {
    const input = request.query;
    logger.info("/getAllById, input: " + JSON.stringify(input));

    new FeedrentController().getReviewsByProperty(input).then((items) => {
        logger.debug("/getAllById, review: " + JSON.stringify(items));

        response.status(200).json({
            status: AppSettings.SUCCESS_STATUS,
            items
        });
    }).catch((err) => {
        logger.debug("/getAllById, err: " + JSON.stringify(err));
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
