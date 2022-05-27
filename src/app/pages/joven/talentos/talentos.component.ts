import {
  Component,
  ErrorHandler,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Action } from './../../../models/action';

@Component({
  selector: 'app-talentos',
  templateUrl: './talentos.component.html',
  styleUrls: ['./talentos.component.scss'],
})
export class TalentosComponent {
  @Input() talentos!: Action[];
  @Output() emisor = new EventEmitter();
  constructor(
    private readonly api: ApiService,
    private readonly snack: MatSnackBar
  ) {}

  deleteAction(_idAction: string): void {
    this.api.deleteAction(_idAction).subscribe({
      next: (res: any) => {
        this.snack.open(res.message, 'ok', { duration: 3000 });
        this.emisor.emit(true)
      },
      error: (error: ErrorHandler) => {
        this.snack.open('Error al tratar de aliminar el registro', 'ok', {
          duration: 3000,
        });
      },
    });
  }
}
