import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Juego } from 'src/app/models/juego.models';
import { JuegosService } from 'src/app/services/juegos.service';


@Component({
  selector: 'app-lista-crear-juego',
  templateUrl: './lista-crear-juego.component.html',
  styleUrls: ['./lista-crear-juego.component.scss']
})
export class ListaCrearJuegoComponent implements OnInit {

  juegos!: Juego[];
  uploadedFiles!: Array<File>;
  constructor(public juegosService: JuegosService) { }

  ngOnInit(): void {
    this.mostrarJuegos();
    this.juegosService.getJuegos$().subscribe(juegos =>{
      this.juegos = juegos;
    });
  }

  agregarJuego(form: NgForm){
    console.log(form.value.img);
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
    this.juegosService.getJuegos().subscribe(res =>{
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


  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.juegosService.uploadFile(formData).subscribe((res)=> {
      console.log('response received is ', res);
    });
  }



}
