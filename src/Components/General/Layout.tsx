import LoginModal from "@/Components/LoginModal";
import UserProfile from "@/Components/UserProfile";
import useGlobalState from "@/Hooks/useGlobalState";
import { Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

const Layout = () => {
  const logIn = useGlobalState((s) => !!s.username);
  const setGlobalUsername = useGlobalState((s) => s.setUsername);

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user !== null) {
      setGlobalUsername(user);
    }
  }, [setGlobalUsername]);

  return (
    <Stack
      spacing={{ xs: 2, md: 4 }}
      sx={{
        width: "var(--card-width)",
        mx: "auto",
        py: "var(--card-padding)",
        display: "flex",
      }}
    >
      <UserProfile />
      <Outlet />
      <LoginModal
        open={!logIn}
        onLogin={(name?: string) => {
          toast.success("欢迎回来 " + name + "！");
        }}
      />
    </Stack>
  );
};

export default Layout;
