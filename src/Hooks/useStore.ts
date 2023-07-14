import { create } from "zustand";

interface IStore {
  csvFiles: CsvFileItem[];
  tableData: ITableData;
  pushCsv: (file: CsvFileItem) => void;
  removeCsv: (index: number) => void;
  pushTableData: (data: ITableData) => void;
  clearTableData: () => void;
  setTableData: (data: ITableData) => void;
}

const useStore = create<IStore>()((set) => {
  return {
    csvFiles: [],
    tableData: {
      columns: [],
      data: [],
    },
    pushCsv: (file) =>
      set((state) => ({ csvFiles: [...state.csvFiles, file] })),
    removeCsv: (index) =>
      set((state) => ({
        csvFiles: state.csvFiles.filter((_, i) => i !== index),
      })),
    pushTableData: (data) => {
      set((state) => ({
        tableData: {
          columns: data.columns,
          data: [...state.tableData.data, ...data.data],
        },
      }));
    },
    clearTableData: () => {
      set(() => ({
        tableData: {
          columns: [],
          data: [],
        },
      }));
    },
    setTableData: (data) => {
      set(() => ({ tableData: data }));
    },
  };
});

export default useStore;
