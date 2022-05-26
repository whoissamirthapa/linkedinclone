import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', ()=>{
    console.log("Database connected...");
})

mongoose.connection.on("error",(error)=>{
    console.log("Database not connected "+ error);
})
