import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    const dateCreated = createDto?.date_created
      ? createDto.date_created
      : new Date();

    const record = this.repository.create({
      ...createDto,
      date_created: dateCreated,
      date_updated: dateCreated,
    });

    const savedRecord = await this.repository.save(record);
    return savedRecord;
  }

  async find(findManyOptions?: FindManyOptions): Promise<T[]> {
    const findResult = await this.repository.find(findManyOptions);
    return findResult;
  }

  async findOne(findOneOptions: FindOptionsWhere<T>): Promise<T> {
    const findOneResult = await this.repository.findOneBy(findOneOptions);
    return findOneResult;
  }

  async update(
    id: number,
    updateDto: QueryDeepPartialEntity<ObjectLiteral>,
    updateTimeStamp = true,
  ): Promise<UpdateResult> {
    if (updateTimeStamp) updateDto['date_updated'] = new Date();

    const updateResult = await this.repository.update(id, updateDto);
    return updateResult;
  }

  async save(
    foundRecord: T,
    updateDto: QueryDeepPartialEntity<ObjectLiteral>,
    updateTimeStamp = true,
  ): Promise<T> {
    if (updateTimeStamp) updateDto['date_updated'] = new Date();

    const updatedRecordResult = await this.repository.save({
      ...foundRecord,
      ...updateDto,
    });
    return updatedRecordResult;
  }

  async delete(id: number): Promise<DeleteResult> {
    const deleteResult = await this.repository.delete(id);

    return deleteResult;
  }
}
