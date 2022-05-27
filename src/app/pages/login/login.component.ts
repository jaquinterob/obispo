import { Component, ErrorHandler, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  formulario!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    private readonly router: Router
  ) {
    this.initFormulario();
  }

  initFormulario(): void {
    this.formulario = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
      ward: ['', Validators.required],
    });
  }

  login(): void {
    this.api.login(this.formulario.value).subscribe(
      (res: any) => {
        if (res.ok) {
          this.router.navigate(['home']);
        } else {
          this.snack.open(res.message!, 'ok', {
            duration: 4000,
          });
          this.reset();
        }
      },
      (error: ErrorHandler) => {
        console.error(error);
        this.snack.open('Error al comunicarnos con el servidor', 'ok', {
          duration: 4000,
        });
      }
    );
  }

  @ViewChild('f') tagFormulario: any;
  reset() {
    this.tagFormulario.resetForm();
  }
}
