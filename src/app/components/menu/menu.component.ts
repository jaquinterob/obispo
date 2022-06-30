import { LocalstorageService } from './../../localstorage.service';
import { NuevoJovenComponent } from './../dialogs/nuevo-joven/nuevo-joven.component';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() homeEmiter = new EventEmitter<boolean>();
  ward = '';
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly localstorageService: LocalstorageService
  ) {}
  ngOnInit(): void {
    const dataObispo = JSON.parse(
      this.localstorageService.decrypt(localStorage.getItem('obispo') || 'null')
    );
    this.ward = dataObispo.ward
  }
  abrirModalNuevoJoven() {
    const dialogRef = this.dialog.open(NuevoJovenComponent);
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.homeEmiter.emit(true);
      },
    });
  }
  salir(): void {
    localStorage.removeItem('obispo');
    this.router.navigate(['/login']);
  }
}
