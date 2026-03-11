import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from "typeorm"
import { Hotels } from "./Hotels"
import { Bookings } from './Bookings';

export enum room_type {
    Single_Bed = "Single Bed",
    Double_Bed = "Double Bed",
    King_Size_Bed = "King size Bed"
}

@Entity({ name: "Rooms" })
export class Rooms {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    room_number: string

    @Column({
        type: "enum",
        enum: room_type,
        default: room_type.King_Size_Bed,
    })
    room_type: room_type

    @Column()
    room_desc: string

    @Column()
    room_amenities: string

    @Column()
    room_price: number

    @Column()
    hotelsId: number

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    update_date: string

    @ManyToOne(() => Hotels, (hotels) => hotels.id)
    hotels: Hotels

    @OneToOne(() => Bookings, (bookings) => bookings.id)
    bookings: Bookings

}
