import mongoose from 'mongoose'
import config from './app.config.js'

export const connectToDatabase = () =>
{
    let mongoUri;
    switch (config.environment)
    {
        case 'development':
            mongoUri = config.db.development;
            break;
        case 'test':
            mongoUri = config.db.test;
            break;
        case 'production':
            mongoUri = config.db.production;
            break;
        default:
            mongoUri = config.db.development;
            break;
    }
    mongoose.connect(mongoUri); 
    mongoose.connection.on('open', () =>
    {
        console.log('connected to MongoDB Database instance');

    })
    mongoose.connection.on('error', () =>
    {
        console.error.bind(console, 'MongoDB connection Error:')
    })
}

export const wipeDatabase = async () => 
{
    await mongoose.connection.dropDatabase(); 
}