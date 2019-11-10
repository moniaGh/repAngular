import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { CorrespondantService } from './services/correspondant.service';
import { interval, Subscription, Observable, timer } from 'rxjs'
import { IFonds } from './interface/ifonds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Pension de retraite';
  public numberofNot : number
  sub : Subscription;
  public fonds = []
  constructor(private http: HttpClient,private correspondantService: CorrespondantService,private router:Router){}
  ngOnInit() {
    this.sub = interval(10000)
    .subscribe((val) => { this.getNot(); })
  /* while(true)
    {
      setTimeout(
        () => {
          this.getNot()
        }, 60000
      )
    }*/
  
   // this.getNot()
 
}
 getNot()
  {
    this.http.get<number>(this.correspondantService.urlFonds+'/notification').
          subscribe(
                rep => {this.numberofNot= rep;console.log(rep);return rep;},
                error => {console.log(error);return error});
  }
  public goToCorresPage() {
    this.router.navigate(['correspondant']);

    
  }


public goNot()
{
  this.router.navigate(['fonds'])
}
  public goToFondsPage() {
    this.router.navigate(['fonds']);
}
public goToPenPage()
{
  this.router.navigate(['pensionnaire']);

}
public goToComPage()
{
  this.router.navigate(['commission']);
}
public goToStat()
{
  this.router.navigate(['stat']);
}
goToChangePage()
{
  this.router.navigate(['change'])
}
}
