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
import {MaDatTruoc} from '../models';
import {MaDatTruocRepository} from '../repositories';

export class MaDatTruocController {
  constructor(
    @repository(MaDatTruocRepository)
    public maDatTruocRepository : MaDatTruocRepository,
  ) {}

  @post('/ma-dat-truocs')
  @response(200, {
    description: 'MaDatTruoc model instance',
    content: {'application/json': {schema: getModelSchemaRef(MaDatTruoc)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaDatTruoc, {
            title: 'NewMaDatTruoc',
            exclude: ['id'],
          }),
        },
      },
    })
    maDatTruoc: Omit<MaDatTruoc, 'id'>,
  ): Promise<MaDatTruoc> {
    return this.maDatTruocRepository.create(maDatTruoc);
  }

  @get('/ma-dat-truocs/count')
  @response(200, {
    description: 'MaDatTruoc model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MaDatTruoc) where?: Where<MaDatTruoc>,
  ): Promise<Count> {
    return this.maDatTruocRepository.count(where);
  }

  @get('/ma-dat-truocs')
  @response(200, {
    description: 'Array of MaDatTruoc model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MaDatTruoc, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MaDatTruoc) filter?: Filter<MaDatTruoc>,
  ): Promise<MaDatTruoc[]> {
    return this.maDatTruocRepository.find(filter);
  }

  @patch('/ma-dat-truocs')
  @response(200, {
    description: 'MaDatTruoc PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaDatTruoc, {partial: true}),
        },
      },
    })
    maDatTruoc: MaDatTruoc,
    @param.where(MaDatTruoc) where?: Where<MaDatTruoc>,
  ): Promise<Count> {
    return this.maDatTruocRepository.updateAll(maDatTruoc, where);
  }

  @get('/ma-dat-truocs/{id}')
  @response(200, {
    description: 'MaDatTruoc model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MaDatTruoc, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MaDatTruoc, {exclude: 'where'}) filter?: FilterExcludingWhere<MaDatTruoc>
  ): Promise<MaDatTruoc> {
    return this.maDatTruocRepository.findById(id, filter);
  }

  @patch('/ma-dat-truocs/{id}')
  @response(204, {
    description: 'MaDatTruoc PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MaDatTruoc, {partial: true}),
        },
      },
    })
    maDatTruoc: MaDatTruoc,
  ): Promise<void> {
    await this.maDatTruocRepository.updateById(id, maDatTruoc);
  }

  @put('/ma-dat-truocs/{id}')
  @response(204, {
    description: 'MaDatTruoc PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() maDatTruoc: MaDatTruoc,
  ): Promise<void> {
    await this.maDatTruocRepository.replaceById(id, maDatTruoc);
  }

  @del('/ma-dat-truocs/{id}')
  @response(204, {
    description: 'MaDatTruoc DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.maDatTruocRepository.deleteById(id);
  }
}
