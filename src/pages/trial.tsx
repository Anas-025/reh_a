import { Button } from "@mui/material";
import { useState } from "react";

function trial() {
  const [url, setUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");

  const handleSubmit = () => {
    const videoId = url.split("/")[5];
    setVideoId(videoId);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter url"
          style={{
            width: "40%",
            border: "1px solid black",
            padding: "0.5rem",
            fontSize: "1rem",
            paddingLeft: "1rem",
          }}
        />
        <Button
          sx={{
            backgroundColor: "black!important",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {videoId && (
        <div style={{ margin: "2rem auto" }}>
          <video controls>
            <source
              src={`https://drive.google.com/uc?export=download&id=${videoId}`}
            />
          </video>
        </div>
      )}

      {/* <video controls style={{margin: "2rem auto"}}>
        <source src="https://drive.google.com/uc?export=download&id=1cgcVQcUTJbIqaMuj_JvZ0TWyOyyR34IU" />
      </video> */}
    </div>
  );
}

export default trial;
