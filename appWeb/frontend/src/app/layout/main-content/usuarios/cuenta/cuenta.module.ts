import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta.component';

import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';

import { LayoutModule } from 'src/app/layout/layout.module';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [CuentaComponent, MenuComponent, PerfilComponent, AdminComponent, SeguridadComponent],
  imports: [
    CuentaRoutingModule,
    CommonModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class CuentaModule { }
