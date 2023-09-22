import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { SoftDeleteMiddleware } from './middleware/soft-delete.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();

      this.$use(async (params: Prisma.MiddlewareParams, next: (params : Prisma.MiddlewareParams)=> Promise<any>,) => {
        return SoftDeleteMiddleware.execute(params, next as any);
      });
    }
  }
