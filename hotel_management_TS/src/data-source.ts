import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Hotels } from './entity/Hotels';
import { Rooms } from './entity/Rooms';
import { Bookings } from './entity/Bookings';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "mind",
    database: "hotel_management_ts",
    synchronize: true,
    logging: false,
    entities: [Users, Hotels, Rooms, Bookings],
    migrations: [],
    subscribers: [],
})

