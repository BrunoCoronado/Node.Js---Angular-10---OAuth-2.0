import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitasRoutingModule } from './visitas-routing.module';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';
import { ConsultaVisitasComponent } from './consulta-visitas/consulta-visitas.component';


@NgModule({
  declarations: [RegistroVisitaComponent, ConsultaVisitasComponent],
  imports: [
    CommonModule,
    VisitasRoutingModule
  ]
})
export class VisitasModule { }
