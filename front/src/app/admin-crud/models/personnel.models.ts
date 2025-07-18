import { ServiceId } from './service.model';

export interface PersonnelId {
  codSoc: string;
  matPers: string;
  codServ?: string;
}

export interface Personnel {
  id: PersonnelId;
  nomPers: string;
  prenPers: string;
  nomPersA?: string | null;
  prenPersA?: string | null;
  nomJf?: string | null;
  nomJfA?: string | null;
  cin?: string | null;
  sexe: string;
  codSit?: string | null;
  datSit?: string | null;
  chefFam?: string | null;
  nbreEnf?: number | null;
  chargEnf?: string | null;
  chargAll?: string | null;
  fctFam?: string | null;
  datEnt?: string | null;
  datTit?: string | null;
  codFonct?: string | null;
  codCateg?: string | null;
  codCat?: string | null;
  codGrad?: string | null;
  codMotif?: string | null;
  codNatp?: string | null;
  codStat?: string | null;
  datServ?: string | null;
  datFonct?: string | null;
  datQualf?: string | null;
  datCateg?: string | null;
  datCat?: string | null;
  datGrad?: string | null;
  datEch?: string | null;
  datEmb?: string | null;
  datMotif?: string | null;
  datNais?: string | null;
  etatAct?: string | null;
  service?: { 
    id: ServiceId; 
    libServ?: string 
  };
}