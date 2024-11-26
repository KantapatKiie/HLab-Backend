import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@repositories/base.repository';
import { Example } from '@entities/example.entity';

@Injectable()
export class ExampleRepository extends BaseRepository<Example> {
  constructor(dataSource: DataSource) {
    super(Example, dataSource.createEntityManager());
  }
}
