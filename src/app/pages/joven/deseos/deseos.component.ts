import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action';

@Component({
  selector: 'app-deseos',
  templateUrl: './deseos.component.html',
  styleUrls: ['./deseos.component.scss'],
})
export class DeseosComponent implements OnInit {
  @Input() deseos!: Action[];
  constructor() {}

  ngOnInit(): void {
    console.log();

  }
}
