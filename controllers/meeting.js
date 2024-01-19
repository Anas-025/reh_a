const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.VIDEOSDK_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkN2IyNWU5NC04NDhmLTQ4M2ItOThkNi01YTcwMDc1N2NlZjEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNTY2MTM3MywiZXhwIjoxODYzNDQ5MzczfQ.mg0WeIxgMFIeqtaV-uoncTfvyvcx0TOhA4pzn88Nrn0";
const API_AUTH_URL = undefined;

export const getToken = async () => {

  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;

  const options = {
    method: "POST",
    headers: { Authorization: `${token}`, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result
    ? result.roomId === roomId && result?.disabled === false
    : false;
};

export const endMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/deactivate`;

  const options = {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId: roomId }),
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result;
};
