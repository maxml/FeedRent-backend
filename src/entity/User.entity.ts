import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import RandomUtils from "../util/RandomUtils";

@Entity()
export class User {

    public static validate(): object {
        return {
            phone: ["string"],
            name: ["required", "string"],
        };
    }

    @PrimaryGeneratedColumn("uuid")
    public userId: string;

    @Column({
        nullable: true
    })
    public phone: string;

    @Column()
    public name: string;

    public getRandom(): User {
        this.phone = RandomUtils.getRandomPhone(10);
        this.name = RandomUtils.getRandomString(10);

        return this;
    }
}
