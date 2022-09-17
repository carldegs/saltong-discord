import { mongoose } from '@typegoose/typegoose';

let mongooseConnection = global.mongooseObj;

if (!mongooseConnection) {
  mongooseConnection = global.mongooseObj = { conn: null, promise: null };
}

async function connectMongo(): Promise<typeof mongoose> {
  if (mongooseConnection.conn) {
    return mongooseConnection.conn;
  }

  if (!mongooseConnection.promise) {
    mongooseConnection.promise = mongoose
      .connect(process.env.DATABASE_URL as string, {
        bufferCommands: false,
        autoIndex: true,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }
  mongooseConnection.conn = await mongooseConnection.promise;
  return mongooseConnection.conn;
}

export default connectMongo;
