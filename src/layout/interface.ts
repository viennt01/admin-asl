import { IPagination } from '@/components/commons/table/table-default';

export interface TypePortData {
  typeLocationID: string;
  typeLocationName: string;
  description: string;
}

export interface CountriesType extends IPagination {
  data: Country[];
}

export interface Country {
  countryID: string;
  countryName: string;
  maCK: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface City {
  cityID: string;
  countryID: string;
  countryName: string;
  cityName: string;
  maCK: string;
  dateInserted: string;
  insertedByUser: string;
  dateUpdated: string;
  updatedByUser: string;
}

export interface CityType extends IPagination {
  data: City[];
}

export interface INotification {
  totalNotification: string;
  totalNewNotification: string;
  notificationDTOs: {
    notificationID: string;
    title: string;
    content: string;
    objectID: string;
    typeObject: string;
    isRead: boolean;
    dateInserted: number;
    colorAvatar: string;
    avatar: string;
    defaultAvatar: string;
    fullName: string;
  }[];
}
