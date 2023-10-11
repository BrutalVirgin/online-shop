import { forwardRef, Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from './entity/bucket.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [forwardRef(() => OrderModule), TypeOrmModule.forFeature([Bucket])],
  controllers: [BucketController],
  providers: [BucketService],
  exports: [BucketService],
})
export class BucketModule {}
