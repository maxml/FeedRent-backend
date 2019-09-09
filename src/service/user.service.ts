import * as LIVR from "livr";

import { AppSettings } from "../util/constants";

import { User } from "../entity/User.entity";

import { RealEstate } from "../entity/RealEstate.entity";
import { RealEstateModel } from "../model/realestate.model";
import { UserModel } from "../model/user.model";

import * as logger from "../util/logger";

// const logger = Logger("user.model");

export class UserService {

    public accept(input: any) {
        logger.debug("accept, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, {
                    userId: ["required", "string"],
                    objectId: ["required", "integer"],
                });

                if (checkedInput.validationError) {
                    logger.debug("accept, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const user: User = await new UserModel().get(checkedInput.userId);
                const realEstate: RealEstate = await new RealEstateModel().getById(checkedInput.objectId);

                if (!user || !realEstate) {
                    logger.debug("accept, no entity");
                    reject({
                        status: AppSettings.NO_ENTITY_IN_DATABASE
                    });
                } else {
                    // TODO: change connection between home id and user id
                    resolve(true);
                }
            } catch (err) {
                logger.debug("accept, err: " + err);
                reject(false);
            }
        });
    }

    public create = (input: any) => {
        logger.debug("create, input: " + JSON.stringify(input));

        return new Promise(async (resolve, reject) => {
            try {
                const checkedInput = this.validateInput(input, User.validate());

                if (checkedInput.validationError) {
                    logger.debug("create, wrong input data");
                    reject({
                        status: AppSettings.WRONG_INPUT_DATA,
                        errors: checkedInput.errors
                    });
                    return;
                }

                const user: User = await new UserModel().create(checkedInput);
                resolve(user);
            } catch (err) {
                logger.debug("create, err: " + err);
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
