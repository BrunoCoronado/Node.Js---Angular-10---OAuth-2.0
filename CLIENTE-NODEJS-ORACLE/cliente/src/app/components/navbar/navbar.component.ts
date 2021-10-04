import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  constructor(location: Location,  private element: ElementRef, private utils: UtilsService) {
    this.location = location;
  }

  ngOnInit() {
  }
  getTitle(){
    // var titlee = this.location.prepareExternalUrl(this.location.path());
    // return titlee.split('/')[titlee.split('/').length - 1].toUpperCase()
    return 'Ministerio de Salud Pública y Asistencia Social -MSPAS-'
  }

  cerrarSesion(){
  }

}
