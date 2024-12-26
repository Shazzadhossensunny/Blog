import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.mongoDb_uri as string);
    console.log('Database connected successfully');
    app.listen(config.port, () => {
      console.log(` app running on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect database', error);
  }
}

main();
