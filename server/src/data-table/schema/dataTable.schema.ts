// dataTable.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DataTable extends Document {
  @Prop({ required: true, unique: true })
  numReq: number;

  @Prop()
  dateTimeReq: string;

  @Prop()
  clientFirm: string;

  @Prop()
  fioTrans: string;

  @Prop()
  phoneTrans: string;

  @Prop()
  comments: string;

  @Prop()
  status: string;

  @Prop()
  linkTrans: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const DataTableSchema = SchemaFactory.createForClass(DataTable);
