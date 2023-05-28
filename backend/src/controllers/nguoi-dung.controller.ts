import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {NguoiDung} from '../models';
import {NguoiDungRepository} from '../repositories';

export class NguoiDungController {
  constructor(
    @repository(NguoiDungRepository)
    public nguoiDungRepository : NguoiDungRepository,
  ) {}

  @post('/nguoi-dungs')
  @response(200, {
    description: 'NguoiDung model instance',
    content: {'application/json': {schema: getModelSchemaRef(NguoiDung)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NguoiDung, {
            title: 'NewNguoiDung',
            exclude: ['id'],
          }),
        },
      },
    })
    nguoiDung: Omit<NguoiDung, 'id'>,
  ): Promise<NguoiDung> {
    return this.nguoiDungRepository.create(nguoiDung);
  }

  @get('/nguoi-dungs/count')
  @response(200, {
    description: 'NguoiDung model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NguoiDung) where?: Where<NguoiDung>,
  ): Promise<Count> {
    return this.nguoiDungRepository.count(where);
  }

  @get('/nguoi-dungs')
  @response(200, {
    description: 'Array of NguoiDung model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NguoiDung, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NguoiDung) filter?: Filter<NguoiDung>,
  ): Promise<NguoiDung[]> {
    return this.nguoiDungRepository.find(filter);
  }

  @patch('/nguoi-dungs')
  @response(200, {
    description: 'NguoiDung PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NguoiDung, {partial: true}),
        },
      },
    })
    nguoiDung: NguoiDung,
    @param.where(NguoiDung) where?: Where<NguoiDung>,
  ): Promise<Count> {
    return this.nguoiDungRepository.updateAll(nguoiDung, where);
  }

  @get('/nguoi-dungs/{id}')
  @response(200, {
    description: 'NguoiDung model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NguoiDung, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NguoiDung, {exclude: 'where'}) filter?: FilterExcludingWhere<NguoiDung>
  ): Promise<NguoiDung> {
    return this.nguoiDungRepository.findById(id, filter);
  }

  @patch('/nguoi-dungs/{id}')
  @response(204, {
    description: 'NguoiDung PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NguoiDung, {partial: true}),
        },
      },
    })
    nguoiDung: NguoiDung,
  ): Promise<void> {
    await this.nguoiDungRepository.updateById(id, nguoiDung);
  }

  @put('/nguoi-dungs/{id}')
  @response(204, {
    description: 'NguoiDung PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nguoiDung: NguoiDung,
  ): Promise<void> {
    await this.nguoiDungRepository.replaceById(id, nguoiDung);
  }

  @del('/nguoi-dungs/{id}')
  @response(204, {
    description: 'NguoiDung DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.nguoiDungRepository.deleteById(id);
  }
}
