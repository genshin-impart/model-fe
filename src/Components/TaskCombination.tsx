import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import FileManager from "./FileManage";
import TaskManager from "./TaskManager";

const TaskCombination = () => {
  const [csvFiles, setCsvFiles] = useState<CsvFileItem[]>([]);

  return (
    <Sheet>
      <FileManager />
      <TaskManager />
    </Sheet>
  );
};

export default TaskCombination;
