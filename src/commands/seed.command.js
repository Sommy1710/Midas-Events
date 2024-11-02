import { connectToDatabase } from '../config/db.config.js';
import { createUser, getUserByRole } from '../app/services/user.service.js';
import seeder from '../lib/seeder.js';

(async() => 
{
    //initialize database connection
    connectToDatabase();

    //check if the database has thesame vallues that we want to seed
    // if the values exist, do not seed the database
    if(seeder["super admins"].length !== 0)
    {
        const users = await getUserByRole("super admin");
        if (users.length !== 0)
        {
            console.log("Database already seeded");
            process.exit(0);
        }
       
        //seed the database
        for (const user of seeder["super admins"])
        {
            await createUser(user);
        }
        // log the success message
        console.log("database seeded successfully");
        process.exit(0);
        

    }
} )();