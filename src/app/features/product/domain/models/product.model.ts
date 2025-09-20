export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_releas: Date;
  date_revision: Date;
  message?:string;
}

export interface MyProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  message?:string;
  
}

export interface ProductUpdate {
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  message?: string;
}

export interface ProductDeletionConfirmation{
  id: string;
  message: string;
}