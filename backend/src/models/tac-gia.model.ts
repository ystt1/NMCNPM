import {Entity, model, property} from '@loopback/repository';

@model()
export class TacGia extends Entity {
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


  constructor(data?: Partial<TacGia>) {
    super(data);
  }
}

export interface TacGiaRelations {
  // describe navigational properties here
}

export type TacGiaWithRelations = TacGia & TacGiaRelations;
