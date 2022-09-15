import {AppUser} from "./AppUser";

export class Notification{
  id:number;
  content:string;
  date: any;
  time: any;
  status_confirm:boolean;
  user_ph:AppUser;

  constructor(id: number, content: string, date: any, time: any, status_confirm: boolean, user_ph: AppUser) {
    this.id = id;
    this.content = content;
    this.date = date;
    this.time = time;
    this.status_confirm = status_confirm;
    this.user_ph = user_ph;
  }
}
