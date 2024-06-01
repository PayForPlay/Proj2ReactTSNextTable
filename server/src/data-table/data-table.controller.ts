//data-table.controller
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DataTableService } from './data-table.service';
import { DataTableDto, UpdateDataTableDto } from './dto/DataTable.dto';
import { DataTable } from './schema/DataTable.schema';

@Controller('dataTable')
export class DataTableController {
  constructor(private readonly DataTableService: DataTableService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async getAllDataTable(): Promise<DataTable[]> {
    return this.DataTableService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createDataTable(
    @Body() dataTableDto: DataTableDto,
  ): Promise<DataTable> {
    const dataTable = { ...dataTableDto } as DataTable;
    return this.DataTableService.create(dataTable);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updateDataTable(
    @Body() updateDataTableDto: UpdateDataTableDto,
  ): Promise<DataTable> {
    // Конвертация из DTO в DataTable
    const dataTable = { ...updateDataTableDto } as DataTable;
    return this.DataTableService.updateById(dataTable._id, dataTable);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteDataTable(@Param('id') id: number): Promise<DataTable> {
    return this.DataTableService.deleteById(id);
  }
}
