import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CorrespondantService {
  public baseUrl = 'http://localhost:4202/';
  public urlCoressp = this.baseUrl+'api/v1/correspondants';
  public urlFonds= this.baseUrl+'api/v2/fonds';
  public urlB = this.baseUrl+'api/v3/beneficiaires';
  public urlP = this.baseUrl+'api/v4/pensionnaires';
public urlC = this.baseUrl+'api/v5/commissions';
public urlChange = this.baseUrl+'api/v6/changes';

  constructor(private httpClient: HttpClient) { }
 



}
