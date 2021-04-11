import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta.component';

import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { UsuariosRoutingModule } from '../usuarios-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { JuegosComponent } from 'src/app/shared-component/juegos/juegos.component';




@NgModule({
  declarations: [CuentaComponent, MenuComponent, PerfilComponent, AdminComponent, JuegosComponent],
  imports: [
    CuentaRoutingModule,
    CommonModule,
    LayoutModule
  ]
})
export class CuentaModule { }
