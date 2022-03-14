import { NuevoJovenComponent } from './../dialogs/nuevo-joven/nuevo-joven.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() homeEmiter = new EventEmitter<boolean>() 
  constructor(private readonly dialog: MatDialog) {}
  ngOnInit(): void {}
  abrirModalNuevoJoven() {
    const dialogRef = this.dialog.open(NuevoJovenComponent);
    dialogRef.afterClosed().subscribe({
      next:()=>{
        this.homeEmiter.emit(true)
      }
    })
    
  }
}
