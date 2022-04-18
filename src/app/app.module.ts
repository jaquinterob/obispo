import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './AngularMaterial/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { JovenComponent } from './pages/joven/joven.component';
import { NuevoJovenComponent } from './components/dialogs/nuevo-joven/nuevo-joven.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { JovenCardComponent } from './components/joven-card/joven-card.component';
import { AgePipe } from './pipes/age.pipe';
import { NuevoRegistroComponent } from './components/dialogs/nuevo-registro/nuevo-registro.component';
import { DatosPersonalesComponent } from './pages/joven/datos-personales/datos-personales.component';
import { TalentosComponent } from './pages/joven/talentos/talentos.component';
import { MinistracionesComponent } from './pages/joven/ministraciones/ministraciones.component';
import { DeseosComponent } from './pages/joven/deseos/deseos.component';
import { PreocupacionesComponent } from './pages/joven/preocupaciones/preocupaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    JovenComponent,
    NuevoJovenComponent,
    JovenCardComponent,
    AgePipe,
    NuevoRegistroComponent,
    DatosPersonalesComponent,
    TalentosComponent,
    MinistracionesComponent,
    DeseosComponent,
    PreocupacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
