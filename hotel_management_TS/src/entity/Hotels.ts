import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, Index } from "typeorm"
import { Rooms } from './Rooms';
import { Bookings } from './Bookings';

@Entity({ name: "Hotels" })
export class Hotels {

    @PrimaryGeneratedColumn()
    id: number

    @Index({ fulltext: true })
    @Column("varchar")
    hotel_name: string
    nullable: true

    @Index({ fulltext: true })
    @Column("varchar")
    hotel_address: string

    @Index({ fulltext: true })
    @Column("varchar")
    hotel_phone: string

    @Column()
    hotel_amenities: string

    @CreateDateColumn()
    createDate: string;

    @UpdateDateColumn()
    update_date: string

    @OneToMany(() => Rooms, (rooms) => rooms.id)
    rooms: Rooms

    @OneToMany(() => Bookings, (bookings) => bookings.id) // specify inverse side as a second parameter
    // @JoinColumn()
    bookings: Bookings

}
