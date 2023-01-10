import { Table, Column, Model, AllowNull, PrimaryKey } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataTypes.UUID)
  id!: string

  @AllowNull(false)
  @Column({ type: DataTypes.STRING })
  email!: string;

  @AllowNull(false)
  @Column({ type: DataTypes.STRING })
  password!: string;

  @AllowNull(false)
  @Column({ type: DataTypes.STRING })
  name!: string;

  @AllowNull(false)
  @Column({ type: DataTypes.STRING, field: 'last_name' })
  lastName!: string;

  @Column({ type: DataTypes.DATE, field: 'created_at' })
  createdAt!: string;
}
