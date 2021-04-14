import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent implements OnInit {
  usuario!:Usuario;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
  }

  putEmail(email:string){
    this.authService.putEmail(this.usuario._id, email).subscribe(res =>{
      alert("Correo cambiado correctamente");
      this.usuario.email = email;
      this.authService.saveUser(this.usuario);
    })
  }

}
