export class AppUser{
  id:number;
  username: string;
  password: string;
  roles : string;
  email: string;
  name: string;
  aress: string;
  phone: number;
  age: number;
  img: string;


  constructor(id: number, username: string, password: string, roles: string, email: string, name: string, aress: string, phone: number, age: number, img: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.email = email;
    this.name = name;
    this.aress = aress;
    this.phone = phone;
    this.age = age;
    this.img = img;
  }
}
