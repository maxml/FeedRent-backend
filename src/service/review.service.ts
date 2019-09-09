import * as LIVR from "livr";

import { AppSettings } from "../util/constants";

import { Review } from "../entity/Review.entity";

import { User } from "../entity/User.entity";
import { ReviewModel } from "../model/review.model";
import { UserModel } from "../model/user.model";

import { RealEstate } from "../entity/RealEstate.entity";
import { RealEstateModel } from "../model/realestate.model";
import * as logger from "../util/logger";

// const logger = Logger("user.model");

export class ReviewService {

    public getReviewById(input: any) {
        logger.debug("getReviewById, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    id: ["required", "integer"]
                });

                if (checkedInput.validationError) {
                    logger.debug("getReviewById, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const review: Review = await new ReviewModel().getById(checkedInput.id);
                resolve(review);
            } catch (err) {
                logger.debug("getReviewById, err: " + err);
                reject(false);
            }
        });
    }

    public getReviewsByProperty(input: any) {
        logger.debug("getReviewsByProperty, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    homeId: ["required", "integer"]
                });

                if (checkedInput.validationError) {
                    logger.debug("getReviewsByProperty, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const reviews: Review[] = await new ReviewModel().getByRealEstateId(checkedInput.homeId);
                resolve(reviews);
            } catch (err) {
                logger.debug("getReviewsByProperty, err: " + err);
                reject(false);
            }
        });
    }

    public create = (input: any) => {
        logger.debug("create, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, Review.validate());

                if (checkedInput.validationError) {
                    logger.debug("create, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const user: User = await new UserModel().get(checkedInput.phone);

                if (!user) {
                    logger.debug("create, no such user");
                    reject({
                        status: AppSettings.NO_ENTITY_IN_DATABASE
                    });
                    return;
                }

                checkedInput.user = user;
                delete checkedInput.userId;

                const realEstate: RealEstate = await new RealEstateModel().getById(checkedInput.objectId);

                if (!realEstate) {
                    logger.debug("create, no such real estate");
                    reject({
                        status: AppSettings.NO_ENTITY_IN_DATABASE
                    });
                    return;
                }
                checkedInput.home = realEstate;
                delete checkedInput.objectId;

                const review: Review = await new ReviewModel().create(checkedInput);
                resolve(review);
            } catch (err) {
                logger.debug("create, err: " + err);
                reject(false);
            }
        });
    }

    public getAll = (input: any) => {
        logger.debug("getAll, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await new ReviewModel().getAll());
            } catch (err) {
                logger.debug("getAll, err: " + err);
                reject(false);
            }
        });
    }

    public getOneStatistics() {
        logger.debug("getOneStatistics");

        return new Promise(async (resolve, reject) => {
            try {
                const reviews: Review[] = await new ReviewModel().getAllWithTitle();
                logger.debug("getOneStatistics, reviews: " + JSON.stringify(reviews));

                if (reviews.length === 0) {
                    logger.debug("getOneStatistics, no reviews");
                    resolve(0);
                    return;
                }

                let markSum: number = 0;
                reviews.forEach((e) => markSum += e.mark);

                logger.debug("getOneStatistics, sum of marks: " + JSON.stringify(markSum));

                resolve(Number(markSum / reviews.length).toFixed(3));
            } catch (err) {
                logger.debug("getOneStatistics, err: " + err);
                reject(false);
            }
        });
    }

    public getAllStatistics() {
        logger.debug("getAllStatistics");

        return new Promise(async (resolve, reject) => {
            try {
                const users: User[] = await new UserModel().getAll();

                const model: ReviewModel = new ReviewModel();

                const promises = [];
                for (const u of users) {
                    promises.push(model.getAllWithTitleAndPhone(u.phone));
                }

                await Promise.all(promises)
                    .then((buff) => {
                        logger.debug("getAllStatistics, res: " + JSON.stringify(buff));

                        const res = [];
                        for (let i = 0; i < buff.length; i++) {

                            const reviews: Review[] = buff[i];

                            if (reviews.length !== 0) {
                                let markSum: number = 0;
                                reviews.forEach((e) => markSum += e.mark);

                                res.push({
                                    mark: Number(markSum / reviews.length).toFixed(3),
                                    name: users[i].name
                                });
                            } else {
                                logger.debug("getAllStatistics, no reviews");
                                res.push({
                                    mark: 0,
                                    name: users[i].name
                                });
                            }
                        }

                        resolve(res.sort((e1, e2) => {
                            return Number(e1.mark) - Number(e2.mark);
                        }));
                    }).catch((err) => {
                        logger.debug("getAllStatistics, err: " + err);
                        reject(false);
                    });

            } catch (err) {
                logger.debug("getAllStatistics, err: " + err);
                reject(false);
            }
        });
    }

    public getAnswerStatistics() {
        logger.debug("getAnswerStatistics");

        return new Promise(async (resolve, reject) => {
            try {
                const reviews: Review[] = await new ReviewModel().getAllWithTitle();
                logger.debug("getAnswerStatistics, reviews: " + JSON.stringify(reviews));

                const titles = new Set();
                const res = {};
                reviews.forEach((e) => {
                    if (titles.has(e.title)) {
                        res[e.title].mark += e.mark;
                        res[e.title].count++;
                    } else {
                        titles.add(e.title);
                        res[e.title] = {
                            mark: e.mark,
                            count: 1
                        };
                    }
                });

                logger.debug("getAnswerStatistics, res: " + JSON.stringify(res));

                const keys = Object.keys(res);
                const buff = keys.map((key) => {
                    // paranoid, I know
                    const mark = (keys.length !== 0) ?
                        Number(res[key].mark / res[key].count).toFixed(3) : 0;
                    return {
                        title: key,
                        mark
                    };
                });

                resolve(buff.sort((e1, e2) => {
                    return (Number(e1.mark) - Number(e2.mark));
                }));
            } catch (err) {
                logger.debug("getAnswerStatistics, err: " + err);
                reject(false);
            }
        });
    }

    public getLoyaltyStatistics() {
        logger.debug("getLoyaltyStatistics");

        return new Promise(async (resolve, reject) => {
            try {
                const reviews: Review[] = await new ReviewModel().getAllWithoutTitle();
                logger.debug("getLoyaltyStatistics, reviews: " + JSON.stringify(reviews));

                const diagnostic = {
                    promouters: 0,
                    neutral: 0,
                    critic: 0
                };

                if (reviews.length === 0) {
                    logger.debug("getLoyaltyStatistics, no reviews");
                    resolve({
                        status: AppSettings.SUCCESS_STATUS,
                        stat: 0,
                        diagnostic
                    });
                    return;
                }

                reviews.forEach((e) => {
                    if (e.mark >= 9) {
                        diagnostic.promouters++;
                    } else if (e.mark > 7) {
                        diagnostic.neutral++;
                    } else {
                        diagnostic.critic++;
                    }
                });

                logger.debug("getLoyaltyStatistics, sum of marks: " + JSON.stringify(diagnostic));

                resolve({
                    status: AppSettings.SUCCESS_STATUS,
                    stat: Math.round(((diagnostic.promouters / reviews.length)
                        - (diagnostic.critic / reviews.length)) * 100),
                    // + Number(diagnostic.promouters - diagnostic.critic).toFixed(2) * 100,
                    diagnostic
                });

            } catch (err) {
                logger.debug("getLoyaltyStatistics, err: " + err);
                reject(false);
            }
        });
    }

    private validateInput = (input: any, validationRules: object) => {
        LIVR.Validator.defaultAutoTrim(true);

        const validator = new LIVR.Validator(validationRules);
        const validData = validator.validate(input);

        if (validData) {
            return validData;
        } else {
            logger.warn("validateInput, not valid: " + JSON.stringify(validator.getErrors()));
            return {
                validationError: true,
                errors: validator.getErrors()
            };
        }
    }
}
