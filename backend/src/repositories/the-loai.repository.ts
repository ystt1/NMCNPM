import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TheLoai, TheLoaiRelations} from '../models';

export class TheLoaiRepository extends DefaultCrudRepository<
  TheLoai,
  typeof TheLoai.prototype.id,
  TheLoaiRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(TheLoai, dataSource);
  }
}
