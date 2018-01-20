import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export const toClass = <T>(constructor: ClassType<T>) => (
  plainObj: any
): Promise<T> => {
  const classObj = plainToClass<T, object>(constructor, plainObj);
  return Promise.resolve(classObj);
};

export const toClassArray = <T>(constructor: ClassType<T>) => (
  plainObjArray: any
): Promise<T[]> => {
  const classObjArray = plainToClass<T, object[]>(constructor, plainObjArray);
  return Promise.resolve(classObjArray);
};
