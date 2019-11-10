import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CorrespondantService } from '../services/correspondant.service';
import { NotifierService } from 'angular-notifier';
import { IBeneficiaire } from '../interface/ibeneficiaire';
import { Router, ActivatedRoute } from '@angular/router';
import { IPensionnaire } from '../interface/ipensionnaire';



@Component({
  selector: 'app-list-p',
  templateUrl: './list-p.component.html',
  styleUrls: ['./list-p.component.css']
})
export class ListPComponent implements OnInit {
  public beneficiaires = [];
  public id
  private readonly notifier: NotifierService;
  pensionnaireOne: IPensionnaire;
  pensionnaires: any;
  /**
    * Constructor
    *
    * @param {NotifierService} notifier Notifier service
    */

  constructor(notifierService: NotifierService, private http: HttpClient, private correspondantService: CorrespondantService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.notifier = notifierService;
    this.dataSource = new MatTableDataSource(this.beneficiaires);

  }
  displayedColumns: string[] = ['idP', 'nom', 'prenom', 'montantP','commission','mntNet','mntDinar','statut','imprimer'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.reloadData()
    this.dataSource.sort = this.sort;
  }
  reloadData() {
    this.http.get<IBeneficiaire[]>(this.correspondantService.urlB + '/bygroupe/' + this.id).
      subscribe(
        rep => { this.beneficiaires = rep; console.log(rep) , this.makeJoin()},
        error => { console.log(error) });
       this.dataSource = new MatTableDataSource(this.beneficiaires);

    return;
  }
  makeJoin() {

    for (let benf of this.beneficiaires) {
      console.log('the idP' + this.beneficiaires)

      this.http.get<IPensionnaire>(this.correspondantService.urlP + '/join/' + benf.idB).
        subscribe(
          rep => { this.pensionnaireOne = rep; benf.pensionnaire = rep; console.log(rep) },
          error => { console.log(error) });

      console.log(this.beneficiaires)
    }
    this.dataSource = new MatTableDataSource(this.beneficiaires);

  }
  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
