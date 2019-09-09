import { getConnectionManager, SelectQueryBuilder } from "typeorm";

import { Review } from "../entity/Review.entity";
import * as logger from "../util/logger";

// const logger = Logger("user.model");

export class ReviewModel {

    public queryBuilder: SelectQueryBuilder<Review>;

    public async getAll() {
        logger.debug("getAll");
        return getConnectionManager().get().getRepository(Review)
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.user", "user")
            .getMany();
    }

    public getById(reviewId: number) {
        logger.debug("update, reviewId: " + JSON.stringify(reviewId));
        return getConnectionManager().get().getRepository(Review)
            .findOne(reviewId);
    }

    public getByRealEstateId(homeId: number) {
        logger.debug("update, real estate id: " + JSON.stringify(homeId));
        return getConnectionManager().get().getRepository(Review)
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.home", "home")
            .where("home.realEstateId = :homeId", { homeId })
            .getMany();
    }

    public create = (review: Review) => {
        logger.debug("create, review: " + JSON.stringify(review));
        return getConnectionManager().get().getRepository(Review).save(review);
    }

    public getAllWithTitle() {
        logger.debug("getAllWithTitle");
        return getConnectionManager().get().getRepository(Review)
            .createQueryBuilder("review")
            .where("review.surveyTitle IS NOT NULL")
            .getMany();
    }

    public getAllWithoutTitle() {
        logger.debug("getAllWithoutTitle");
        return getConnectionManager().get().getRepository(Review)
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.user", "user")
            .where("review.surveyTitle IS NULL")
            .getMany();
    }

    public getAllWithTitleAndPhone(phone: string) {
        logger.debug("getAllWithTitle");
        return getConnectionManager().get().getRepository(Review)
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.user", "user")
            .where("user.phone = :phone", { phone })
            .andWhere("review.surveyTitle IS NOT NULL")
            .getMany();
    }

    public clear = async () => {
        logger.debug("clear");
        await getConnectionManager().get().getRepository(Review).clear();
    }
}
