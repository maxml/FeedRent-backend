import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import RandomUtils from "../util/RandomUtils";
import { RealEstate } from "./RealEstate.entity";
import { User } from "./User.entity";

@Entity()
export class Review {

    public static validate(): object {
        return {
            title: ["string"],
            description: ["string"],
            mark: ["required", "decimal"],
            userId: ["string"],
            objectId: ["string"],
        };
    }

    @PrimaryGeneratedColumn("increment")
    public reviewId: number;

    @Column({
        nullable: true,
    })
    public title: string;

    @Column({
        nullable: true,
    })
    public description: string;

    @Column({
        type: "double precision"
    })
    public mark: number;

    @Column({
        nullable: true,
        type: "simple-array"
    })
    public links: string[];

    @ManyToOne((type) => User)
    @JoinColumn()
    public user: User;

    @ManyToOne((type) => RealEstate)
    @JoinColumn()
    public home: RealEstate;

    public getRandom(): Review {
        this.reviewId = RandomUtils.getRandomNumber(10, 100);
        this.title = RandomUtils.getRandomString(10);
        this.mark = RandomUtils.getRandomNumber(0, 5);
        this.user = new User().getRandom();

        return this;
    }
}
