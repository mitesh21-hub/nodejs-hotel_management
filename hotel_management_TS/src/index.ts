import { AppDataSource } from "./data-source"
import { Users } from "./entity/Users"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new Users()
    user.user_name = "Timber"
    user.user_email = "Saw"
    user.user_phone = "8866234565"
    user.user_age = 27
    user.user_password = "Tim@12345"
    // user.user_IDproof = "Adhar_ID"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(Users)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
