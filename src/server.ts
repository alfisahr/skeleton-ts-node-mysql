import App from "./App";
import environment from "./config/environment";
import Database from "./database";

(async () => {
  try {
    const db = new Database(environment.database("development"));
    await db.connect();

    App.listen();
  } catch (err) {
    console.log(err);
  }
})();
