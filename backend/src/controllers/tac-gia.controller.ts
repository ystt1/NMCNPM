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
import {TacGia} from '../models';
import {TacGiaRepository} from '../repositories';

export class TacGiaController {
  constructor(
    @repository(TacGiaRepository)
    public tacGiaRepository : TacGiaRepository,
  ) {}

  @post('/tacgia')
  @response(200, {
    description: 'TacGia model instance',
    content: {'application/json': {schema: getModelSchemaRef(TacGia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TacGia, {
            title: 'NewTacGia',
            exclude: ['id'],
          }),
        },
      },
    })
    tacGia: Omit<TacGia, 'id'>,
  ): Promise<TacGia> {
    return this.tacGiaRepository.create(tacGia);
  }

  @get('/tacgia/count')
  @response(200, {
    description: 'TacGia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TacGia) where?: Where<TacGia>,
  ): Promise<Count> {
    return this.tacGiaRepository.count(where);
  }

  @get('/tacgia')
  @response(200, {
    description: 'Array of TacGia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TacGia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TacGia) filter?: Filter<TacGia>,
  ): Promise<TacGia[]> {
    return this.tacGiaRepository.find(filter);
  }

  @patch('/tacgia')
  @response(200, {
    description: 'TacGia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TacGia, {partial: true}),
        },
      },
    })
    tacGia: TacGia,
    @param.where(TacGia) where?: Where<TacGia>,
  ): Promise<Count> {
    return this.tacGiaRepository.updateAll(tacGia, where);
  }

  @get('/tacgia/{id}')
  @response(200, {
    description: 'TacGia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TacGia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TacGia, {exclude: 'where'}) filter?: FilterExcludingWhere<TacGia>
  ): Promise<TacGia> {
    return this.tacGiaRepository.findById(id, filter);
  }

  @patch('/tacgia/{id}')
  @response(204, {
    description: 'TacGia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TacGia, {partial: true}),
        },
      },
    })
    tacGia: TacGia,
  ): Promise<void> {
    await this.tacGiaRepository.updateById(id, tacGia);
  }

  @put('/tacgia/{id}')
  @response(204, {
    description: 'TacGia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tacGia: TacGia,
  ): Promise<void> {
    await this.tacGiaRepository.replaceById(id, tacGia);
  }

  @del('/tacgia/{id}')
  @response(204, {
    description: 'TacGia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tacGiaRepository.deleteById(id);
  }
}
