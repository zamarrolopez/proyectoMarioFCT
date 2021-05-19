import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Juego } from 'src/app/models/juego.models';
import { Usuario } from 'src/app/models/usuario.models';

import { JuegosService } from 'src/app/services/juegos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ValoracionesService } from 'src/app/services/valoraciones.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {
  private juegoId!: string;
  private usuario!: Usuario;
  juego!: Juego;
  form!: FormGroup;
  texto!: string;

  posesion = false;


  constructor(public valoracionesServices: ValoracionesService, public juegosService: JuegosService, public authService:AuthService, public route: ActivatedRoute, public usuariosService: UsuariosService ) {
    this.juego = { id:"", nombre:"", descripcion:"", desarrollador:"", editor:"", genero:"", jugadores:0, duracion:"", idioma:"", lanzamiento:"", imagePath:"", puntos:0}
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      valor:  new FormControl(null, {validators: [Validators.required]})
    });
    this.usuario = this.authService.getUser();
    this.route.paramMap.subscribe( (paramMap: ParamMap) =>{
      this.juegoId = paramMap.get('juegoId')!;
      this.comprobarPosesionJuego();
      new Promise((resolve, reject)=>{
        this.obtenerJuego();
        resolve("listo") ;
      }).then((res)=>{
        this.usuario.juegos.forEach(juego => {
          if (juego == this.juegoId){
            this.posesion = true;
          }
        });
      }).then(()=>{
        if(this.posesion==true){
          this.valoracionesServices.getPuntuacionUsuario(this.juegoId, this.usuario.id).subscribe(resultado =>{
            this.form.patchValue({valor: resultado});
          });
        }
      })
    });
  }

  valorar(){
    new Promise((resolve, reject)=>{
      this.valoracionesServices.valorarJuego(this.juegoId, this.usuario.id, this.form.value.valor).subscribe(res =>{
        this.form.patchValue({valor: this.form.value.valor});
        resolve("listo") ;
      });
    }).then((res)=>{
      this.obtenerJuego();
    })
  }

  obtenerJuego(){
    this.juegosService.getJuego(this.juegoId).subscribe(juegoData=>{
      this.juego = {
        id:             juegoData._id,
        nombre:         juegoData.nombre,
        descripcion:    juegoData.descripcion,
        desarrollador:  juegoData.desarrollador,
        editor:         juegoData.editor,
        genero:         juegoData.genero,
        jugadores:      juegoData.jugadores,
        duracion:       juegoData.duracion,
        idioma:         juegoData.idioma,
        lanzamiento:    juegoData.lanzamiento,
        imagePath:      juegoData.imagePath,
        puntos:         juegoData.puntos
      }
      switch (this.juego.puntos) {
        case 1:
          this.texto = "Muy malo";
          break;
        case 2:
          this.texto = "Malo";
          break;
        case 3:
          this.texto = "Regular";
          break;
        case 4:
          this.texto = "Bueno";
          break;
        case 5:
          this.texto = "Magnifico";
          break;

        default:
          this.texto = "Sin calificar";
          break;
      }
    });
  }

  obtener(){
    this.usuariosService.putJuegos(this.usuario.id, this.juegoId).subscribe(res =>{
      console.log(res.status);
      this.comprobarPosesionJuego();
    });
  }

  comprobarPosesionJuego(){
    this.usuariosService.comprobarJuego(this.usuario.id, this.juegoId).subscribe(res =>{
      console.log(res.message);
      this.posesion = res.posesion;
    })
  }
}
