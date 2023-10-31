import {Product} from "../models/Product.model.ts";

export const mockedProducts: Product[] = [
    {
        id: '1',
        name: 'Mleko',
        weight: 150,
        price: 75
    },
    {
        id: '2',
        name: 'Piwko',
        weight: 139,
        price: 299
    },
    {
        id: '3',
        name: 'Czipsiki',
        weight: 362,
        price: 372,
    }
]

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
    }
]
