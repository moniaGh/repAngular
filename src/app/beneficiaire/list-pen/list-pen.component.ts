import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CorrespondantService } from 'src/app/services/correspondant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IBeneficiaire } from 'src/app/interface/ibeneficiaire';
import { HttpClient } from '@angular/common/http';
import { IPensionnaire } from 'src/app/interface/ipensionnaire';
import { IFonds } from 'src/app/interface/ifonds';

@Component({
  selector: 'app-list-pen',
  templateUrl: './list-pen.component.html',
  styleUrls: ['./list-pen.component.css']
})
export class ListPenComponent implements OnInit {
  public beneficiaires = [];
public id :string 
public con : number
fonds : IFonds
  private readonly notifier: NotifierService;
  /**
    * Constructor
    *
    * @param {NotifierService} notifier Notifier service
    */
   fond 

  constructor(notifierService: NotifierService, private http: HttpClient, private correspondantService: CorrespondantService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.notifier = notifierService;

    this.http.get<IFonds>(this.correspondantService.urlFonds + '/' + this.id).
    subscribe(
      rep => { this.fonds = rep ;},
      error => { console.log(error) });

  }
  
  ngOnInit() {
    this.reloadData()
  }
  reloadData() {
    this.http.get<IBeneficiaire[]>(this.correspondantService.urlB + '/bygroupe/' + this.id).
      subscribe(
        rep => { this.beneficiaires = rep; console.log(rep) , this.makeJoin()},
        error => { console.log(error) });

    return;
  }
  makeJoin() {

    for (let benf of this.beneficiaires) {
      console.log('the idP' + this.beneficiaires)

      this.http.get<IPensionnaire>(this.correspondantService.urlP + '/join/' + benf.idP).
        subscribe(
          rep => { benf.pensionnaire = rep; console.log(rep) },
          error => { console.log(error) });

      console.log(this.beneficiaires)
    }

  }
  valider(benf)
  {
  benf.statut="validé"
  this.http.put(this.correspondantService.urlB+'/'+benf.idB,benf).subscribe(
    rep => {console.log("updated");this.getStat();this.reloadData();},
    error => {console.log("error")}
  )
this.http.get(this.correspondantService.urlFonds+'/'+this.id).subscribe
( rep => {console.log(rep);this.fond=rep;this.up()},
error => {console.log(error)}
)



  }
  getStat()
  {
    this.http.get<number>(this.correspondantService.urlB+'/valide/'+this.id).subscribe
( rep => {console.log(rep);this.con=rep;this.condition();},
error => {console.log(error)})
  }
condition()
{
  console.log(this.con)

if ( this.con==this.fond.nbrBeneficiaire)
{
  console.log(this.con)
  this.fond.statut= 'Exécuté'
  this.http.put(this.correspondantService.urlFonds+'/'+this.id,this.fond).subscribe(
    rep => {console.log("updated");this.reloadData()},
    error => {console.log("error")}
  )
}
}
up()
{
  this.fond.statut= 'En cours d\'éxecution'
  this.http.put(this.correspondantService.urlFonds+'/'+this.id,this.fond).subscribe(
    rep => {console.log("updated");this.reloadData()},
    error => {console.log("error")}
  )
}
}
