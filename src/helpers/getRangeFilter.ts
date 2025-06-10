import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual
} from 'typeorm';

export function getRangeFilter(
  min?: number | Date,
  max?: number | Date
): FindOperator<number | Date> | undefined {
  return min !== undefined && max !== undefined
    ? Between(min, max)
    : min !== undefined
      ? MoreThanOrEqual(min)
      : max !== undefined
        ? LessThanOrEqual(max)
        : undefined;
}
