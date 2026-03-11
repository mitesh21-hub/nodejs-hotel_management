import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Bookings } from './Bookings';

export enum subject {
    INQUIRY = "Inquiry",
    BOOKING = "Booking",
    CANCELLATION = "Cancellation",
    REFUND = "Refund",
    GENERAL = "General"
}

@Entity({ name: "Contact" })
export class Contact {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    message: string

    // @Column()
    // file: string

    @Column({
        type: "enum",
        enum: subject,
    })
    subject: subject

    @CreateDateColumn()
    created_date: string;

    @UpdateDateColumn()
    updated_date: string

}

declare module 'express' {
    interface Request {
        body: any // Actually should be something like `multer.Body`
        files: any // Actually should be something like `multer.Files`
    }
}

