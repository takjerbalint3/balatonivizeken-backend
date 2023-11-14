import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection, disconnect } from 'mongoose';

import { DynamicModule } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const initializeDatabase = async (): Promise<void> => {
  mongod = await MongoMemoryServer.create();
};

export const rootMongooseTestModule = (
  options: MongooseModuleOptions = {},
): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      if (!mongod) {
        console.warn('[mongoose test module] call "initializeDatabase"');
      }
      const mongoUri = mongod.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });
};

export const closeInMongodConnection = async (): Promise<void> => {
  await disconnect();
  if (mongod) await mongod.stop();
};

export const clearCollections = async (
  connection: Connection,
): Promise<void> => {
  const collections = connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
