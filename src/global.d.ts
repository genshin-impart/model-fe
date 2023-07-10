interface IModelInfo {
  name: string;
  description?: string;
  id: number;
  params?: IModelParam;
}

interface IModelParam {
  epoch: number;
  batchSize: number;
  learningRate: number;
  windowSize: number;
  [key: string]: number | string;
}

interface IFileInfo {
  title: string;
  blob: Blob;
}

interface IStringDict {
  [key: string]: string;
}

interface ITableData {
  columns?: string[];
  data: string[][];
}

interface AxiosResponse<T> {
  code: number;
  data?: T;
  msg?: string;
}
