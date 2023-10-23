import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../models/schema/user.schema';

const mongooseModule = [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];

@Module({
  imports: [...mongooseModule],
  providers: [UsersService],
  exports: [UsersService, ...mongooseModule],
})
export class UsersModule {}
