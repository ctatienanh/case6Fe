import {AppUser} from "./AppUser";

export class Notification{
  content:string;
  date: any;
  time: any;
  user_ph:AppUser;


  constructor(content: string, date: any, time: any, user_ph: AppUser) {
    this.content = content;
    this.date = date;
    this.time = time;
    this.user_ph = user_ph;
  }
}
