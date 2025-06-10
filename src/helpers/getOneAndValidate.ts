import { ObjectLiteral, Repository } from 'typeorm';
import { CustomError } from './customError';

export async function getOneAndValidate(
  repository: Repository<ObjectLiteral>,
  id: number
): Promise<ObjectLiteral> {
  if (isNaN(id)) throw new CustomError(400, 'ID provided is not valid');

  const item = await repository.findOne({ where: { id } });
  const entityName = (repository.metadata as ObjectLiteral).target.name;

  if (!item) throw new CustomError(404, `${entityName} not found`);

  return item;
}
