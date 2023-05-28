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
import {Sach} from '../models';
import {SachRepository} from '../repositories';

export class SachController {
  constructor(
    @repository(SachRepository)
    public sachRepository : SachRepository,
  ) {}

  @post('/saches')
  @response(200, {
    description: 'Sach model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sach)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sach, {
            title: 'NewSach',
            exclude: ['id'],
          }),
        },
      },
    })
    sach: Omit<Sach, 'id'>,
  ): Promise<Sach> {
    return this.sachRepository.create(sach);
  }

  @get('/saches/count')
  @response(200, {
    description: 'Sach model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sach) where?: Where<Sach>,
  ): Promise<Count> {
    return this.sachRepository.count(where);
  }

  @get('/saches')
  @response(200, {
    description: 'Array of Sach model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sach, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sach) filter?: Filter<Sach>,
  ): Promise<Sach[]> {
    return this.sachRepository.find(filter);
  }

  @patch('/saches')
  @response(200, {
    description: 'Sach PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sach, {partial: true}),
        },
      },
    })
    sach: Sach,
    @param.where(Sach) where?: Where<Sach>,
  ): Promise<Count> {
    return this.sachRepository.updateAll(sach, where);
  }

  @get('/saches/{id}')
  @response(200, {
    description: 'Sach model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sach, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sach, {exclude: 'where'}) filter?: FilterExcludingWhere<Sach>
  ): Promise<Sach> {
    return this.sachRepository.findById(id, filter);
  }

  @patch('/saches/{id}')
  @response(204, {
    description: 'Sach PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sach, {partial: true}),
        },
      },
    })
    sach: Sach,
  ): Promise<void> {
    await this.sachRepository.updateById(id, sach);
  }

  @put('/saches/{id}')
  @response(204, {
    description: 'Sach PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sach: Sach,
  ): Promise<void> {
    await this.sachRepository.replaceById(id, sach);
  }

  @del('/saches/{id}')
  @response(204, {
    description: 'Sach DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sachRepository.deleteById(id);
  }
}
