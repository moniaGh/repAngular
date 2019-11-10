import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommissionService } from '../services/commission.service';
import { CorrespondantService } from '../services/correspondant.service';
import { IPensionnaire } from '../interface/ipensionnaire';
import { ICommission } from '../interface/icommission';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-pensionnaire',
  templateUrl: './pensionnaire.component.html',
  styleUrls: ['./pensionnaire.component.css']
})
export class PensionnaireComponent implements OnInit {
pensionnaires = []
commissions = []
public pensionnaire= {
  idP : '',
  numRib : '',
  secSoc : '',
  typeVirement : '',
  statutP : '',
  Salaire : 0,
  nom : '',
  prenom :'' ,
  comCor : false,
  comIn : false

}
private readonly notifier: NotifierService;
   /**
     * Constructor
     *
     * @param {NotifierService} notifier Notifier service
     */
  constructor(notifierService: NotifierService,private http: HttpClient,private commissionService : CommissionService,private correspondantService: CorrespondantService) { 
    this.notifier = notifierService;

  }

  ngOnInit() {
    this.http.get<ICommission[]>(this.correspondantService.urlC).
    subscribe(
          rep => {this.commissions= rep;console.log(this.commissions);},
          error => {console.log(error);});
this.reloadData()
  }
reloadData()
{
  this.http.get<IPensionnaire[]>(this.correspondantService.urlP).
  subscribe(
        rep => {this.pensionnaires= rep;console.log(rep);},
        error => {console.log(error)});
}
  add_pen()
  {
    console.log(this.pensionnaire.comCor)
        console.log(this.pensionnaire.comIn)

  
    this.pensionnaire.statutP='actif'
    this.http.post(this.correspondantService.urlP,this.pensionnaire).subscribe
    (rep => {this.notifier.notify("success", "Pensionnaire Ajouté !");this.emptyModel();console.log(rep);this.reloadData()},
    error => {console.log(error)})
    
  }

  deleteP(pen)
  {
    this.http.delete(this.correspondantService.urlP+'/'+pen.idP).
    subscribe(rep => {this.notifier.notify("error", "Pensionnaire Supprimé !");
    console.log(rep);this.reloadData()},
            error => {console.log(error)})
  }
getOne(pen)
{
  this.pensionnaire=pen
}
updateP()
{
  this.http.put(this.correspondantService.urlP+'/'+this.pensionnaire.idP,this.pensionnaire).
    subscribe(rep => {this.notifier.notify("success", "Pensionnaire Modifié !");this.emptyModel();
    console.log(rep);this.reloadData()},
            error => {console.log(error)})
}
toggleVisibility(e)
{
  this.pensionnaire.comCor=e.target.checked;
}
toggleVisibility1(e)
{
  this.pensionnaire.comIn=e.target.checked;

}
emptyModel()
{
  this.pensionnaire.Salaire=0;
  this.pensionnaire.nom=""
  this.pensionnaire.statutP=""
  this.pensionnaire.numRib=""
  this.pensionnaire.secSoc=""
  this.pensionnaire.typeVirement=""
  this.pensionnaire.comIn=false
  this.pensionnaire.comCor=false
}
}
