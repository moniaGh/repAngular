import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorrespondantService } from '../services/correspondant.service';
import { ICommission } from '../interface/icommission';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {
public commissions = []
public commission = {
  id: 0,
  comN:'',
  comType :'',
  taux:0,
  comMax :0,
  comMin : 0

}
private readonly notifier: NotifierService;
   /**
     * Constructor
     *
     * @param {NotifierService} notifier Notifier service
     */
  constructor(notifierService: NotifierService ,private http: HttpClient,private correspondantService : CorrespondantService) {
    this.notifier = notifierService;

  }

  ngOnInit() {
    this.reloadData()
  }
reloadData()
{
  this.http.get<ICommission[]>(this.correspondantService.urlC).subscribe
  (rep => {this.commissions=rep;console.log(rep)},
  error =>{console.log(error)})


}
addC()
{
if(this.commission.comMin>this.commission.comMax)
this.notifier.notify( "error", "Commission max doit étre superieur à commission min !" )
else {
  this.http.post(this.correspondantService.urlC,this.commission).subscribe(
  rep => {this.notifier.notify( "success", "Commission Ajoutée !" );
  console.log(rep);this.reloadData();this.emptyComm()},
  error=> {console.log(error)}
)}
}
deleteC(com)
{
  if (com.comN=='interne' )
  this.notifier.notify( "error", "Suppression Impossible !" );
  else
 { this.http.delete(this.correspondantService.urlC+'/'+com.id).subscribe
  (rep => {this.notifier.notify( "error", "Commission suprimée !" );
  console.log(rep);this.reloadData()},
  error =>{console.log(error);this.notifier.notify( "error", "Suppression Impossible !" );})
}}
getOne(commission)
{
this.commission=commission
}
updateC()
{
  if(this.commission.comMin>this.commission.comMax)
{this.notifier.notify( "error", "Commission max doit étre superieur à commission min !" )
this.reloadData()}
else {
  this.http.put(this.correspondantService.urlC+'/'+this.commission.id,this.commission).subscribe(
    rep => {this.notifier.notify( "info", "Commission Modifiée !" );console.log(rep);this.reloadData()},
    error => {console.log(error)}
  )}
}
emptyComm()
{
  this.commission.comN=""
  this.commission.comMax=0
  this.commission.comMin=0
  this.commission.taux=0
}
}