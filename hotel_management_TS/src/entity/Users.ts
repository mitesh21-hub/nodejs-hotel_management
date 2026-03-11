import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Bookings } from './Bookings';

export enum user_gender {
    MALE = "Male",
    FEMALE = "Female",
}

export enum user_IDProof {
    VOTER_ID = "Voter_ID",
    ADHAR_ID = "Adhar_ID",
    LICENCE = "Licence"
}

@Entity({ name: "Users" })
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @Column()
    user_email: string

    @Column()
    user_phone: string

    @Column()
    user_age: number

    @Column({
        type: "enum",
        enum: user_gender,
        // default: user_gender.MALE,
    })
    user_gender: user_gender

    @Column()
    user_password: string

    @Column({
        type: "enum",
        enum: user_IDProof,
        // default: user_IDProof.Adhar_ID,
    })
    user_IDProof: user_IDProof

    @CreateDateColumn()
    created_date: string;

    @UpdateDateColumn()
    updated_date: string

    @OneToMany(() => Bookings, (bookings) => bookings.id)
    bookings: Bookings
}

