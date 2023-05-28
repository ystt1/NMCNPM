import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {NguoiDung, NguoiDungRelations} from '../models';

export class NguoiDungRepository extends DefaultCrudRepository<
  NguoiDung,
  typeof NguoiDung.prototype.id,
  NguoiDungRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(NguoiDung, dataSource);
  }
}
