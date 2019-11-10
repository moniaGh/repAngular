import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorrespondantComponent } from './correspondant/correspondant.component';
import { FondsComponent } from './fonds/fonds.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { LoginComponent } from './login/login.component';
import { CommissionComponent } from './commission/commission.component';
import { PensionnaireComponent } from './pensionnaire/pensionnaire.component';
import { ChangeComponent } from './change/change.component';
import { ListPenComponent } from './beneficiaire/list-pen/list-pen.component';
import { Stat1Component } from './statistiques/stat1/stat1.component';

const routes: Routes = [
  { path: 'correspondant', component : CorrespondantComponent },
  { path: 'fonds', component : FondsComponent },
  { path: 'processus/:id', component : BeneficiaireComponent },
  { path: 'login', component : LoginComponent },
  { path: 'commission', component : CommissionComponent},
  { path: 'pensionnaire', component : PensionnaireComponent },
  { path: 'change', component : ChangeComponent},
  { path: 'listp/:id', component : ListPenComponent},
  { path: 'stat', component : Stat1Component}



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
