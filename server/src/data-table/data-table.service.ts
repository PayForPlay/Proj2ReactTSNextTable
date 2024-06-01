//data-table.service
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DataTable } from './schema/dataTable.schema';

@Injectable()
export class DataTableService {
  constructor(
    @InjectModel(DataTable.name)
    private dataTableModel: Model<DataTable>,
  ) {}

  async findAll(): Promise<DataTable[]> {
    const DataTables = await this.dataTableModel.find();
    return DataTables;
  }
  async create(dataTable: DataTable): Promise<DataTable> {
    try {
      const lastEntry = await this.dataTableModel
        .findOne({}, {}, { sort: { numReq: -1 } })
        .exec();
      let numReq = 1;
      if (lastEntry) {
        numReq = lastEntry.numReq + 1;
      }
      dataTable.numReq = numReq;
      const newDataTable = new this.dataTableModel(dataTable);
      const savedDataTable = await newDataTable.save();

      return savedDataTable;
    } catch (error) {
      console.error('Ошибка сохранения DataTable:', error);
      throw new BadRequestException('Ошибка сохранения DataTable');
    }
  }

  async updateById(id: number, DataTable: DataTable): Promise<DataTable> {
    return await this.dataTableModel.findByIdAndUpdate(id, DataTable, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: number): Promise<DataTable> {
    return await this.dataTableModel.findByIdAndDelete(id);
  }
}
