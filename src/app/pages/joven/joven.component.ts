import { Action } from './../../models/action';
import { Joven } from 'src/app/models/joven';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joven',
  templateUrl: './joven.component.html',
  styleUrls: ['./joven.component.scss'],
})
export class JovenComponent implements OnInit {
  _id = '';
  joven!: Joven;
  ministraciones!: Action[];
  preocupaciones!: Action[];
  talentos!: Action[];
  deseos!: Action[];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly snack: MatSnackBar,
    private readonly api: ApiService
  ) {}

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.params['_id'];
    this.getJoven();
    this.refresh(true);
  }

  refresh(res: boolean): void {
    if (res) {
      this.getMinistraciones();
      this.getPreocupaciones();
      this.getDeseos();
      this.geTalentos();
    }
  }

  getJoven(): void {
    this.api.getJoven(this._id).subscribe({
      next: (res: any) => {
        this.joven = res.young;
      },
      error: (error: ErrorHandler) => {
        console.error(error);
      },
    });
  }

  getMinistraciones(): void {
    this.api.getMinistraciones(this._id).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.ministraciones = res.actions;
        } else {
          this.snack.open(res.message, 'ok', { duration: 3000 });
        }
      },
      error: (error: ErrorHandler) => {
        console.log(error);
        this.snack.open(`Error al realizar la consulta`, 'ok', {
          duration: 3000,
        });
      },
    });
  }

  getPreocupaciones(): void {
    this.api.getPreocupaciones(this._id).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.preocupaciones = res.actions;
        } else {
          this.snack.open(res.message, 'ok', { duration: 3000 });
        }
      },
      error: (error: ErrorHandler) => {
        console.log(error);
        this.snack.open(`Error al realizar la consulta`, 'ok', {
          duration: 3000,
        });
      },
    });
  }

  getDeseos(): void {
    this.api.getDeseos(this._id).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.deseos = res.actions;
        } else {
          this.snack.open(res.message, 'ok', { duration: 3000 });
        }
      },
      error: (error: ErrorHandler) => {
        console.log(error);
        this.snack.open(`Error al realizar la consulta`, 'ok', {
          duration: 3000,
        });
      },
    });
  }

  geTalentos(): void {
    this.api.getTalentos(this._id).subscribe({
      next: (res: any) => {
        if (res.ok) {
          this.talentos = res.actions;
        } else {
          this.snack.open(res.message, 'ok', { duration: 3000 });
        }
      },
      error: (error: ErrorHandler) => {
        console.error(error);
        this.snack.open(`Error al realizar la consulta`, 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
