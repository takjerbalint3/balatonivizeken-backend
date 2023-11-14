import { NotFoundException } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { AuthService } from '../../src/services/auth/auth.service';
import {
  clearCollections,
  closeInMongodConnection,
  initializeDatabase,
  rootMongooseTestModule,
} from '../modules/mongoose.module';
import { TestProviderModule } from '../providers/test-provider.module';
import { TestUserProvider } from '../providers/test-user.provider';

describe('AuthService', () => {
  let connection: mongoose.Connection;

  let authService: AuthService;
  let userProvider: TestUserProvider;

  beforeAll(async () => {
    await initializeDatabase();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [rootMongooseTestModule(), TestProviderModule],
    }).compile();

    connection = module.get(getConnectionToken('Database'));

    authService = module.get<AuthService>(AuthService);
    userProvider = module.get<TestUserProvider>(TestUserProvider);

    await userProvider.init();
  });

  it('should check that the service exists', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should fail because user doesnt exist', async () => {
      await expect(() =>
        authService.signIn({ username: 'asd', password: 'asd' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should fail because password is wrong', async () => {
      await expect(() =>
        authService.signIn({ username: 'takee', password: 'asd' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return', async () => {
      const result = await authService.signIn({
        username: 'takee',
        password: 'Xyz123#@',
      });
      expect(result).toBeDefined();
    });
  });

  afterEach(async () => {
    // CleanUp - Each test should start fresh
    await clearCollections(connection);
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
