import { Component, Input, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action';

@Component({
  selector: 'app-preocupaciones',
  templateUrl: './preocupaciones.component.html',
  styleUrls: ['./preocupaciones.component.scss'],
})
export class PreocupacionesComponent implements OnInit {
  @Input() preocupaciones!: Action[];
  constructor() {}

  ngOnInit(): void {
    console.log();

  }
}
