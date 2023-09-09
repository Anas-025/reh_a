import { CircularProgress } from "@mui/material";

function Loading({message}: {message: string}) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {message}
      <CircularProgress />
    </div>
  );
}

export default Loading;
