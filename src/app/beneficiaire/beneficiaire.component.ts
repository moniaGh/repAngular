import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorrespondantService } from '../services/correspondant.service';
import { IBeneficiaire } from '../interface/ibeneficiaire';
import { Router, ActivatedRoute } from '@angular/router';
import { IFonds } from '../interface/ifonds';
import { IPensionnaire } from '../interface/ipensionnaire';
import { NotifierService } from 'angular-notifier';
import { ICommission } from '../interface/icommission';
import { ICorrespondant } from '../interface/icorrespondant';
import { IChange } from '../interface/ichange';

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {

  public beneficiaires = [];
  public pensionnairesDataList = [];
  public pensionnaires = []
  public theRep: IPensionnaire
  public comRep: ICommission
  public id: string;
  public montant: any;
  public otherM: any;
  public nbrB: number;
  public fonds: IFonds
  public pensionnaireOne: IPensionnaire
  public salaire: number;
  public gCon = false;
  public changeOfDay = false
  progressm = 0;
  public sal
  progressMoney = 0;

  nbrR = 0;
  public change: IChange
  public correspondant: ICorrespondant
  public comInterne
  public errorMsg;
  public salaireMin: number;
  public salaireMax: number;
  public forbidden = false;
  public aux: number;
  public montanU: any;
  isLoading = false;
  error1: any
  public closed = true;
  public beneficiaire = {
    idB: null,
    pensionnaireIdp: '',
    montantP: 0,
    commissionI: 0,
    commissionC: 0,
    mntNet: 0,
    fondsIdf: null,
    statut: "",
    fonds: null,
    pensionnaire: null,
    mntDinar: 0,
  }
  public pen = {
    idP: '',
    numRib: '',
    secSoc: '',
    typeCom: '',
    typeVirement: '',
    statutP: '',
    salaire: 0,
    nom: '',
    prenom: '',

  }
  public msgDevise: boolean;

  public statement = false;
  private readonly notifier: NotifierService;
  /**
    * Constructor
    *
    * @param {NotifierService} notifier Notifier service
    */

  constructor(notifierService: NotifierService, private http: HttpClient, private correspondantService: CorrespondantService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.notifier = notifierService;

  }

  ngOnInit() {
    this.forbidden = false
    this.msgDevise = false;
    this.http.get<IFonds>(this.correspondantService.urlFonds + '/' + this.id).
      subscribe(
        rep => { this.fonds = rep; this.getCh(); console.log(rep); this.montant = rep.montant; this.nbrB = rep.nbrBeneficiaire; this.reloadData(), this.makeSure(); this.otherM = rep.montant; this.progressm = 0; this.progressMoney = 0; this.getChange() },
        error => { console.log(error) });


    this.http.get<IPensionnaire[]>(this.correspondantService.urlP).
      subscribe(
        rep => { this.pensionnairesDataList = rep; console.log(rep); console.log(this.pensionnairesDataList.length) },
        error => { console.log(error) });
    this.http.get<ICommission>(this.correspondantService.urlC + '/byname/interne').
      subscribe(
        rep => { this.comInterne = rep; console.log(rep); },
        error => { console.log(error) });


    this.makeSure()
    this.generalCon()
    return;
  }
  getCh() {
    if (this.fonds.devise != 'dinar-tunisien') {
      this.http.get<IChange>(this.correspondantService.urlChange + '/' + this.fonds.devise).
      subscribe(
        rep => { this.msgDevise = true; console.log(rep); console.log(this.msgDevise) },
        error => { this.msgDevise = false; console.log(error) });
    }
    else
      this.msgDevise = true;
  }
  returnToFonds() {
    this.router.navigate(['fonds'])
  }
  getChange() {
    if (this.fonds.devise != 'dinar-tunisien') {
      console.log(this.correspondantService.urlChange + '/' + this.fonds.devise)
      this.http.get<IChange>(this.correspondantService.urlChange + '/' + this.fonds.devise).
        subscribe(
          rep => { this.change = rep; console.log(rep) },
          error => {
            this.change = error.error; console.log(error.error);
            this.changeOfDay = true
          });
      if (this.change !== null) { }
      console.log(this.changeOfDay)

    }
    else
      console.log('kjk')
  }


  makeSure() {
    if (this.nbrB == this.nbrR) {
      this.forbidden = true;
      console.log(this.forbidden)
    } else
      this.forbidden = false
    if (this.montant > 0 && this.nbrR == this.nbrB) {
      this.gCon = true;
      this.forbidden = true;
      console.log(this.forbidden)
      this.errorMsg = 'Vérifier la Somme des Montants'
      console.log(this.errorMsg)
    } else {
      this.gCon = false;
      this.forbidden = false;

    }
    if (this.nbrR == 1) {
      this.fonds.statut = 'En cours de Traitement'
      this.http.put(this.correspondantService.urlFonds + '/' + this.beneficiaire.fondsIdf, this.fonds).subscribe(
        rep => { console.log(rep) },
        error => { console.log(error) }
      )
    }
    if (this.montant == 0 && this.nbrB == this.nbrR) {
      this.closed = false;
      this.fonds.statut = 'Traité'
      this.http.put(this.correspondantService.urlFonds + '/' + this.fonds.id, this.fonds).subscribe
        (
          rep => { console.log(rep) },
          error => { console.log(error) }
        )
    }

  }
  generalCon() {
    if (this.montant <= 0 && this.nbrR < this.nbrB) {
      this.gCon = true;
      this.forbidden = true;
    }
  }
  reloadData() {

    //this.beneficiaires=this.fonds.beneficiaire;
    this.http.get<IBeneficiaire[]>(this.correspondantService.urlB + '/bygroupe/' + this.id).
      subscribe(
        rep => {
          this.beneficiaires = rep; console.log(rep); this.makeSure(), this.makeData();
        },
        error => { console.log(error) });
    console.log(this.beneficiaires)
    this.aux = 1 / this.nbrB;
    //this.makeData();

    return;
  }

  reloadDataN() {
    this.http.get<IBeneficiaire[]>(this.correspondantService.urlB + '/bygroupe/' + this.id).
      subscribe(
        rep => { this.beneficiaires = rep; console.log(rep); this.makeSure() },
        error => { console.log(error) });
    this.aux = 1 / this.nbrB;

    return;
  }
  makeData() {

    for (let oneB of this.beneficiaires) {
      console.log('makedata ' + this.beneficiaires)
      this.montant = this.montant - oneB.montantP;
      console.log(this.montant);
      this.progressm = this.progressm + (this.aux * 100);
      this.progressMoney = this.progressMoney + ((oneB.montantP / this.otherM) * 100)
    }
    this.nbrR = this.beneficiaires.length;
    this.makeSure()
    this.generalCon()
  }
  add_bnf() {
    if (this.beneficiaire.pensionnaireIdp == '') {
      this.notifier.notify("error", "Veuillez choisir un ID-Pensionnaire!")

      this.emptyModel()

    }

    else if (this.beneficiaire.montantP == 0) {
      this.notifier.notify("error", "Veuillez donner un salaire!")
      this.emptyModel()
    }

    else {
      this.http.get<IPensionnaire>(this.correspondantService.urlP + '/join/' + this.beneficiaire.pensionnaireIdp).
        subscribe(
          rep => {
            this.theRep = rep; console.log(rep); this.salaireMax = this.theRep.salaire * 1.2; this.salaireMin = this.theRep.salaire * 0.8; console.log(this.salaireMax); console.log(this.salaireMin); this.adding();
          },
          error => { console.log(error); });
    }
  }
  adding() {
    if (this.beneficiaire.pensionnaireIdp == '') {
      this.notifier.notify("error", "Id Pensionnaire vide !")

      this.emptyModel()

      this.statement = true;
    }
    if (this.theRep == null) {
      this.notifier.notify("error", "Pensionnaire Inexistant !")
      this.emptyModel()

      this.statement = true;
    }
    else if (!(this.theRep.statutP.trim() === 'actif')) {
      this.notifier.notify("error", "Pensionnaire Inactif !")
      this.emptyModel()

      this.statement = true;
    }
    else if (this.beneficiaire.montantP >= this.otherM || this.beneficiaire.montantP > this.montant) {
      this.notifier.notify("error", "Montant Invalide !")
      this.emptyModel()

      this.statement = true;
    }
    else if (this.salaireMax < this.beneficiaire.montantP) {
      this.notifier.notify("error", "salaire est dépassé!")
      this.emptyModel()

      this.statement = true;

    }

    else if (this.salaireMin > this.beneficiaire.montantP) {
      this.notifier.notify("error", "salaire inférieur !")
      this.statement = true;
    }


    else {
      if (this.theRep.comCor == true) {
        var commission = this.beneficiaire.montantP * this.fonds.correspondant.commission.taux / 100
        if (commission < this.fonds.correspondant.commission.comMin)
          this.beneficiaire.commissionC = this.fonds.correspondant.commission.comMin + this.beneficiaire.commissionC
        else if (commission > this.fonds.correspondant.commission.comMax)
          this.beneficiaire.commissionC = this.fonds.correspondant.commission.comMax + this.beneficiaire.commissionC
        else
          this.beneficiaire.commissionC = commission + this.beneficiaire.commissionC

        console.log(commission)
      }
      if (this.theRep.comIn == true) {
        var commission1 = this.beneficiaire.montantP * this.comInterne.taux / 100
        if (commission1 < this.comInterne.comMin)
          this.beneficiaire.commissionI = this.comInterne.comMin + this.beneficiaire.commissionI
        else if (commission1 > this.comInterne.comMax)
          this.beneficiaire.commissionI = this.comInterne.comMax + this.beneficiaire.commissionI
        else this.beneficiaire.commissionI = commission1 + this.beneficiaire.commissionI

        console.log(commission1)
      }


      if (this.theRep.comIn == false)
        this.beneficiaire.commissionI = 0
      if (this.theRep.comCor == false)
        this.beneficiaire.commissionC = 0


    }
    if (this.statement == false) {
      this.addingCom()
    }
    else
      this.statement = false;


  }
  addingCom() {
    console.log(this.beneficiaire.pensionnaireIdp)
    console.log(this.changeOfDay)
    //this.beneficiaire.fondsIdf = parseInt(this.id);
    this.beneficiaire.fonds = this.fonds;
    this.beneficiaire.pensionnaire = this.theRep;

    this.beneficiaire.statut = "En cours";
    this.beneficiaire.mntNet = this.beneficiaire.montantP - (this.beneficiaire.commissionC + this.beneficiaire.commissionI)
    //
    if (this.msgDevise == true)// if(this.changeOfDay==true)
    {
      if (this.fonds.devise == 'dinar-tunisien') {
        this.beneficiaire.mntDinar = this.beneficiaire.mntNet

      }
      else {
        this.beneficiaire.mntDinar = this.change.coursAchat * this.beneficiaire.mntNet
        console.log(this.beneficiaire.mntDinar)
      }
    }
    else {
      this.beneficiaire.mntDinar = 0
    }

    console.log(this.beneficiaire);
    this.http.post(this.correspondantService.urlB, this.beneficiaire).
      subscribe(rep => {
        this.notifier.notify("success", "Pensionnaire Ajouté"); console.log(rep); this.montant = this.montant - this.beneficiaire.montantP; this.progressMoney = this.progressMoney + ((this.beneficiaire.montantP / this.otherM) * 100); this.nbrR = this.nbrR + 1; this.progressm = this.progressm + (this.aux * 100); this.reloadDataN();
        this.makeSure(); this.generalCon(); this.emptyModel()
      },
        error => {
          console.log(error); this.error1 = error; this.handleError(); console.log(this.error1.error.message)
        })
  }
  handleError() {
    if (this.error1.error === 'Duplicate')
      this.notifier.notify("error", "Pensionnaire Déja Ajouté"); this.emptyModel()
  }




  public deleteB(beneficiaire) {
    var delete_url = this.correspondantService.urlB + "/" + beneficiaire.idB;
    this.http.delete(delete_url).
      subscribe(rep => {
        this.notifier.notify("error", " Pensionnaire Supprimé !");
        console.log(rep);
        this.progressMoney = this.progressMoney - ((beneficiaire.montantP / this.otherM) * 100);
        this.montant = this.montant + beneficiaire.montantP;
        this.nbrR = this.nbrR - 1;
        this.progressm = this.progressm - (this.aux * 100);
        this.reloadDataN()
      },
        error => { console.log(error) })
    return;
  }

  getOne(benf) {
    this.beneficiaire = benf
    this.sal = this.beneficiaire.montantP;

    console.log(this.beneficiaire.pensionnaire.idP)
  }


  emptyModel() {
    this.beneficiaire.pensionnaireIdp = ""
    this.beneficiaire.montantP = 0
    this.beneficiaire.commissionI = 0;
    this.beneficiaire.commissionC = 0;

  }

  public updateBnf() {
    this.http.get<IPensionnaire>(this.correspondantService.urlP + '/join/' + this.beneficiaire.pensionnaire.idP).
      subscribe(
        rep => {
          this.theRep = rep; console.log(rep);
          this.salaireMax = this.theRep.salaire * 1.2;
          this.salaireMin = this.theRep.salaire * 0.8;
          console.log(this.salaireMax);
          console.log(this.salaireMin);
          if (this.beneficiaire.montantP >= this.otherM || this.beneficiaire.montantP > (this.montant + this.sal)) {
            this.notifier.notify("error", "Montant Invalide !")

            this.statement = true;
            this.reloadDataN()
          }
          else if (this.salaireMax < this.beneficiaire.montantP) {
            this.notifier.notify("error", "salaire est dépassé!")

            this.statement = true;
            this.reloadDataN()

          }

          else if (this.salaireMin > this.beneficiaire.montantP) {
            this.notifier.notify("error", "salaire inférieur !")
            this.statement = true;
            this.reloadDataN()
          }


          else {
            if (this.theRep.comCor == true) {
              var commission = 0
              commission = this.beneficiaire.montantP * this.fonds.correspondant.commission.taux / 100
              if (commission < this.fonds.correspondant.commission.comMin)
                this.beneficiaire.commissionC = this.fonds.correspondant.commission.comMin
              else if (commission > this.fonds.correspondant.commission.comMax)
                this.beneficiaire.commissionC = this.fonds.correspondant.commission.comMax
              else
                this.beneficiaire.commissionC = commission

              console.log(commission)
            }
            if (this.theRep.comIn == true) {
              var commission1 = 0
              commission1 = this.beneficiaire.montantP * this.comInterne.taux / 100
              if (commission1 < this.comInterne.comMin)
                this.beneficiaire.commissionI = this.comInterne.comMin
              else if (commission1 > this.comInterne.comMax)
                this.beneficiaire.commissionI = this.comInterne.comMax
              else this.beneficiaire.commissionI = commission1

              console.log(commission1)
            }


            if (this.theRep.comIn == false)
              this.beneficiaire.commissionI = 0
            if (this.theRep.comCor == false)
              this.beneficiaire.commissionC = 0


          }
          if (this.statement == false) {
            this.beneficiaire.fonds = this.fonds;
            this.beneficiaire.pensionnaire = this.theRep;

            this.beneficiaire.statut = "En cours";
            this.beneficiaire.mntNet = this.beneficiaire.montantP - (this.beneficiaire.commissionC + this.beneficiaire.commissionI)
            //
            if (this.msgDevise == true)// if(this.changeOfDay==true)
            {
              if (this.fonds.devise == 'dinar-tunisien') {
                this.beneficiaire.mntDinar = this.beneficiaire.mntNet
        
              }
              else {
                this.beneficiaire.mntDinar = this.change.coursAchat * this.beneficiaire.mntNet
                console.log(this.beneficiaire.mntDinar)
              }
            }
            else {
              this.beneficiaire.mntDinar = 0
            }

            console.log(this.beneficiaire);
            this.http.get<IBeneficiaire>(this.correspondantService.urlB + '/' + this.beneficiaire.idB).
              subscribe(
                rep => {

                  this.montanU = rep.montantP; this.montant = this.montant + this.montanU; console.log(this.montant);
                  this.reloadDataN()

                  this.makeCheck()
                },
                error => { console.log(error) });
            console.log(this.beneficiaire);
          }
          else
            this.statement = false;



        },
        error => { console.log(error); });

    return;
  }
  makeCheck() {
    console.log(this.sal)
    var update_url = this.correspondantService.urlB + "/" + this.beneficiaire.idB;
    if (this.montant < this.beneficiaire.montantP)
      this.notifier.notify("error", "Modification Erronée")
    else {
      this.http.put(update_url, this.beneficiaire).
        subscribe(rep => {
          console.log(rep);
          this.notifier.notify("info", " Pensionnaire modifié!");

          this.progressMoney = this.progressMoney - ((this.sal / this.otherM) * 100);
          this.progressMoney = this.progressMoney + ((this.beneficiaire.montantP / this.otherM) * 100);
          this.montant = this.montant - this.beneficiaire.montantP; this.reloadDataN()
        },
          error => { console.log(error) })
    }
  }

  annuler() {
    this.emptyModel()
    this.reloadDataN()
  }
}
