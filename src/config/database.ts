import mongoose from "mongoose";

interface NoSQLConnection {
  name: string;
  port: number;
  host: string;
}

if (process.env.MONGOOSE_DEBUG === "on") {
  mongoose.set("debug", true);
}

abstract class Database {
  public static async connect(
    connection?: NoSQLConnection | false
  ): Promise<boolean> {
    if (connection === false) {
      throw new Error("env variable `MONGO_URI` cannot be empty or null");
    }

    if (!connection) {
      connection = {
        host: process.env.MONGO_HOST!,
        port: Number(process.env.MONGO_PORT!),
        name: process.env.MONGO_DB_NAME!
      };
    }

    const uri = `mongodb://${connection.host}:${connection.port}/${connection.name}`;

    if (!Database.getUri(uri)) {
      throw new Error("env variable `MONGO_URI` cannot be empty or null");
    }

    const uriFormated: string = Database.getUri(uri) as string;

    await mongoose.connect(uriFormated, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return true;
  }

  public static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  private static getUri(
    uri: string | null | undefined
  ): string | undefined | null {
    if (!uri) {
      return uri;
    }

    if (process.env.NODE_ENV === "test") {
      uri += "-test";
    }

    return uri;
  }
}

export default Database;
