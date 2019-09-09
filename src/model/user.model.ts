import { getConnectionManager } from "typeorm";

import { User } from "../entity/User.entity";
import * as logger from "../util/logger";

// const logger = Logger("user.model");

export class UserModel {

    public getAll() {
        logger.debug("getAll");
        return getConnectionManager().get().getRepository(User).find();
    }

    public create = (user: User) => {
        logger.debug("create, user: " + JSON.stringify(user));
        return getConnectionManager().get().getRepository(User).save(user);
    }

    public get = (id: number) => {
        logger.debug("get, id: " + JSON.stringify(id));
        return getConnectionManager().get().getRepository(User).findOne(id);
    }

    public clear = async () => {
        logger.debug("clear");
        await getConnectionManager().get().getRepository(User).clear();
    }
}
