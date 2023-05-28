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
import {TheLoai} from '../models';
import {TheLoaiRepository} from '../repositories';

export class TheLoaiController {
  constructor(
    @repository(TheLoaiRepository)
    public theLoaiRepository : TheLoaiRepository,
  ) {}

  @post('/the-loais')
  @response(200, {
    description: 'TheLoai model instance',
    content: {'application/json': {schema: getModelSchemaRef(TheLoai)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TheLoai, {
            title: 'NewTheLoai',
            exclude: ['id'],
          }),
        },
      },
    })
    theLoai: Omit<TheLoai, 'id'>,
  ): Promise<TheLoai> {
    return this.theLoaiRepository.create(theLoai);
  }

  @get('/the-loais/count')
  @response(200, {
    description: 'TheLoai model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TheLoai) where?: Where<TheLoai>,
  ): Promise<Count> {
    return this.theLoaiRepository.count(where);
  }

  @get('/the-loais')
  @response(200, {
    description: 'Array of TheLoai model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TheLoai, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TheLoai) filter?: Filter<TheLoai>,
  ): Promise<TheLoai[]> {
    return this.theLoaiRepository.find(filter);
  }

  @patch('/the-loais')
  @response(200, {
    description: 'TheLoai PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TheLoai, {partial: true}),
        },
      },
    })
    theLoai: TheLoai,
    @param.where(TheLoai) where?: Where<TheLoai>,
  ): Promise<Count> {
    return this.theLoaiRepository.updateAll(theLoai, where);
  }

  @get('/the-loais/{id}')
  @response(200, {
    description: 'TheLoai model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TheLoai, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TheLoai, {exclude: 'where'}) filter?: FilterExcludingWhere<TheLoai>
  ): Promise<TheLoai> {
    return this.theLoaiRepository.findById(id, filter);
  }

  @patch('/the-loais/{id}')
  @response(204, {
    description: 'TheLoai PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TheLoai, {partial: true}),
        },
      },
    })
    theLoai: TheLoai,
  ): Promise<void> {
    await this.theLoaiRepository.updateById(id, theLoai);
  }

  @put('/the-loais/{id}')
  @response(204, {
    description: 'TheLoai PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() theLoai: TheLoai,
  ): Promise<void> {
    await this.theLoaiRepository.replaceById(id, theLoai);
  }

  @del('/the-loais/{id}')
  @response(204, {
    description: 'TheLoai DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.theLoaiRepository.deleteById(id);
  }
}
