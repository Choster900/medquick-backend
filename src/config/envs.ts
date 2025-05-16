import * as joi from 'joi'

interface EnvsVars {
    PORT: number,
    JWT_SECRET: string
    DATABASE_URL: string,
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
    MAILER_SERVICE: string,
    MAILER_EMAIL: string,
    MAILER_SECRET_KEY: string,
}

const envSchema = joi.object<EnvsVars>({
    PORT: joi.number().default(8080),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string(),
    FIREBASE_CLIENT_EMAIL: joi.string(),
    FIREBASE_PRIVATE_KEY: joi.string(),
    MAILER_SERVICE: joi.string(),
    MAILER_EMAIL: joi.string(),
    MAILER_SECRET_KEY: joi.string(),
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
    FIREBASE_PRIVATE_KEY: EnvsVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    MAILER_SERVICE: EnvsVars.MAILER_SERVICE,
    MAILER_EMAIL: EnvsVars.MAILER_EMAIL,
    MAILER_SECRET_KEY: EnvsVars.MAILER_SECRET_KEY,
}
