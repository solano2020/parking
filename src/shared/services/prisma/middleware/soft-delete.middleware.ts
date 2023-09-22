import { Prisma } from "@prisma/client";
import * as _ from 'lodash'; 

export class SoftDeleteMiddleware {
    static async execute(
      params: Prisma.MiddlewareParams,
      next: (args: Prisma.MiddlewareParams) => Promise<any>
    ) {
      if (!this.hasSoftDeleteProperty(params.model)) {
        return next(params);
      }
  
      switch (params.action) {
        case 'delete':
          return next({
            ...params,
            action: 'update',
            args: { ...params.args, data: { delete_at: new Date() } },
          });
        case 'deleteMany':
          return next({
            ...params,
            action: 'updateMany',
            args: {
              ...params.args,
              data: { dalete_at: new Date() },
            },
          });
        case 'findUnique':
          return next({
            ...params,
            action: 'findFirst',
            args: {
              ...params.args,
              where: { ...params.args.where, delete_at: null },
            },
          });
        case 'findFirst':
          return next({
            ...params,
            action: 'findFirst',
            args: {
              ...params.args,
              where: { ...params.args.where, delete_at: null },
            },
          });
        case 'findMany':
          return next({
            ...params,
            args: {
              ...params.args,
              where: _.get(params, 'args.where')
                ? { delete_at: null, ...params.args.where }
                : { delete_at: null },
            },
          });
        default:
          return next(params);
      }
    }
  
    private static hasSoftDeleteProperty = (() => {
      const cache: { [key: string]: boolean } = {};
  
      return (model: Prisma.ModelName): boolean => {
        if (cache[model] !== undefined) {
          return cache[model];
        }
  
        const models = [
          this.extractModelProperties(Prisma, model),
        ];
  
        const result = models.some((currentModel) =>
          _.includes(currentModel, 'delete_at')
        );
  
        cache[model] = result;
        return result;
      };
    })();
  
    private static extractModelProperties(
      client: typeof Prisma,
      model: Prisma.ModelName
    ): string[] {
      return client.dmmf.datamodel.models
        .find((currentModel) => currentModel.name === model)
        ?.fields?.map((currentModel) => currentModel.name);
    }
  }