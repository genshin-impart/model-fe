import { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import { Button, Typography } from "@mui/joy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import useAxios from "@/Hooks/useAxios";
import useGlobalState from "@/Hooks/useGlobalState";
import FormInput from "./General/FormInput";
import AnimatedModal from "./General/AnimatedModal";
import { toast } from "sonner";

interface IProps {
  open: boolean;
  onLogin?: (username?: string) => void;
  onRegister?: () => void;
}

const LoginModal: React.FC<IProps> = ({ open, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setGlobalUsername = useGlobalState((state) => state.setUsername);
  const [, error, loading, fetchLogin] = useAxios<string>(
    "/user/login",
    {
      method: "post",
      data: { username, password },
    },
    (resp) => {
      const { code, data, msg } = resp;
      if (code === 0) {
        onLogin?.(data);
        const name = data?.length ?? 0 > 0 ? (data as string) : "User";
        setGlobalUsername(name);
        window.localStorage.setItem("user", name);
      } else {
        toast.error(msg);
      }
    }
  );

  const handleLogin = async () => {
    if (username === "local") {
      onLogin?.(username);
      setGlobalUsername(username);
      return;
    }
    await fetchLogin();
    setUsername("");
    setPassword("");
  };

  return (
    <AnimatedModal open={open}>
      <Sheet
        component="form"
        sx={{
          width: "fit-content",
          mx: 5,
          my: 4, // margin top & bottom
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Sheet sx={{ mb: 2 }}>
          <Typography level="h4" component="h1">
            欢迎来到模型可视化平台
          </Typography>
          <Typography level="body2">您需要登录才能继续操作</Typography>
        </Sheet>
        <FormInput
          name="username"
          label="用户名"
          type="text"
          onChange={(e) => setUsername(e.toString())}
          onReturn={handleLogin}
          labelWidth="3rem"
        />
        <FormInput
          name="password"
          label="密码"
          type="password"
          onChange={(e) => setPassword(e.toString())}
          onReturn={handleLogin}
          labelWidth="3rem"
        />
        {error && (
          <Typography
            color="danger"
            level="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            {error}
          </Typography>
        )}
        <Sheet
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Button disabled={loading} onClick={handleLogin}>
            登录
          </Button>
          <Button>注册</Button>
        </Sheet>
      </Sheet>
    </AnimatedModal>
  );
};

export default LoginModal;
