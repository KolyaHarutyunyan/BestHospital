import { Injectable } from '@nestjs/common';
import { connect, Connection, set, connection } from 'mongoose';
import { MONGO_CONN_STR } from './app.constants';

@Injectable()
export class DatabaseConnection {
  // Mongoose options
  options = {
    poolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  private dbConnection: Connection;

  connect = () => {
    const options: any = {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    // // Setting mongoose option
    set('useFindAndModify', false);
    set('useCreateIndex', true);
    connect(MONGO_CONN_STR, options, (err) => {
      if (err) {
        console.log('error connecting to the db::: ', err);
      }
      console.log('database connected');
    });
  };
  dropDatabase = async () => {
    await connection.dropDatabase();
  };
}
