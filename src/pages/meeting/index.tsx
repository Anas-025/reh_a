import dynamic from "next/dynamic";
import generateMuiTheme from "../../../components/meeting/mui/theme";
import { ThemeProvider } from "@material-ui/styles";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MeetingAppContainer = dynamic(
  () => import("../../../components/meeting/containers/MeetingAppContainer"),
  {
    ssr: false,
  }
);

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("loggedIn") === "false") {
        router.push("/signin");
      }
    }
  }, []);

  return (
    <ThemeProvider theme={generateMuiTheme()}>
      <MeetingAppContainer />
    </ThemeProvider>
  );
}
