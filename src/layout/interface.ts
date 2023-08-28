import { Pagination } from '@/components/commons/table/table-deafault';

export interface TypePortData {
  typePortID: string;
  typePortName: string;
  description: string;
  status: number;
  insertedDate: string;
  insertedBy: string;
  updatedDate: string;
  updatedBy: string;
}

export interface CountriesType extends Pagination {
  data: CountryType[];
}

export interface CountryType {
  countryID: string;
  countryName: string;
  maCK: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}
