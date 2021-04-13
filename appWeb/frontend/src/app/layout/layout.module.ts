import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Routing
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
//Componentes
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainFooterComponent } from './main-footer/main-footer.component';

@NgModule({
  declarations: [LayoutComponent, MainHeaderComponent, MainContentComponent, MainFooterComponent],
  imports: [
    LayoutRoutingModule,
    CommonModule
  ],
  exports:[
    FormsModule,
    HttpClientModule,
  ]
})
export class LayoutModule { }
