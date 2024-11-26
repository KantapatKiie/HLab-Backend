import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class BaseRepository<Entity> extends Repository<Entity> {
  constructor(
    private entity: EntityTarget<Entity>,
    manager: EntityManager,
  ) {
    super(entity, manager);
  }

  findManyWithActive(
    options?: FindManyOptions<Entity>,
  ): Promise<Array<Entity>> {
    return this.manager.find<any>(this.entity, {
      ...options,
      where: { ...options?.where, isActive: true },
    });
  }

  findOneWithActive(options?: FindManyOptions<Entity>): Promise<Entity> {
    return this.manager.findOne<any>(this.entity, {
      ...options,
      where: { ...options?.where, isActive: true },
    });
  }

  findManyExistData(options?: FindManyOptions<Entity>): Promise<Array<Entity>> {
    return this.manager.find<any>(this.entity, {
      ...options,
      where: { ...options?.where, isDeleted: false },
    });
  }

  findOneExistData(options?: FindManyOptions<Entity>): Promise<Entity> {
    return this.manager.findOne<any>(this.entity, {
      ...options,
      where: { ...options?.where, isDeleted: false },
    });
  }
}
