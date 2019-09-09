import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import RandomUtils from "../util/RandomUtils";

@Entity()
export class RealEstate {

    public static validate(): object {
        return {
            rating: ["integer"],
            description: ["string"],
            isDeleted: ["string"],
            location: ["string"],
            adress: ["string"],
            price: ["decimal"],
            links: { list_of: ["string"] }
        };
    }

    @PrimaryGeneratedColumn("increment")
    public realEstateId: number;

    @Column({
        default: 0
    })
    public rating: number;

    @Column({
        nullable: true
    })
    public description: string;

    @Column({
        nullable: true,
        default: false
    })
    public isDeleted: boolean;

    @Column({
        nullable: true
    })
    public location: string;

    @Column({
        nullable: true
    })
    public adress: string;

    @Column({
        nullable: true
    })
    public price: number;

    @Column({
        nullable: true,
        type: "simple-array"
    })
    public links: string[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    public getRandom(): RealEstate {
        this.realEstateId = RandomUtils.getRandomNumber(10, 100);
        this.description = RandomUtils.getRandomString(10);
        this.rating = RandomUtils.getRandomNumber(0, 10);
        this.isDeleted = RandomUtils.getRandomBoolean();

        this.createdAt = RandomUtils.getRandomDate(new Date(2019, 7, 20), new Date(2019, 7, 28));
        this.updatedAt = RandomUtils.getRandomDate(new Date(2019, 7, 20), new Date(2019, 7, 28));

        return this;
    }
}
