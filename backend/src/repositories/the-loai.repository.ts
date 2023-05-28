import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TheLoai, TheLoaiRelations} from '../models';

export class TheLoaiRepository extends DefaultCrudRepository<
  TheLoai,
  typeof TheLoai.prototype.id,
  TheLoaiRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TheLoai, dataSource);
  }
}
