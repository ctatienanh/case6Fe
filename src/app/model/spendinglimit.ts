import {AppUser} from "./AppUser";

export class Spendinglimit{
  id:number;
  date1: any;
  date2: any;
  user!: AppUser;
  money:number;
  moneylimit: number;
  status: number;


  constructor(id: number, date1: any, date2: any, money: number, moneylimit: number, status: number) {
    this.id = id;
    this.date1 = date1;
    this.date2 = date2;
    this.money = money;
    this.moneylimit = moneylimit;
    this.status = status;
  }
}
