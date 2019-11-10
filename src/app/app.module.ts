import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http' 
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ChartsModule } from 'ng2-charts';
import {DatePipe} from '@angular/common'

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CorrespondantComponent } from './correspondant/correspondant.component';
import { FondsComponent } from './fonds/fonds.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProgressBarModule} from "angular-progress-bar";
import { PensionnaireComponent } from './pensionnaire/pensionnaire.component';
import { CommissionComponent } from './commission/commission.component';
import { ChangeComponent } from './change/change.component';
import { ListPComponent } from './list-p/list-p.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material';
import { ListPenComponent } from './beneficiaire/list-pen/list-pen.component';
import { Stat1Component } from './statistiques/stat1/stat1.component';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CorrespondantComponent,
    FondsComponent,
    BeneficiaireComponent,
    PensionnaireComponent,
    CommissionComponent,
    ChangeComponent,
    ListPComponent,
    ListPenComponent,
    Stat1Component,
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatTableModule,
    MatSortModule,
    MatInputModule,
    ChartsModule
    
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
