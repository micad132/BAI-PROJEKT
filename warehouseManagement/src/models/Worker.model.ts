export type Worker = {
  id: string,
  name: string,
  surname: string,
  workplace: string,
};

export type AddWorker = {
  name: string,
  surname: string,
  workplace: string,
};

export type WorkerErrors = {
  name: string,
  surname: string,
  workplace: string,
};

export const INITIAL_WORKER_ERRORS: WorkerErrors = {
  name: '',
  surname: '',
  workplace: '',
};

export const INITIAL_WORKER_DATA: AddWorker = {
  name: '',
  surname: '',
  workplace: '',
};
