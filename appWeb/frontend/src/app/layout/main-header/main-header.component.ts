import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Usuario } from "src/app/models/usuario.models";
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  public usuario!: Usuario;
  public isAuth!: Boolean;
  public rol!: String;
  constructor(private authService:AuthService){}

  ngOnInit(){
    if(this.authService.getToken()){
      this.usuario = this.authService.getUser();
      if(this.usuario){
        this.isAuth = true;
        this.rol = this.usuario.roles;
        console.log(this.usuario);
      }
    }else{
      this.isAuth = false;
      this.rol = "";
    }
  }

  loginOut(){
    this.authService.signOut();
    window.location.reload();
  }

}
