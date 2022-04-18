import { Component, ErrorHandler, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Action } from 'src/app/models/action';

@Component({
  selector: 'app-ministraciones',
  templateUrl: './ministraciones.component.html',
  styleUrls: ['./ministraciones.component.scss'],
})
export class MinistracionesComponent implements OnInit {
  @Input() ministraciones!: Action[];
  @Output() emisor = new EventEmitter();
  constructor(
    private readonly api: ApiService,
    private readonly snack: MatSnackBar
  ) {}
  ngOnInit(): void {
    console.log(this.ministraciones);
  }
  deleteAction(_idAction: string): void {
    this.api.deleteAction(_idAction).subscribe({
      next: (res: any) => {
        this.snack.open(res.message, 'ok', { duration: 3000 });
        this.emisor.emit(true);
      },
      error: (error: ErrorHandler) => {
        this.snack.open('Error al tratar de aliminar el registro', 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
