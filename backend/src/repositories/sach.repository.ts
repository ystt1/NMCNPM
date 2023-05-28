import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sach, SachRelations} from '../models';

export class SachRepository extends DefaultCrudRepository<
  Sach,
  typeof Sach.prototype.id,
  SachRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sach, dataSource);
  }
}
