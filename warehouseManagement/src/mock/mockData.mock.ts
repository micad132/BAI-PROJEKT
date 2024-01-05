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
    name: 'Nazwa',
    isNumeric: false,
  },
  {
    name: 'Waga',
    isNumeric: true,
  },
  {
    name: 'Cena',
    isNumeric: true,
  },
  {
    name: 'Edytuj',
    isNumeric: false,
  },
  {
    name: 'Usuń',
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

export const InvoiceTableHeader = [
  {
    name: 'ID',
    isNumeric: false,
  },
  {
    name: 'Data kupna',
    isNumeric: false,
  },
  {
    name: 'Koszt',
    isNumeric: true,
  },
  {
    name: 'ID produkt',
    isNumeric: true,
  },
  {
    name: 'Edytuj',
    isNumeric: false,
  },
  {
    name: 'Usuń',
    isNumeric: false,
  },
];
