import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TacGia, TacGiaRelations} from '../models';

export class TacGiaRepository extends DefaultCrudRepository<
  TacGia,
  typeof TacGia.prototype.id,
  TacGiaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: MongoDataSource,
  ) {
    super(TacGia, dataSource);
  }
}
