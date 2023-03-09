import dynamic from "next/dynamic";
// import generateMuiTheme from "../src/mui/theme";
import generateMuiTheme from "../../../components/meeting/mui/theme";
import { ThemeProvider } from "@material-ui/styles";

const MeetingAppContainer = dynamic(
  () => import("../../../components/meeting/containers/MeetingAppContainer"),
  {
    ssr: false,
  }
//   () => import("../src/containers/MeetingAppContainer"),
//   {
//     ssr: false,
//   }
);

export default function Home() {
  return (
    <ThemeProvider theme={generateMuiTheme()}>
      <MeetingAppContainer />
    </ThemeProvider>
  );
}
