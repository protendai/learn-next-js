import mongoose from "mongoose";

export async function connect(){
  try{
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection;

    connection.on('connected', () =>{
      console.log("DB connected");
    })

    connection.on('error', (err) => {
      console.log('DB failed to connect : ' + err)
      process.exit();
    })

  }catch(error){
    console.log(error)
  }
}