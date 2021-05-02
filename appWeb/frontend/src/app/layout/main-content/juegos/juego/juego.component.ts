import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Juego } from 'src/app/models/juego.models';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {
  private juegoId!: string;
  public juego!: Juego;

  constructor(public juegosService: JuegosService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    //Modo
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.juegoId = paramMap.get('juegoId')!;
      this.juegosService.getJuego(this.juegoId).subscribe(juegoData=>{
        this.juego = {
          id:             juegoData._id,
          nombre:         juegoData.nombre,
          desarrollador:  juegoData.desarrollador,
          editor:         juegoData.editor,
          genero:         juegoData.genero,
          jugadores:      juegoData.jugadores,
          duracion:       juegoData.duracion,
          idioma:         juegoData.idioma,
          lanzamiento:    juegoData.lanzamiento,
          imagePath:      juegoData.imagePath
        }
      });
    });
  }



}
