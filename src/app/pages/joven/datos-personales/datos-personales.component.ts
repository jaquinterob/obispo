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

  ngOnInit(): void {}
}
