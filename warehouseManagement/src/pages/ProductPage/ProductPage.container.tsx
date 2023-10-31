import TableComponent from "../../components/table.component.tsx";
import {mockedProducts, ProductTableHeader} from "../../mock/mockData.mock.ts";

const ProductPageContainer = () => {
    return(
        <TableComponent  tableCaption='Produkty' tableData={mockedProducts} tableHeaders={ProductTableHeader} />
    )
}

export default ProductPageContainer;
