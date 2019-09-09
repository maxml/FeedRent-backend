import { getConnectionManager } from "typeorm";

import { RealEstate } from "../entity/RealEstate.entity";
import * as logger from "../util/logger";

// const logger = Logger("user.model");

export class RealEstateModel {

    public findByAdress(adress: string) {
        logger.debug("findByAdress, adress: " + JSON.stringify(adress));
        return getConnectionManager().get().getRepository(RealEstate)
            .createQueryBuilder("property")
            .where("property.adress = :adress", { adress })
            .getOne();
    }

    public getByUserId(userId: string) {
        logger.debug("getByUserId, userId: " + userId);
        // TODO: home userId
        return getConnectionManager().get().getRepository(RealEstate).find();
    }

    public create = (realEstate: RealEstate) => {
        logger.debug("create, realEstate: " + JSON.stringify(realEstate));
        return getConnectionManager().get().getRepository(RealEstate).save(realEstate);
    }

    public getById(realEstateId: number) {
        logger.debug("update, realEstateId: " + JSON.stringify(realEstateId));
        return getConnectionManager().get().getRepository(RealEstate)
            .findOne(realEstateId);
    }

    public update(realEstate: RealEstate) {
        logger.debug("update, realEstate: " + JSON.stringify(realEstate));
        return getConnectionManager().get().getRepository(RealEstate).save(realEstate);
    }

    public getAll = () => {
        logger.debug("getAll");
        return getConnectionManager().get().getRepository(RealEstate).find();
    }

    public clear = async () => {
        logger.debug("clear");
        await getConnectionManager().get().getRepository(RealEstate).clear();
    }
}
