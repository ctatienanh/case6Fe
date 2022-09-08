import { Component, OnInit } from '@angular/core';
import {ScriptService} from "../../service/script.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private script: ScriptService) { }

  ngOnInit(): void {
    this.script.load('jquery','adminlte').then(data => {
    }).catch(error => console.log(error));
  }

}
