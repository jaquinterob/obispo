import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action';

@Component({
  selector: 'app-ministraciones',
  templateUrl: './ministraciones.component.html',
  styleUrls: ['./ministraciones.component.scss'],
})
export class MinistracionesComponent implements OnInit {
  @Input() ministraciones!: Action[];
  constructor() {}
  ngOnInit(): void {
    console.log(this.ministraciones);
  }
}
