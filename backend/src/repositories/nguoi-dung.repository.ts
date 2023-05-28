import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {NguoiDung, NguoiDungRelations} from '../models';

export class NguoiDungRepository extends DefaultCrudRepository<
  NguoiDung,
  typeof NguoiDung.prototype.id,
  NguoiDungRelations
> {
  constructor(
    @inject('datasources.db') dataSource: MongoDataSource,
  ) {
    super(NguoiDung, dataSource);
  }
}
