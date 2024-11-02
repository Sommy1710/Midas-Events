import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';


export const updateEnv = (payload) =>
{
    const envPath = resolve(process.cwd(), '.env');
    const envVariables = readFileSync(envPath, 'utf8').split('\n');

    //loop over the object we are receiving as a parameter
    for (const [key, value] of Object.entries(payload))
    {
        //write a regex to match the key and replace the value
        const regex = new RegExp(`${key}=.*`);

        //check the env variables for the existence of the key
        const keyExists = envVariables.some((enVar) => regex.test(enVar));

        //if the key exists, update the value
        if (keyExists)
        {
            envVariables.forEach((envVar, index) =>
            {
                if (regex.test(envVar))
                {
                    envVariables[index] = `${key}=${value}`;
                }
            });
        }

        else
        {
            //if the key does not exist, push the new key value pair
            envVariables.push(`${key} =${value}`);
        }

        //write the updated env variables to the .env file
        writeFileSync(envPath, envVariables.join('\n'));
    }
}

export const asyncHandler = (fn) =>
    async function (req, res, next) {
        try{
            return await fn(req, res);
        } catch (error) {
            next(error);
        }
    };


export const getSecondsFromNow = (seconds) => 
{
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    return currentTime.getTime() / 1000;
};

export const permissions = {
    events: {
        create: ["admin", "super admin"],
        read: ["user", "admin", "super admin"],
        update: ["admin", "super admin"],
        delete: ["admin", "super admin"],
    },

    user: {
        create: ["admin", "super admin"],
        read: ["admin", "super admin"],
        update: ["admin", "super admin"],
        delete: ["admin", "super admin"],
    },
    role: {
        create: ["super admin"],
        read: ["super admin"],
        update: ["super admin"],
        delete: ["super admin"],
    },
};

export function getOperationType (method)
{
    let operation;
    switch (method) {
        case "post":
            operation = "create";
            break;
        case "get":
            operation = "read";
            break;
        case "put":
            operation = "update";
            break;
        case "delete":
            operation = "delete";
            break;
        default:
            operation = "read"; 
    }
    if (permissions[route][operation].includes(role)) {
        return next();
    }
}

export async function aggregateResults (model, payload)
{
    //create an aggregation pipeline and return the results
    return await model.find(payload); 
}

export function paginate(model){}