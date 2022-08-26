require('dotenv')
const redis =require('redis')
const {promisify}=require('util')

// create redis client
const client =redis.createClient({
    host:process.env.REDIS_HOST,
    port:parseInt(process.env.REDIS_PORT)
})

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client)