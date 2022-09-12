import {UserToken} from "./UserToken";

export class Spending{
  id:number;
  name: string;
  amount: number;


  constructor(id: number, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}



