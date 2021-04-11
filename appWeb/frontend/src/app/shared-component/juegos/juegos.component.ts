import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Juego } from 'src/app/models/juego.models';
import { JuegosService } from "src/app/services/juegos.service";

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})

export class JuegosComponent implements OnInit {
  juegos!: Juego[];
  constructor(public juegosService: JuegosService) { }

  ngOnInit(): void {
    this.mostrarJuegos();
    this.juegosService.getJuegos$().subscribe(juegos =>{
      this.juegos = juegos;
    });
  }

  agregarJuego(form: NgForm){
    if(form.value._id){
      this.juegosService.putJuego(form.value)
        .subscribe(res => {
        this.limpiarForm(form);
        this.mostrarJuegos();
      });
    } else {
      this.juegosService.postJuego(form.value)
        .subscribe(res => {
        this.limpiarForm(form);
        this.mostrarJuegos();
      })
    }
  }

  mostrarJuegos(){
    this.juegosService.getJuegos()
    .subscribe(res =>{
      this.juegosService.setJuegos(res as Juego[]);
    });
  }

  editarJuego(juego: Juego){
    this.juegosService.juegoSeleccionado = juego;
  }

  borrarJuego(_id: string){
    if(confirm('¿Estas seguro que desea Eliminar este producto?')){
      this.juegosService.deleteJuego(_id)
        .subscribe(res => {
        this.mostrarJuegos();
      });
    }
  }

  limpiarForm(form?:NgForm){
    if(form){
      form.reset();
      this.juegosService.juegoSeleccionado = new Juego();
    }
  }




}
