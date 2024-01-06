import {
  Td, Th, Tr, useToast, Select,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import TableComponent from '../../components/table.component.tsx';
import ModalComponent from '../../components/modal.component.tsx';
import { InvoiceTableHeader, mockedInvoices, WORKERS_TABLE_HEADERS } from '../../mock/mockData.mock.ts';
import { Invoice, INVOICE_INITIAL_DATA } from '../../models/Invoice.model.ts';
import InputComponent from '../../components/input.component.tsx';
import { Product } from '../../models/Product.model.ts';
import { useAppSelector } from '../../store';
import { getWorkers } from '../../store/reducers/workersReducer.tsx';
import { getProducts } from '../../store/reducers/productReducer.tsx';
import { AddWorker, INITIAL_WORKER_DATA } from '../../models/Worker.model.ts';

const WORKPLACES = ['PRACOWNIK, KIEROWNIK'] as const;

const WorkersPageContainer = () => {
  const toast = useToast();

  const [addWorkerData, setAddWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const [editWorkerData, setEditWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const workers = useAppSelector(getWorkers);

  const selectValues = WORKPLACES.map((workplace) => <option key={workplace} value={workplace}>{workplace}</option>);

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setAddWorkerData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setEditWorkerData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const addWorkerHandler = () => {
    toast({
      title: 'Worker added',
      description: 'Worker added',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    setAddWorkerData(INITIAL_WORKER_DATA);
  };

  const editWorkerHandler = () => {
    toast({
      title: 'Worker edited',
      description: 'Worker edited',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setEditWorkerData(INITIAL_WORKER_DATA);
  };

  const deleteWorkerHandler = () => {
    console.log('USUWANIE PRODUKTU');
  };

  const addingWorkerModalContent = (
    <div>
      <h4>Add worker here</h4>
      <InputComponent placeholder="Worker name" value={addWorkerData.name} onChange={onChangeHandler('name')} />
      <InputComponent placeholder="Worker surname" value={addWorkerData.surname} onChange={onChangeHandler('surname')} />
      <Select placeholder="Select workplace">
        {selectValues}
      </Select>
    </div>
  );

  const editingWorkerModalContent = (
    <div>
      <h4>Edit worker here</h4>
      <InputComponent placeholder="Worker name" value={editWorkerData.name} onChange={onEditChangeHandler('name')} />
      <InputComponent placeholder="Worker surname" value={editWorkerData.surname} onChange={onEditChangeHandler('surname')} />
      <Select placeholder="Select workplace">
        {selectValues}
      </Select>
    </div>
  );

  const deletingWorkerModalContent = (
    <div>
      <h3>Do you confirm deleting?</h3>
    </div>
  );

  const mappedHeaders = WORKERS_TABLE_HEADERS.map((header, index) => <Th isNumeric={header.isNumeric} key={index}>{header.name}</Th>);
  const mappedData = workers.map((data) => (
    <Tr key={data.id}>
      <Td>{data.id}</Td>
      <Td>{data.name}</Td>
      <Td>{data.surname}</Td>
      <Td>{data.workplace}</Td>
      <Td>
        <ModalComponent
          buttonText="Edit"
          modalHeader="Edit worker"
          modalAction={editWorkerHandler}
          modalContent={editingWorkerModalContent}
        />
      </Td>
      <Td>
        <ModalComponent
          modalHeader="Delete worker"
          buttonText="Delete"
          modalAction={deleteWorkerHandler}
          modalContent={deletingWorkerModalContent}
        />
      </Td>
    </Tr>
  ));
  return (
    <SinglePageWrapperComponent>
      <TableComponent tableCaption="Workers" mappedData={mappedData} mappedHeaders={mappedHeaders} />
      <div style={{ flex: '0' }}>
        <ModalComponent buttonText="Add worker" modalAction={addWorkerHandler} modalHeader="Adding worker" modalContent={addingWorkerModalContent} />
      </div>
    </SinglePageWrapperComponent>
  );
};

export default WorkersPageContainer;
