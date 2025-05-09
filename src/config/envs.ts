import * as joi from 'joi'

interface EnvsVars {
    PORT: number,
    JWT_SECRET: string
    DATABASE_URL: string,
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
}

const envSchema = joi.object<EnvsVars>({
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
}).unknown(true)

const { error, value: EnvsVars } = envSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const envs = {
    PORT: EnvsVars.PORT,
    DATABASE_URL: EnvsVars.DATABASE_URL,
    JWT_SECRET: EnvsVars.JWT_SECRET,
    FIREBASE_PROJECT_ID: EnvsVars.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: EnvsVars.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: EnvsVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // ← Importante
}
