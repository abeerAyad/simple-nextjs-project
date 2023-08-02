import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        const connect = mongoose.connection;

    connect.on('connected', () => {
        console.log('MONGODB CONNECTED')
    })
    connect.on('error', (error) => {
        console.log('MongoDB connection error'+ error)
        process.exit()
    })

    } catch (error) {
        console.log("Something goes wrong "+ error)
    }
}

export default dbConnection