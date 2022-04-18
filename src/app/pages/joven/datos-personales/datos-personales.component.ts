import { Component, Input, OnInit } from '@angular/core';
import { Joven } from 'src/app/models/joven';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
})
export class DatosPersonalesComponent implements OnInit {
  @Input() joven!: Joven;
  constructor() {}

  ngOnInit(): void {
    this.joven = {
      _id: '',
      name: '',
      lastName: '',
      dob: new Date(),
      phone: '',
      gender: '',
      wishes: 0,
      talents: 0,
      concerns: 0,
      ministrations: 0,
      lastMinistration: new Date(),
    };
  }
}
