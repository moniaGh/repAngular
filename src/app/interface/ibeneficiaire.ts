import { IPensionnaire } from './ipensionnaire';
import { IFonds } from './ifonds';

export interface IBeneficiaire {
    idB : number;
    pensionnaireIdp:  string; 
    montantP : number;
    commission : number;
    mntNet: number ;
    statut: string ;
    fonds: IFonds;
    mntDinar :number ;
    pensionnaire : IPensionnaire

}
