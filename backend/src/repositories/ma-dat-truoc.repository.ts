import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MaDatTruoc, MaDatTruocRelations} from '../models';

export class MaDatTruocRepository extends DefaultCrudRepository<
  MaDatTruoc,
  typeof MaDatTruoc.prototype.id,
  MaDatTruocRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MaDatTruoc, dataSource);
  }
}
