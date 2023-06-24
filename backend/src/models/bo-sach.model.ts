import {Entity, model, property} from '@loopback/repository';

@model()
export class BoSach extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Ten: string;

  @property({
    type: 'string',
    required: true,
  })
  slug: string;


  constructor(data?: Partial<BoSach>) {
    super(data);
  }
}

export interface BoSachRelations {
  // describe navigational properties here
}

export type BoSachWithRelations = BoSach & BoSachRelations;
