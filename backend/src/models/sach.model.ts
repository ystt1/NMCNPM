import {Entity, model, property} from '@loopback/repository';

@model()
export class Sach extends Entity {
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
    type: 'number',
    required: true,
  })
  SoLuong: number;

  @property({
    type: 'string',
  })
  NXB?: string;

  @property({
    type: 'string',
    required: true,
  })
  MoTa: string;

  @property({
    type: 'string',
    required: true,
  })
  Gia: string;

  @property({
    type: 'number',
    required: true,
  })
  TinhTrang: number;

  @property({
    type: 'date',
    required: true,
  })
  NgayPhatHanh: string;

  @property({
    type: 'number',
    default: 0,
  })
  LuotThue?: number;

  @property({
    type: 'string',
    required: true,
  })
  idTacGia: string;

  @property({
    type: 'string',
  })
  idBoSach?: string;

  @property({
    type: 'number',
    default: 0,
  })
  LuotThich?: number;


  constructor(data?: Partial<Sach>) {
    super(data);
  }
}

export interface SachRelations {
  // describe navigational properties here
}

export type SachWithRelations = Sach & SachRelations;
