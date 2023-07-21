import {
  Button,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, useEffect, useMemo, useState } from "react";
import TaskStatus, { TaskStatusType } from "./TaskStatus";
import LogBox from "./LogBox";
import useSocket from "@/Hooks/useSocket";
import { SOCKET_URL } from "@/Constants/url";
import { toast } from "sonner";
import FluentSwitch from "../General/FluentSwitch";

interface IProps {
  canRun?: boolean;
  mode?: "train" | "apply";
  setId?: string;
  modelParams?: TrainParams;
  modelId?: string;
}

const TaskManager: FC<IProps> = ({
  canRun = true,
  mode = "apply",
  setId,
  modelParams,
  modelId,
}) => {
  const [running, setRunning] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamingMode, setStreamingMode] = useState<"manual" | "auto">(
    "manual"
  );
  const [messages, setMessages] = useState<string[]>([]);
  const { isConnected, isFinished, connect, progress, latestMessage } =
    useSocket();

  const status: TaskStatusType = useMemo(() => {
    if (!running) return "waiting";
    if (!isConnected && !isFinished) return "connecting";
    if (!isFinished) return "running";
    return "finished";
  }, [isConnected, isFinished, running]);

  useEffect(() => {
    if (latestMessage) {
      setMessages((prev) => [...prev, latestMessage as string]);
    }
  }, [latestMessage]);

  const handleRunModel = () => {
    if (!setId) {
      toast.error("没有选择有效数据集");
      return;
    }
    setRunning(true);
    if (mode === "train") {
      if (!modelParams) {
        toast.error("请填写所有模型参数");
        return;
      }
      connect(SOCKET_URL, { task: mode, setId, modelParams });
    } else if (mode === "apply") {
      if (!modelId) {
        toast.error("没有选择有效模型");
        return;
      }
      connect(SOCKET_URL, { task: mode, setId, modelId });
    }
  };
  return (
    <Sheet sx={{ px: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 1, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography level="body2">模拟实时输入</Typography>
          <FluentSwitch
            checked={streaming}
            onChange={(value) => setStreaming(value)}
          />
        </Stack>
        {streaming && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", transition: "all 0.3s ease" }}
          >
            <Select
              value={streamingMode}
              onChange={(_e, v) => {
                if (v) setStreamingMode(v);
              }}
              placeholder="选择一种流式输入方式"
            >
              <Option value="manual">手动输入</Option>
              <Option value="auto">自动输入</Option>
            </Select>
            {streamingMode === "manual" ? (
              <Button>发送数据</Button>
            ) : (
              <>
                <Input placeholder="自动发送间隔" endDecorator="ms" />
                <Button>更新间隔</Button>
              </>
            )}
          </Stack>
        )}
        <Button onClick={handleRunModel} disabled={running || !canRun}>
          {mode === "train" ? "训练模型" : "应用模型"}
        </Button>
      </Stack>
      {running && (
        <>
          <TaskStatus status={status} progress={progress} />
          <LogBox messages={messages} />
        </>
      )}
    </Sheet>
  );
};

export default TaskManager;
