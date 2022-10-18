import axios from "axios";

const api = axios.create({
  // withCredentials: true,
  //baseURL: "http://x98736zu.beget.tech/web/api/",
  //baseURL: "http://api/api/",
  baseURL: "http://localhost:5000/",
});

export const paintApi = {
  getImage(sessionId) {
    return api.get("image?id=" + sessionId);
  },
  sendImage(sessionId, image) {
    return api.post("image?id=" + sessionId, { img: image });
  },
};
