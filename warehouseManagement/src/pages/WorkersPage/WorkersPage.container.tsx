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
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addingWorkerThunk,
  deletingWorkersThunk,
  editingWorkerThunk,
  getWorkers,
} from '../../store/reducers/workersReducer.tsx';
import { getProducts } from '../../store/reducers/productReducer.tsx';
import { AddWorker, INITIAL_WORKER_DATA, Worker } from '../../models/Worker.model.ts';
import api from '../../services/api/AxiosApi.ts';

const WORKPLACES = ['PRACOWNIK', 'KIEROWNIK'] as const;

const WorkersPageContainer = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [addWorkerData, setAddWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const [editWorkerData, setEditWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const [sqlInjection, setSqlInjection] = useState<string>('');
  const workers = useAppSelector(getWorkers);

  const selectValues = WORKPLACES.map((workplace) => <option key={workplace} value={workplace}>{workplace}</option>);

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setAddWorkerData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSelectChangeHandler = (type: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    setAddWorkerData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSQLHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSqlInjection(e.target.value);
  };

  const onSelectEditChangeHandler = (type: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    setEditWorkerData((prevState) => ({
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
    dispatch(addingWorkerThunk(addWorkerData));
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

  const sqlInjectionHandler = async () => {
    const id_worker: string = sqlInjection;
    const res = await api.get(`http://localhost:8000/worker/${id_worker}`);
    console.log('RESPONSE', res);
    toast({
      title: 'Baza w pizdu!',
      status: 'success',
      position: 'top-right',
    });
    setSqlInjection('');
  };

  const editWorkerHandler = (id: string) => {
    const editData: Worker = {
      id,
      name: editWorkerData.name,
      workplace: editWorkerData.workplace,
      surname: editWorkerData.surname,
    };
    dispatch(editingWorkerThunk(editData));
    toast({
      title: 'Worker edited',
      description: 'Worker edited',
      status: 'success',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    });
    setEditWorkerData(INITIAL_WORKER_DATA);
  };

  const deleteWorkerHandler = (id: string) => {
    console.log('USUWANIE PRODUKTU');
    dispatch(deletingWorkersThunk(id));
    toast({
      title: 'Worker deleted',
      description: 'Worker deleted',
      status: 'success',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    });
  };

  const sqlInjectionModalContent = (
    <div>
      <h4>Wywal sobie bazke tu</h4>
      <InputComponent placeholder="Sql inj" value={sqlInjection} onChange={onSQLHandler} />
    </div>
  );

  const addingWorkerModalContent = (
    <div>
      <h4>Add worker here</h4>
      <InputComponent placeholder="Worker name" value={addWorkerData.name} onChange={onChangeHandler('name')} />
      <InputComponent placeholder="Worker surname" value={addWorkerData.surname} onChange={onChangeHandler('surname')} />
      <Select placeholder="Select workplace" onChange={onSelectChangeHandler('workplace')}>
        {selectValues}
      </Select>
    </div>
  );

  const editingWorkerModalContent = (
    <div>
      <h4>Edit worker here</h4>
      <InputComponent placeholder="Worker name" value={editWorkerData.name} onChange={onEditChangeHandler('name')} />
      <InputComponent placeholder="Worker surname" value={editWorkerData.surname} onChange={onEditChangeHandler('surname')} />
      <Select placeholder="Select workplace" onChange={onSelectEditChangeHandler('workplace')}>
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
          modalAction={() => editWorkerHandler(data.id)}
          modalContent={editingWorkerModalContent}
        />
      </Td>
      <Td>
        <ModalComponent
          modalHeader="Delete worker"
          buttonText="Delete"
          modalAction={() => deleteWorkerHandler(data.id)}
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
        <ModalComponent buttonText="TEST SQL" modalAction={sqlInjectionHandler} modalHeader="SQL Injection" modalContent={sqlInjectionModalContent} />
      </div>
    </SinglePageWrapperComponent>
  );
};

export default WorkersPageContainer;
