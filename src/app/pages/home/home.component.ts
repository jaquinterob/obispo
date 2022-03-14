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
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllJovenes();
  }

  getAllJovenes(): void {
    this.api.getAllJovenes().subscribe({
      next: (res: any) => {
        this.jovenes = res.youngs;
        console.log(this.jovenes);
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
