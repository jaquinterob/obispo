import { LocalstorageService } from './../../localstorage.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Joven } from 'src/app/models/joven';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  jovenes: Joven[] = [];
  constructor(
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    private readonly localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.getAllJovenes();
  }

  getAllJovenes(): void {
    const dataObispo = JSON.parse(
      this.localstorageService.decrypt(localStorage.getItem('obispo') || 'null')
    );
    this.api.getAllJovenes(dataObispo.ward).subscribe({
      next: (res: any) => {
        this.jovenes = res.youngs;
        if (this.jovenes.length === 0) {
          this.snack.open(
            '😀 Hola Obispo! En el momento no hay registrados jóvenes para gestionar,\n porfavor vaya al menú y seleccione la opción "Agregar Joven"',
            'Entendido',
            { duration: 10000, verticalPosition: 'top' }
          );
        } else {
        }
      },
      error: (error: ErrorHandler) => {
        console.error(error);
        this.snack.open('Error al consultar Jóvenes', 'ok', {
          duration: 3000,
        });
      },
    });
  }

  getChildren() {
    this.getAllJovenes();
  }
}
