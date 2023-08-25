import { TransformFnParams } from 'class-transformer';

export function transformToInt(params: TransformFnParams) {
  if (params.value) {
    return parseInt(params.value);
  }

  return;
}
export function transformToBoolean(params: TransformFnParams) {
  if (params.value) {
    return Boolean(params.value);
  }

  return;
}
