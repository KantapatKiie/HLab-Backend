import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@repositories/base.repository';
import { UserProfile } from '@entities/user-profile.entity';

@Injectable()
export class UserProfileRepository extends BaseRepository<UserProfile> {
  constructor(dataSource: DataSource) {
    super(UserProfile, dataSource.createEntityManager());
  }
}
