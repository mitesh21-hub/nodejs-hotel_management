import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { Rooms } from './Rooms';
import { Hotels } from "./Hotels";
import { Users } from "./Users";

@Entity({ name: "Bookings" })
export class Bookings {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    booking_number: string

    @CreateDateColumn()
    booking_date: string

    @CreateDateColumn()
    check_in: string

    @CreateDateColumn()
    check_out: string

    @Column()
    hotelsId: number

    @Column()
    roomsId: number

    @Column()
    userId: number

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    update_date: string

    @ManyToOne(() => Rooms, (rooms) => rooms.id)
    rooms: Rooms

    @ManyToOne(() => Users, (user) => user.id)
    user: Users

    @ManyToOne(() => Hotels, (hotels) => hotels.id) // specify inverse side as a second parameter
    // @JoinColumn()
    hotels: Hotels

}
