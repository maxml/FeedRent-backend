import * as LIVR from "livr";

import { AppSettings } from "../util/constants";

import { RealEstate } from "../entity/RealEstate.entity";
import { RealEstateModel } from "../model/realestate.model";

import * as logger from "../util/logger";
// const logger = Logger("user.model");

export class RealEstateService {

    public find(input: any) {
        logger.debug("find, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    adress: ["required", "string"]
                });

                if (checkedInput.validationError) {
                    logger.debug("find, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const realEstate: RealEstate = await new RealEstateModel().findByAdress(checkedInput.adress);
                resolve(realEstate);
            } catch (err) {
                logger.debug("find, err: " + err);
                reject(false);
            }
        });
    }

    public get(input: any) {
        logger.debug("get, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    id: ["required", "integer"]
                });

                if (checkedInput.validationError) {
                    logger.debug("get, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const realEstate: RealEstate = await new RealEstateModel().getById(checkedInput.id);
                resolve(realEstate);
            } catch (err) {
                logger.debug("get, err: " + err);
                reject(false);
            }
        });
    }

    public create = (input: any) => {
        logger.debug("create, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, RealEstate.validate());

                if (checkedInput.validationError) {
                    logger.debug("create, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                checkedInput.isExecuted = Boolean(checkedInput.isExecuted);

                const realEstate: RealEstate = await new RealEstateModel().create(checkedInput);
                resolve(realEstate);
            } catch (err) {
                logger.debug("create, err: " + err);
                reject(false);
            }
        });
    }

    public update(input: any) {
        logger.debug("update, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, RealEstate.validate());

                if (checkedInput.validationError) {
                    logger.debug("update, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                if (!checkedInput.realEstateId) {
                    logger.debug("update, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                    });
                    return;

                }

                const buff = await new RealEstateModel().getById(checkedInput.realEstateId);

                if (!buff) {
                    logger.debug("update, no realEstate");
                    reject({
                        status: AppSettings.NO_ENTITY_IN_DATABASE,
                    });
                    return;
                }

                checkedInput.isExecuted = checkedInput.isExecuted === "true";

                const realEstate = await new RealEstateModel().update(checkedInput);
                resolve(realEstate);
            } catch (err) {
                logger.debug("update, err: " + err);
                reject(false);
            }
        });
    }

    public getAll = (input: any) => {
        logger.debug("getAll, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    userId: ["string"]
                });

                if (checkedInput.validationError) {
                    logger.debug("update, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                let res;
                if (checkedInput.userId) {
                    res = await new RealEstateModel().getByUserId(checkedInput.userId);
                } else {
                    res = await new RealEstateModel().getAll();
                }

                if (!res) {
                    logger.debug("update, no realEstate");
                    reject({
                        status: AppSettings.NO_ENTITY_IN_DATABASE
                    });
                    return;
                }

                resolve(res);
            } catch (err) {
                logger.debug("getAll, err: " + err);
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
