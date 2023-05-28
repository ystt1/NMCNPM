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
import {BoSach} from '../models';
import {BoSachRepository} from '../repositories';

export class BoSachController {
  constructor(
    @repository(BoSachRepository)
    public boSachRepository : BoSachRepository,
  ) {}

  @post('/bo-saches')
  @response(200, {
    description: 'BoSach model instance',
    content: {'application/json': {schema: getModelSchemaRef(BoSach)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BoSach, {
            title: 'NewBoSach',
            exclude: ['id'],
          }),
        },
      },
    })
    boSach: Omit<BoSach, 'id'>,
  ): Promise<BoSach> {
    return this.boSachRepository.create(boSach);
  }

  @get('/bo-saches/count')
  @response(200, {
    description: 'BoSach model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BoSach) where?: Where<BoSach>,
  ): Promise<Count> {
    return this.boSachRepository.count(where);
  }

  @get('/bo-saches')
  @response(200, {
    description: 'Array of BoSach model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BoSach, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BoSach) filter?: Filter<BoSach>,
  ): Promise<BoSach[]> {
    return this.boSachRepository.find(filter);
  }

  @patch('/bo-saches')
  @response(200, {
    description: 'BoSach PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BoSach, {partial: true}),
        },
      },
    })
    boSach: BoSach,
    @param.where(BoSach) where?: Where<BoSach>,
  ): Promise<Count> {
    return this.boSachRepository.updateAll(boSach, where);
  }

  @get('/bo-saches/{id}')
  @response(200, {
    description: 'BoSach model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BoSach, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BoSach, {exclude: 'where'}) filter?: FilterExcludingWhere<BoSach>
  ): Promise<BoSach> {
    return this.boSachRepository.findById(id, filter);
  }

  @patch('/bo-saches/{id}')
  @response(204, {
    description: 'BoSach PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BoSach, {partial: true}),
        },
      },
    })
    boSach: BoSach,
  ): Promise<void> {
    await this.boSachRepository.updateById(id, boSach);
  }

  @put('/bo-saches/{id}')
  @response(204, {
    description: 'BoSach PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() boSach: BoSach,
  ): Promise<void> {
    await this.boSachRepository.replaceById(id, boSach);
  }

  @del('/bo-saches/{id}')
  @response(204, {
    description: 'BoSach DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.boSachRepository.deleteById(id);
  }
}
