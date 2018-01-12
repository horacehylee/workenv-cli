import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export class Program extends Model<Program> {
  @Unique
  @Column
  name: string;

  @Column executable: string;

  @Column location: string;
}
