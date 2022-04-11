import { Component, Input, OnInit } from '@angular/core';
import { Action } from './../../../models/action';

@Component({
  selector: 'app-talentos',
  templateUrl: './talentos.component.html',
  styleUrls: ['./talentos.component.scss'],
})
export class TalentosComponent implements OnInit {
  @Input() talentos!: Action[];
  constructor() {}

  ngOnInit(): void {}
}
