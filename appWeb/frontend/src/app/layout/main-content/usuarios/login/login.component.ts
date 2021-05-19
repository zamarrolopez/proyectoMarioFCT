import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
//Importacion SERVICIOS
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    nombreU: null,
    pass: null
  };
  usuario!:Usuario;
  isLogin = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.isLogin = true;
      window.location.href = 'home';
    }
  }

  onLogin(): void {
    const { nombreU, pass } = this.form;
    this.authService.login(nombreU, pass).subscribe(
      data => {
        this.usuario = {
          id:             data._id,
          nombreU:        data.nombreU,
          pass:           data.pass,
          email:          data.email,
          nombre:         data.nombre,
          apellidos:      data.apellidos,
          tlf:            data.tlf,
          numLog:         data.numLog,
          roles:          data.roles,
          imagePath:      data.imagePath,
          juegos:         data.juegos
        }
        console.log(this.usuario)
        this.authService.saveToken(data.accessToken);
        this.authService.saveUser(this.usuario);
        alert("Login exitoso!");
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );

  }

  reloadPage(): void {
    setTimeout(function(){window.location.href = 'home';}, 1000);
  }
}
