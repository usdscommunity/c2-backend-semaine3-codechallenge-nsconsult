import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importez le module TypeOrm pour l'entité User
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
