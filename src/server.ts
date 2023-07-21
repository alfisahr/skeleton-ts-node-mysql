import App from './App';
import { AppDataSource } from './database';
import 'reflect-metadata';

(() => {
   try {
      AppDataSource.initialize()
         .then(() => {
            App.listen();
            console.log(`Server and DB successfully running!`);
         })
         .catch((err) => {
            console.error('Error during Data Source initialization', err);
         });
   } catch (err) {
      console.log(err);
   }
})();
