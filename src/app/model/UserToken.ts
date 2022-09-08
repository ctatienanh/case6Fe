import {Role} from "./role";

export class UserToken{
  id: number;
  name: string;
  token:string;
  roles: Role[];


  constructor(id: number, name: string, token: string, roles: Role[]) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.roles = roles;
  }
}
