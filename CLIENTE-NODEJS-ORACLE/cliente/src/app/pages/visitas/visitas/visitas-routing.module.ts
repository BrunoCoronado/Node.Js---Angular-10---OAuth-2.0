import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaVisitasComponent } from './consulta-visitas/consulta-visitas.component';
import { RegistroVisitaComponent } from './registro-visita/registro-visita.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultaVisitasComponent,
  },
  {
    path: 'registro',
    component: RegistroVisitaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitasRoutingModule { }
