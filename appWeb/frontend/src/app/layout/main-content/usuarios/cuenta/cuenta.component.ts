import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  template: `
  <app-menu></app-menu>
  <router-outlet></router-outlet>` ,
  styles: [
  ]
})
export class CuentaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
