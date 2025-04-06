import 'dotenv/config'
import * as joi from 'joi'

interface EnvsVars {
    PORT: number
    DATABASE_URL: string
}
/** @type {*} */
const envSchema = joi.object<EnvsVars>({
    PORT: joi.number().default(3000),
    DATABASE_URL: joi.string().required(),

}).unknown(true)

const { error, value: EnvsVars } = envSchema.validate( process.env )

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const envs = {
    PORT: EnvsVars.PORT,
    DATABASE_URL: EnvsVars.DATABASE_URL,
}
