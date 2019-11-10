import { Component, OnInit } from '@angular/core';
import { CorrespondantService } from '../services/correspondant.service';
import { ICorrespondant } from '../interface/icorrespondant';
import {HttpClient} from '@angular/common/http';
import { ICommission } from '../interface/icommission';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-correspondant',
  templateUrl: './correspondant.component.html',
  styleUrls: ['./correspondant.component.css']
})
export class CorrespondantComponent implements OnInit {
  public correspondants = [];
  public commissions = []
  
  public correspondant = {
   pk: 0,
   codeBIC: '',
    designation: "",
    abrv : '',
    pays: '',
    com : null,
    commission : null
  }
  com2
  router: any;
  private readonly notifier: NotifierService;
  /**
    * Constructor
    *
    * @param {NotifierService} notifier Notifier service
    */
 constructor(notifierService: NotifierService,private http: HttpClient,private correspondantService: CorrespondantService) {
  this.notifier = notifierService;

  }
  ngOnInit() {
    this.reloadData() 

  }
  gotoCom()
  {
    this.router.navigate(['commission']);

  }
  reloadData() {
    this.http.get<ICorrespondant[]>(this.correspondantService.urlCoressp).
    subscribe(
          rep => {this.correspondants = rep;console.log(rep)},
          error => {console.log(error)});

    this.http.get<ICommission[]>(this.correspondantService.urlC).subscribe
  ( rep => {this.commissions=rep; console.log(rep)},
  error => { console.log(error)}
  )
return;
  }

  public add_corr() {
    console.log(this.correspondant.com);
    this.http.get<ICommission[]>(this.correspondantService.urlC+'/byname/'+this.correspondant.com).subscribe
    ( rep => {this.com2=rep; console.log(rep);this.addIt()},
    error => { console.log(error)}
    )
  
    return;
  }
  addIt()
  {
    this.correspondant.commission=this.com2
    console.log(this.correspondant.commission)
    this.http.post(this.correspondantService.urlCoressp, this.correspondant).
    subscribe(rep => {console.log(rep);this.reloadData();this.emptyModel();this.notifier.notify("success", "Correspondant ajouté !");},
            error => {console.log(error)})
  }
  public deleteC(correspondant) {
    var delete_url = this.correspondantService.urlCoressp+"/"+correspondant.pk;
    this.http.delete(delete_url).
        subscribe(rep => {console.log(rep);this.reloadData();},
                error => {console.log(error);this.notifier.notify("error", "Suppression Impossible!");})
    return;
  }

  public update_correspondant() {
  
 
    
  var update_url = this.correspondantService.urlB+"/"+this.correspondant.pk;

  this.http.put(update_url, this.correspondant).
      subscribe(rep => {console.log(rep);;this.notifier.notify("success", "Mise à jour effectuée avec succès !")},
              error => {console.log(error);this.notifier.notify("error", "Modification Impossible !")})
  return;
  }

  getOne(correspondant)
  {
this.correspondant=correspondant;
  }

  emptyModel()
  {
    this.correspondant.abrv='';
    this.correspondant.codeBIC='';
    this.correspondant.designation='';
    this.correspondant.pays='';
    this.correspondant.com='';
  }
  }

 

