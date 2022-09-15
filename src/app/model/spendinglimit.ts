import {AppUser} from "./AppUser";

export class Spendinglimit{
  id:number;
  date1: any;
  date2: any;
  user!: AppUser;
  money:number;
  moneylimit: number;


  constructor(id: number, date1: any, date2: any, user: AppUser, money: number, moneylimit: number) {
    this.id = id;
    this.date1 = date1;
    this.date2 = date2;
    this.user = user;
    this.money = money;
    this.moneylimit = moneylimit;
  }
}
