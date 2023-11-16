import { NotFoundException } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model } from 'mongoose';
import { Boat } from '../../src/models/schema/boat.schema';
import { BoatService } from '../../src/services/boat/boat.service';
import {
  clearCollections,
  closeInMongodConnection,
  initializeDatabase,
  rootMongooseTestModule,
} from '../modules/mongoose.module';
import { TestBoatProvider } from '../providers/test-boat.provider';
import { TestProviderModule } from '../providers/test-provider.module';
import { TestUserProvider } from '../providers/test-user.provider';

describe('BoatService', () => {
  let connection: mongoose.Connection;

  let boatService: BoatService;
  let userProvider: TestUserProvider;
  let boatProvider: TestBoatProvider;
  let boatModel: Model<Boat>;
  beforeAll(async () => {
    await initializeDatabase();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [rootMongooseTestModule(), TestProviderModule],
    }).compile();

    connection = module.get(getConnectionToken('Database'));

    boatService = module.get<BoatService>(BoatService);
    boatProvider = module.get<TestBoatProvider>(TestBoatProvider);
    userProvider = module.get<TestUserProvider>(TestUserProvider);
    boatModel = module.get<Model<Boat>>(Boat.name + 'Model');

    await userProvider.init();
    await boatProvider.init();
  });

  it('should check that the service exists', () => {
    expect(boatService).toBeDefined();
  });

  describe('updateGpsEnabled', () => {
    it('should update gps enabled attribute', async () => {
      const boat = boatProvider.defaultBoat;
      expect(boat.gpsEnabled).toEqual(true);
      await boatService.updateGpsEnabled(boat._id.toString(), {
        gpsEnabled: false,
      });
      const updatedBoat = await boatModel.findById(boat._id);
      expect(updatedBoat.gpsEnabled).toEqual(false);
    });
  });

  describe('updateLocation', () => {
    it('should update location and last positions as well', async () => {
      const boat = boatProvider.defaultBoat;
      expect(boat.longitude).toEqual(17.49);
      expect(boat.latitude).toEqual(46.759);
      await boatService.updateLocation(boat._id.toString(), {
        latitude: 18.22,
        longitude: 47,
      });
      const updatedBoat = await boatModel.findById(boat._id);
      expect(updatedBoat.longitude).toEqual(47);
      expect(updatedBoat.latitude).toEqual(18.22);
      expect(updatedBoat.lastPositions.at(-1)).toEqual({
        latitude: 18.22,
        longitude: 47,
      });
    });
  });

  describe('updateBoat', () => {
    it('should create new boat when input doesnt have id', async () => {
      const boats = await boatModel.find();
      expect(boats.length).toEqual(1);

      await boatService.updateBoat({
        userId: userProvider.defaultUser._id.toString(),
        boatType: 'smallBoat',
        displayName: 'asd',
        gpsEnabled: false,
        longitude: 0,
        latitude: 0,
      });
      const updatedBoats = await boatModel.find();
      expect(updatedBoats.length).toEqual(2);
    });

    it('should update boat when input does have id', async () => {
      const boats = await boatModel.find();
      expect(boats.length).toEqual(1);

      await boatService.updateBoat({
        _id: boatProvider.defaultBoat._id.toString(),
        userId: userProvider.defaultUser._id.toString(),
        boatType: 'smallBoat',
        displayName: 'asd',
        gpsEnabled: false,
        longitude: 0,
        latitude: 0,
      });
      const updatedBoats = await boatModel.find();
      expect(updatedBoats.length).toEqual(1);

      const updatedBoat = await boatModel
        .findById(boatProvider.defaultBoat._id.toString())
        .lean();

      expect(updatedBoat.longitude).toEqual(0);
      expect(updatedBoat.latitude).toEqual(0);
      expect(updatedBoat.displayName).toEqual('asd');
    });
  });

  describe('getBoatById', () => {
    it('should fail because boat with given id doesnt exist', async () => {
      await expect(() =>
        boatService.getBoatById(userProvider.defaultUser._id.toString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return boat by id', async () => {
      const result = await boatService.getBoatById(
        boatProvider.defaultBoat._id.toString(),
      );
      expect(result).toEqual(boatProvider.defaultBoat);
    });
  });

  describe('getBoatByUserId', () => {
    it('should fail because boat with given userid doesnt exist', async () => {
      await expect(() =>
        boatService.getBoatByUserId(boatProvider.defaultBoat._id.toString()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return boat by userid', async () => {
      const result = await boatService.getBoatByUserId(
        userProvider.defaultUser._id.toString(),
      );
      expect(result).toEqual(boatProvider.defaultBoat);
    });
  });

  describe('getMarkers', () => {
    it('should get markers when center point is near boat', async () => {
      const markers = await boatService.getMarkers({
        longitude: 17.49,
        latitude: 46.759,
      });
      expect(markers.length).toEqual(1);
    });

    it('should not get markers when center point is not near boat', async () => {
      const markers = await boatService.getMarkers({
        longitude: 0,
        latitude: 0,
      });
      expect(markers.length).toEqual(0);
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
