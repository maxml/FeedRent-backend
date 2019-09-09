import { RealEstateService } from "../service/realestate.service";
import { ReviewService } from "../service/review.service";
import { UserService } from "../service/user.service";

export class FeedrentController {

    public async findRealEstate(input: any) {
        return await new RealEstateService().find(input);
    }

    public async get(input: any) {
        return await new ReviewService().getReviewById(input);
    }

    public async getReviewsByProperty(input: any) {
        return await new ReviewService().getReviewsByProperty(input);
    }

    public async getAllReviews(input: any) {
        return await new ReviewService().getAll(input);
    }

    public async getOneRealEstate(input: any) {
        return await new RealEstateService().get(input);
    }

    public createRealEstate = async (input: any) => {
        return await new RealEstateService().create(input);
    }

    public updateRealEstate = async (input: any) => {
        return await new RealEstateService().update(input);
    }

    public getAllEstates = async (input) => {
        return await new RealEstateService().getAll(input);
    }

    public createUser = async (input: any) => {
        return await new UserService().create(input);
    }

    public async createReview(input: any) {
        return await new ReviewService().create(input);
    }

    public async getAnswerStatistics() {
        return await new ReviewService().getAnswerStatistics();
    }

    public async getOneStatistics() {
        return await new ReviewService().getOneStatistics();
    }

    public async getAllStatistics() {
        return await new ReviewService().getAllStatistics();
    }

    public async getLoyaltyStatistics() {
        return await new ReviewService().getLoyaltyStatistics();
    }

    public async acceptRealEstate(input: any) {
        return await new UserService().accept(input);
    }

}
