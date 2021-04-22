import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Juego } from 'src/app/models/juego.models';
import { JuegosService } from "src/app/services/juegos.service";


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  private JuegoSub!: Subscription;

  //Listas de juegos:
  juegos!:Juego[];
  juegosNombre!:Juego[];
  //.....................
  constructor(public juegosService: JuegosService) { }

  ngOnInit(): void {
    this.juegosService.getJuegos();
    this.juegosService.getJuegosNombre();

    this.JuegoSub=this.juegosService.getJuegoUpdateListenetr()
      .subscribe((juegos: Juego[])=>{
      this.juegos = juegos;
    });

    this.JuegoSub=this.juegosService.getJuegoUpdateListenetrNombre()
    .subscribe((juegosNombre: Juego[])=>{
    this.juegosNombre = juegosNombre;
  });
  }

  ngOnDestroy(){
    this.JuegoSub.unsubscribe();
  }



  mostrarJuegos(){
    this.juegosService.getJuegos
  }


}
