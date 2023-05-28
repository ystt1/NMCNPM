import {Entity, model, property} from '@loopback/repository';

@model()
export class MaDatTruoc extends Entity {
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
  idNguoiDung: string;

  @property({
    type: 'string',
    required: true,
  })
  idSach: string;

  @property({
    type: 'number',
    required: true,
  })
  SoLuong: number;

  @property({
    type: 'string',
    required: true,
  })
  SDT: string;

  @property({
    type: 'number',
    required: true,
  })
  TinhTrang: number;


  constructor(data?: Partial<MaDatTruoc>) {
    super(data);
  }
}

export interface MaDatTruocRelations {
  // describe navigational properties here
}

export type MaDatTruocWithRelations = MaDatTruoc & MaDatTruocRelations;
