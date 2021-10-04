import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';  
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private loading = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false, 
    allowEnterKey: false,
    onBeforeOpen: () => {
      Swal.showLoading()
    }
  })

  private toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private cookieService: CookieService, private router: Router) { }

  mostrarLoading(){
    this.loading.fire()
  }

  ocultarLoading(){
    this.loading.close()
  }

  async mostrarError(mensaje: any, titulo = '¡Lo sentimos!', handler = null){
    this.ocultarLoading()
    await Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    }).then(handler)
  }

  mostrarOperacionExitosa(mensaje: any, handler: any = null, titulo = '¡Atención!'){
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    }).then(handler)
  }

  mostrarToastError(mensaje: string){
    this.toast.fire({
      icon: 'error',
      title: mensaje
    })
  }

  mostrarToastExito(mensaje: any){
    this.toast.fire({
      icon: 'success',
      title: mensaje
    })
  }
}
