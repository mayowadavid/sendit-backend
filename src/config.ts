import * as dotenv from 'dotenv';

export const config = () => {
  dotenv.config({ path: '.env' });
  return {
    database: {
<<<<<<< HEAD
      type: 'postgres',
=======
      type: process.env.DB_TYPE,
>>>>>>> origin/main
      host: process.env.DB_HOST,
      port: parseInt(process.env.host_connect),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
<<<<<<< HEAD
      // ssl: true,
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
=======
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
>>>>>>> origin/main
      entities: ['dist/**/*.entity.js'],
    },
  };
};
