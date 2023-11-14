import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../src/models/schema/user.schema';

@Injectable()
export class TestUserProvider {
  defaultUser: User | null;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async init(): Promise<void> {
    const tmp = await this.userModel.create({
      _id: new Types.ObjectId('64c38c441ae9028fd6fa6b8b'),
      username: 'takee',
      emailAddress: 'test@test.com',
      familyName: 'Takacs',
      givenName: 'Balint',
      passwordHash:
        '$2a$05$CeR/AL6pdp2MgOpClqM66O1HGtOFuz/pkwe9kI6w5GXxkoa1IYIXS', // Xyz123#@
      isEmailVerified: true,
    });

    this.defaultUser = tmp.toObject();
  }
}
