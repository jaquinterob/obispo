import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
  ngOnInit(): void {
    this.sesionValidate();
  }

  sesionValidate(): void {
    const dataObispo = JSON.parse(this.decrypt(localStorage.getItem('obispo') || 'null'));
    console.log(dataObispo);
    if (dataObispo) {
      this.api.login(dataObispo).subscribe(
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
          this.saveSesionInLocalStorage();
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

  private saveSesionInLocalStorage() {
    const formularioText = this.encrypt(JSON.stringify(this.formulario.value));
    localStorage.setItem('obispo', formularioText);
  }

  private encrypt(texto: string): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(texto), 'coopsana').toString();
    } catch (error) {
      console.error(error);
      return '';
    }
  }
  private decrypt(texto: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(texto, 'coopsana');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return texto;
    } catch (error) {
      console.error(error);
      return '';
    }
  }
}
