import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: any = {
    nombre: null,
    correo: null,
    pass: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getToken()){
      window.location.href = 'home';
    }
  }
  onSubmit(): void {
    const { nombre, email, pass } = this.form;
    this.authService.registro(nombre, email, pass).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert("Registro con exito!");
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage(): void {
    setTimeout(function(){window.location.href = 'usuario/login';}, 1000);
  }

}
