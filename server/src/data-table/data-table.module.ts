//data-table.module.ts
import { Module } from '@nestjs/common';
import { DataTableController } from './data-table.controller';
import { DataTableService } from './data-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DataTableSchema } from './schema/DataTable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DataTable', schema: DataTableSchema }]),
  ],
  controllers: [DataTableController],
  providers: [DataTableService],
})
export class DataTableModule {}
