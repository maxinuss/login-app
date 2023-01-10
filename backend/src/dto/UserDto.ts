import { IsString } from 'class-validator';
import { User } from "../model/User";

class UserDto {
  constructor(user?: User|null) {
    if (user) {
      this.email = user.email
      this.name = user.name
      this.lastName = user.lastName
      this.createdAt = user.createdAt
    }
  }

  @IsString()
  public email!: string;

  @IsString()
  public name!: string;

  @IsString()
  public lastName!: string;

  @IsString()
  public createdAt!: string;
}

export default UserDto;