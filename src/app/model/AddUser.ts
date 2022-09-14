import {AppUser} from "./AppUser";

export class AddUser {
  id:number;
  user_sv!:AppUser;
  user_ph!:AppUser;

  constructor(id: number, user_sv: AppUser, user_ph: AppUser) {
    this.id = id;
    this.user_sv = user_sv;
    this.user_ph = user_ph;
  }
}
