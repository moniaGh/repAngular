import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorrespondantService } from '../services/correspondant.service';
import { IFonds } from '../interface/ifonds';
import { Router } from '@angular/router';
import { ICorrespondant } from '../interface/icorrespondant';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-fonds',
  templateUrl: './fonds.component.html',
  styleUrls: ['./fonds.component.css']
})
export class FondsComponent implements OnInit {
public fonds = [] ;
public correspondants = []
public condition;
public traite : false;
public cdate = new Date();
public error=false
public error1=false
public error2=false
public errorMsg
public errorMsgM

public errorMsgB

public fond = {
  id  : 0,
  correspondant :null,
  dateRep : '',
  montant: 0,
  devise : '',
  commentaire : '',
  statut: '',
  nbrBeneficiaire : 0



}
constructor(private datePipe: DatePipe,private http: HttpClient,private correspondantService: CorrespondantService,private router:Router) { }
ngOnInit() {
  this.reloadData() 
  console.log(this.cdate)
}
reloadData() {
  this.http.get<IFonds[]>(this.correspondantService.urlFonds).
  subscribe(
        rep => {this.fonds = rep;console.log(rep)},
        error => {console.log(error)});


        this.http.get<ICorrespondant[]>(this.correspondantService.urlCoressp).
        subscribe(
              rep => {this.correspondants = rep;console.log(rep)},
              error => {console.log(error)});
return;
}

valider(fond : IFonds)
{
fond.statut= 'Vérifié';
this.http.put(this.correspondantService.urlFonds+'/'+fond.id,fond).subscribe
( rep => {console.log(rep);},
error => {console.log(error)})

}
rejeter(fond : IFonds)
{
fond.statut= 'Rejeté';
this.http.put(this.correspondantService.urlFonds+'/'+fond.id,fond).subscribe
( rep => {console.log(rep);},
error => {console.log(error)})
}
suivie(fond : IFonds)
{
  if(fond.statut=='Traité' || fond.statut=='En cours d\'éxecution' || fond.statut=='Exécuté'  )
  this.router.navigate(['listp/'+fond.id]);
else{
  console.log('here '+fond.id);
  this.router.navigate(['processus/'+fond.id]);

}}
getOne(fond)
{
this.fond=fond;
}
updateFonds()
{

  this.http.put(this.correspondantService.urlFonds+'/'+this.fond.id,this.fond).
      subscribe(rep => {console.log(rep);},
              error => {console.log(error)})
  return;
}
addF()

{  this.fond.statut='Reçu'
console.log('corr'+this.fond)
console.log('monia'+this.fond.correspondant)
  this.http.get<ICorrespondant>(this.correspondantService.urlCoressp+'/'+this.fond.correspondant).subscribe(
    rep => {console.log(rep);
      this.fond.correspondant=rep;
      this.http.post(this.correspondantService.urlFonds,this.fond).subscribe(
        rep =>{console.log(rep) ;
         this.emptymodel();
        this.reloadData()
        this.emptymodel();},
        error =>{console.log(error)}
      )},
    error => {console.log(error)}
  )
 
}
compareTwoDates(dateRep){
  console.log(dateRep.value)
  if(dateRep.value.length==10 )
  {
    this.error=false
  console.log(this.datePipe.transform(this.cdate, 'yyyy-MM-dd'))

  if(dateRep.value>this.datePipe.transform(this.cdate, 'yyyy-MM-dd')){
    this.error=true;
    console.log(this.error)
     this.errorMsg='date invalide';
  }
  else
  this.error=false
}
else
{this.error=true
this.errorMsg='Format Invalide'}
}
checkM(montant)
{
  if(montant.value<=0)
  {this.error1=true
  this.errorMsgM="Mantant invalide "}
  else
  this.error1=false
}
checkB(nbr){
if(nbr.value<=0)
{this.error2=true
this.errorMsgB="Nombre de bébénficiare invalide"}
else
this.error2=false
}
emptymodel()
{
  this.fond.correspondant =""
  this.fond.dateRep =""
  this.fond.montant=0
  this.fond.devise = ""
  this.fond.commentaire =""
  this.fond.nbrBeneficiaire = 0

}
}
