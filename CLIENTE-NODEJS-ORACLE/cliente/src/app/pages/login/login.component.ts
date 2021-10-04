import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';
import { WebService } from 'src/app/web.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: string;
  password: string;

  constructor(private router: Router, private web: WebService, private utils: UtilsService) {}

  ngOnInit() {
  }

  async iniciarSesion(){
    this.utils.mostrarLoading()
    const response: any = await this.web.iniciarSesion({usuario: this.usuario, password: this.password})
    this.utils.ocultarLoading()
    console.log(response)
    if(response.status != 200){
      this.utils.mostrarToastError('Ocurrio un error al validar credenciales!')
      return
    }
    if(!response.auth){
      this.utils.mostrarToastError('Usuario o contraseña inválidas!')
      return
    }
    this.utils.mostrarToastExito('Bienvenido al Sistema!')

    this.router.navigate(['/mspas/dashboard']); //redirigimos
  }

}
