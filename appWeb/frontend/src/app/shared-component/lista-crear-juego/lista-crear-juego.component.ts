import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {mimetype} from "src/app/helpers/mime-type.validator";
import { Juego } from 'src/app/models/juego.models';
import { JuegosService } from 'src/app/services/juegos.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lista-crear-juego',
  templateUrl: './lista-crear-juego.component.html',
  styleUrls: ['./lista-crear-juego.component.scss']
})
export class ListaCrearJuegoComponent implements OnInit {
  /**/
  private JuegoSub!: Subscription;
  private mode= 'create';
  private juegoId!: string;
  public juego!: Juego;
  form!: FormGroup;
  Pickedimage!: string;

  /**/
  juegos!: Juego[];
  file!: File;

  constructor(public juegosService: JuegosService, public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      desarrollador: new FormControl(null, {validators: [Validators.required]}),
      editor: new FormControl(null, {validators: [Validators.required]}),
      genero: new FormControl(null, {validators: [Validators.required]}),
      jugadores: new FormControl(null, {validators: [Validators.required]}),
      duracion: new FormControl(null, {validators: [Validators.required]}),
      idioma: new FormControl(null, {validators: [Validators.required]}),
      lanzamiento: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators:[Validators.required],
        //asyncValidators: [mimetype]
      })
    });
    //Modo
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('juegoId')){
        this.mode='edit';
        this.juegoId = paramMap.get('juegoId')!;
        this.juegosService.getJuego(this.juegoId).subscribe(juegoData=>{
          this.juego = {id:juegoData._id, nombre:juegoData.nombre, desarrollador:juegoData.desarrollador, editor:juegoData.editor, genero:juegoData.genero, jugadores:juegoData.jugadores, duracion:juegoData.duracion, idioma:juegoData.idioma, lanzamiento:juegoData.lanzamiento, imagePath:juegoData.imagePath}
          this.form.setValue({
            id:             this.juego.id,
            nombre:         this.juego.nombre,
            desarrollador:  this.juego.desarrollador,
            editor:         this.juego.editor,
            genero:         this.juego.genero,
            jugadores:      this.juego.jugadores,
            duracion:       this.juego.duracion,
            idioma:         this.juego.idioma,
            lanzamiento:    this.juego.lanzamiento,
            imagePath:      this.juego.imagePath
          });
        });
      }else{
        this.mode = 'create';
        this.juegoId = null!;
      }
    });

    this.juegosService.getJuegos();
    this.JuegoSub=this.juegosService.getJuegoUpdateListenetr()
      .subscribe((juegos: Juego[])=>{
      this.juegos = juegos;
    });
  }

  ngOnDestroy(){
    this.JuegoSub.unsubscribe();
  }

  PickedImage(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.Pickedimage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  agregarJuego(){
    if(this.form.invalid){
      console.log(this.form);
      return;0
    }
    if(this.mode==="create"){
      this.juegosService.addJuego(
        this.form.value.nombre,
        this.form.value.desarrollador,
        this.form.value.editor,
        this.form.value.genero,
        this.form.value.jugadores,
        this.form.value.duracion,
        this.form.value.idioma,
        this.form.value.lanzamiento,
        this.form.value.image
        );
    }else{
      this.juegosService.updateJuego(
        this.juegoId,
        this.form.value.nombre,
        this.form.value.desarrollador,
        this.form.value.editor,
        this.form.value.genero,
        this.form.value.jugadores,
        this.form.value.duracion,
        this.form.value.idioma,
        this.form.value.lanzamiento,
        this.form.value.image
        );
    }
    this.form.reset();
  }

/*
    if(form.invalid){
      return;
    }
    this.juegosService.addJuegos(form);

    if(form.value._id){
      this.juegosService.putJuego(form.value)
        .subscribe(res => {
        this.limpiarForm(form);
        this.mostrarJuegos();
      });
    } else {
      this.juegosService.postJuego(form.value)
        .subscribe(res => {
        this.limpiarForm();
        this.mostrarJuegos();
      })
    }
*/



/*
  mostrarJuegos(){
    this.juegosService.getJuegos().subscribe(res =>{
      this.juegosService.setJuegos(res as Juego[]);
    });
  }
  */
/*
  editarJuego(juego: Juego){
    this.juegosService.juegoSeleccionado = juego;
  }
*/


    /*
    this.mostrarJuegos();
    this.juegosService.getJuegos$().subscribe(juegos =>{
      this.juegos = juegos;
    });
    */
/*
  mostrarJuegos(){
  this.juegosService.getJuegos().subscribe(res =>{
    this.juegosService.setJuegos(res as Juego[]);
  });
}
*/


limpiarForm(form?:NgForm){
  if(form){
    form.reset();
   // this.juegosService.juegoSeleccionado = new Juego();
  }
}

borrarJuego(_id: string){
  if(confirm('¿Estas seguro que desea Eliminar este producto?')){
    this.juegosService.deleteJuego(_id)
      .subscribe(res => {
     // this.mostrarJuegos();
    });
  }
}

}

