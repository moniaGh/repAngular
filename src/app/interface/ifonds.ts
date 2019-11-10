import { ICorrespondant } from './icorrespondant';
import { IBeneficiaire } from './ibeneficiaire';

export interface IFonds {
  beneficiaire: IBeneficiaire[];
    id: number;
    correspondant : ICorrespondant;
    dateRep : Date;
    montant: number;
    devise : string;
    commentaire : string;
    statut: string;
    nbrBeneficiaire : number;

}
