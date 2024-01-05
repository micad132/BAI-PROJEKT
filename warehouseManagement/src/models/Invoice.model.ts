export type Invoice = {
  id: string,
  date: string,
  price: number,
  idProduct: string,
};

export const INVOICE_INITIAL_DATA: Invoice = {
  id: '',
  date: '',
  price: 0,
  idProduct: '',
};
