import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {MaDatTruoc, MaDatTruocRelations} from '../models';

export class MaDatTruocRepository extends DefaultCrudRepository<
  MaDatTruoc,
  typeof MaDatTruoc.prototype.id,
  MaDatTruocRelations
> {
  constructor(
    @inject('datasources.db') dataSource: MongoDataSource,
  ) {
    super(MaDatTruoc, dataSource);
  }
}
