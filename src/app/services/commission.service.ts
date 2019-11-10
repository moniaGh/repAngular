import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICommission } from '../interface/icommission';
import { CorrespondantService } from './correspondant.service';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
public commissions = []
  constructor(private http: HttpClient,private correspondantService: CorrespondantService) { }
 getCommission():ICommission[]
 {
  this.http.get<ICommission[]>(this.correspondantService.urlC).
  subscribe(
        rep => {this.commissions= rep;},
        error => {console.log(error)});
        return this.commissions
}}
