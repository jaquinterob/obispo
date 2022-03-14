import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Joven } from 'src/app/models/joven';
import { NuevoRegistroComponent } from '../dialogs/nuevo-registro/nuevo-registro.component';

@Component({
  selector: 'app-joven-card',
  templateUrl: './joven-card.component.html',
  styleUrls: ['./joven-card.component.scss'],
})
export class JovenCardComponent implements OnInit {
  @Input() joven!: Joven;
  @Output() emitirHome = new EventEmitter<boolean>()
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
  }

  abrirDialogNuevoRegistro(joven:Joven): void {
    const dialogRef = this.dialog.open(NuevoRegistroComponent,{data:joven});
    dialogRef.afterClosed().subscribe({
      next:(res:any)=>{
        console.log(res);
      }
    })
  }
}
