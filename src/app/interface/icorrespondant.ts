import { ICommission } from './icommission';

export interface ICorrespondant {
    pk : number; 
    codeBIC: number;
    designation: string;
    abrv : string;
    pays : string;
    com :    any ; 
    commission : ICommission
}
