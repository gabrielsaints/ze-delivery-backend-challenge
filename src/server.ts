import app from "./app";
import Database from "./config/database";

(async () => {
  await Database.connect();
  app.listen(process.env.PORT);
})();
