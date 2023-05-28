import {Entity, model, property} from '@loopback/repository';

@model()
export class TheLoai extends Entity {
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


  constructor(data?: Partial<TheLoai>) {
    super(data);
  }
}

export interface TheLoaiRelations {
  // describe navigational properties here
}

export type TheLoaiWithRelations = TheLoai & TheLoaiRelations;
