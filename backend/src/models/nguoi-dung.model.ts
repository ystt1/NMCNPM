import {Entity, model, property} from '@loopback/repository';

@model()
export class NguoiDung extends Entity {
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
  TaiKhoan: string;

  @property({
    type: 'string',
    required: true,
  })
  MatKhau: string;

  @property({
    type: 'string',
    required: true,
  })
  TenHienThi: string;

  @property({
    type: 'string',
    required: true,
  })
  SDT: string;

  @property({
    type: 'string',
    required: true,
  })
  DiaChi: string;

  @property({
    type: 'number',
    required: true,
  })
  IsAdmin: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  SachDaThich?: string[];

 


  constructor(data?: Partial<NguoiDung>) {
    super(data);
  }
}

export interface NguoiDungRelations {
  // describe navigational properties here
}

export type NguoiDungWithRelations = NguoiDung & NguoiDungRelations;
