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

export const INITIAL_WORKER_DATA: AddWorker = {
  name: '',
  surname: '',
  workplace: '',
};
