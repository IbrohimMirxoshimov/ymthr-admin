import { HttpException, HttpStatus } from '@nestjs/common';
import { ILike, In, ObjectLiteral, Repository } from 'typeorm';
import { IPaginationOptions } from './types/pagination-options';

export function getPaginationOptions(query: IPaginationOptions) {
  return {
    skip: (query.page - 1) * query.limit,
    take: query.limit,
  };
}
export function isExistWithProperty(
  repository: Repository<ObjectLiteral>,
  id: number,
  property_id: number,
) {
  return repository.findOne({
    where: {
      id: id,
      property: {
        id: property_id,
      },
    },
    select: ['id'],
  });
}

export function transformIdsToObject(dto: ObjectLiteral) {
  for (const key in dto) {
    if (Object.prototype.hasOwnProperty.call(dto, key)) {
      const element = dto[key];

      if (key.endsWith('_ids')) {
        delete dto[key];
        dto[key.replace('_ids', '')] = element.map((id: number) => ({ id }));
      } else if (key.endsWith('_id')) {
        delete dto[key];
        dto[key.replace('_id', '')] = { id: element };
      }
    }
  }

  return dto;
}

export async function isReferencesExistWithException(
  repo: Repository<any>,
  ids: number[],
) {
  if (await isReferencesExist(repo, ids)) return true;

  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      errors: {
        [repo.metadata.tableName]: 'The given values were not found',
      },
    },
    HttpStatus.BAD_REQUEST,
  );
}

export async function isReferencesExist(repo: Repository<any>, ids: number[]) {
  if (!ids.length) return true;

  const referencedItemsCount = await repo.countBy({
    id: In(ids),
  });

  if (ids.length === referencedItemsCount) return true;

  return false;
}

export function ILikeIfExist(value?: string) {
  if (value) {
    return ILike('%' + value + '%');
  }
}
