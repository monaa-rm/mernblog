// import mongoose from "mongoose";
// const MONGO_URL = process.env.MONGO_URL;
// if (!MONGO_URL) {
//   throw new Error(
//     "Please define the MONGO_URL environment variable inside env.local"
//   );
// }

// let cached = global.mongoose;
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
// const connect = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     cached.promise = await mongoose.connect(MONGO_URL).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
// console.log("اتصال انجام شد")
//   } catch (error) {
//     cached.promise = null;
//     console.log("مشکلی پیش آمده",error)
//     throw error;
//   }
//   return cached.conn;
// };

// export default connect;
import mongoose from "mongoose";

const connect= async()=>{
   try{
      await mongoose.connect(process.env.MONGO_URL);
   }
   catch(error){
      throw new Error("خطا در اتصال به دیتابیس");
   }
};

export default connect;