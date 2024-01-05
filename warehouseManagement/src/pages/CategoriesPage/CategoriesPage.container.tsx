import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import TableComponent from '../../components/table.component.tsx';
import ModalComponent from '../../components/modal.component.tsx';

const CategoriesPageContainer = () => {
    (



const deletingProductModalContent = (name: string) => (
    <div>
        <h3>
            Do you confirm deleting
            {name}
            ?
        </h3>
    </div>
);

  return(<SinglePageWrapperComponent>
    <TableComponent tableCaption="Categories" mappedData={mappedData} mappedHeaders={mappedHeaders} />
    <div style={{ flex: '0' }}>
      <ModalComponent buttonText="Add invoice" modalAction={addCategoryHandler} modalHeader="Adding invoice" modalContent={addingCategoryModalContent} />
    </div>
  </SinglePageWrapperComponent>
)};

export default CategoriesPageContainer;
