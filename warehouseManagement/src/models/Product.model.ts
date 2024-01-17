export type Product = {
  id: string,
  id_category: string,
  name: string,
  describe: string,
};

export const INITIAL_PRODUCT_VALUES: Product = {
  id: '',
  id_category: '',
  name: '',
  describe: '',
};

export const INITIAL_ADD_PRODUCT_VALUES: AddProduct = {
  id_category: '',
  name: '',
  describe: '',
};

export type AddProduct = {
  id_category: string,
  name: string,
  describe: string,
};

export type ProductError = {
  id_category: string,
  name: string,
  describe: string,
};

export const PRODUCT_ERROR_INITIAL_VALUES: ProductError = {
  id_category: '',
  name: '',
  describe: '',
};
