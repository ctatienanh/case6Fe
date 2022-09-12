export class lichsugiaodich{
  id:number;
  date:Date;
  money:number;
  name: string;
  namespending:string;
  time:Date;

  constructor(id: number, date: Date, money: number, name: string, namespending: string, time: Date) {
    this.id = id;
    this.date = date;
    this.money = money;
    this.name = name;
    this.namespending = namespending;
    this.time = time;
  }
}
