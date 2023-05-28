import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {BoSach, BoSachRelations} from '../models';

export class BoSachRepository extends DefaultCrudRepository<
  BoSach,
  typeof BoSach.prototype.id,
  BoSachRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(BoSach, dataSource);
  }
}
