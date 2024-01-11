import { Product } from '../models/Product.model.ts';
import { Invoice } from '../models/Invoice.model.ts';

export const mockedProducts: Product[] = [
  {
    id: '1',
    name: 'Mleko',
    weight: 150,
    price: 75,
  },
  {
    id: '2',
    name: 'Piwko',
    weight: 139,
    price: 299,
  },
  {
    id: '3',
    name: 'Czipsiki',
    weight: 362,
    price: 372,
  },
];

export const ProductTableHeader = [
  {
    name: 'ID',
    isNumeric: false,
  },
  {
    name: 'ID kategorii',
    isNumeric: false,
  },
  {
    name: 'Name',
    isNumeric: false,
  },
  {
    name: 'Description',
    isNumeric: false,
  },
  {
    name: 'Edit',
    isNumeric: false,
  },
  {
    name: 'Delete',
    isNumeric: false,
  },
];

export const mockedInvoices: Invoice[] = [
  {
    id: '1',
    date: '20/12/2012',
    price: 343.33,
    idProduct: '1',

  },
  {
    id: '2',
    date: '31/04/2013',
    price: 259,
    idProduct: '2',
  },

];

export const WORKERS_TABLE_HEADERS = [
  {
    name: 'ID',
    isNumeric: false,
  },
  {
    name: 'Imie',
    isNumeric: false,
  },
  {
    name: 'Nazwisko',
    isNumeric: false,
  },
  {
    name: 'Workplace',
    isNumeric: false,
  },
  {
    name: 'Edit',
    isNumeric: false,
  },
  {
    name: 'Delete',
    isNumeric: false,
  },
];

export const CATEGORIES_TABLE_HEADERS = [
  {
    name: 'ID',
    isNumeric: false,
  },
  {
    name: 'Nazwa',
    isNumeric: false,
  },
  {
    name: 'Edit',
    isNumeric: false,
  },
  {
    name: 'Delete',
    isNumeric: false,
  },
] as const;
