import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Juego } from 'src/app/models/juego.models';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { JuegosService } from "src/app/services/juegos.service";


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  private JuegoSub!: Subscription;
  usuario!:Usuario;
  //Listas de juegos:
  juegos!:Juego[];
  juegosNombre!:Juego[];
  juegosLista!:Juego[];
  //.....................
  constructor(public juegosService: JuegosService, public authService: AuthService) { }

  ngOnInit(): void {
    this.mostrarJuegos();
    this.mostrarJuegosPorNombre();
  }

  ngOnDestroy(){
    this.JuegoSub.unsubscribe();
  }


  mostrarJuegos(){
    this.juegosService.getJuegos();
    this.JuegoSub=this.juegosService.getJuegoUpdateListenetr().subscribe((juegos: Juego[])=>{
      this.juegos = juegos;
      this.mostrarJuegosPropios();
    });
  }
  mostrarJuegosPorNombre(){
    this.juegosService.getJuegosNombre();
    this.JuegoSub=this.juegosService.getJuegoUpdateListenetrNombre().subscribe((juegosNombre: Juego[])=>{
      this.juegosNombre = juegosNombre;
    });
  }

  mostrarJuegosPropios(){
    this.juegosLista = [];
    this.usuario = this.authService.getUser();
    this.usuario.juegos.forEach(juegoId => {
      this.juegos.forEach(juego => {
        if(juegoId===juego.id){
          this.juegosLista.push(juego);
        }
      });
    });
  }
}
