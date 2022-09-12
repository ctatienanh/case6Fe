
export class Mct{
  id:number;
  name: string;
  namespending:string;
  money: number;
  date: any;
  time: any;
  constructor(id: number, name: string, namespending: string, money: number, date: any, time: any) {
    this.id = id;
    this.name = name;
    this.namespending = namespending;
    this.money = money;
    this.date = date;
    this.time = time;
  }
}
