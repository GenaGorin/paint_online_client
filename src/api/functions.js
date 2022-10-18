import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";
import { paintApi } from "./api";

export async function getImage(sessionId, callback) {
  try {
    const response = await paintApi.getImage(sessionId);
    callback(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function sendImage(sessionId, image) {
  try {
    await paintApi.sendImage(sessionId, image);
  } catch (e) {
    console.log(e);
  }
}

export function drawPicture(ctx, figure) {
  switch (figure.type) {
    case "brush":
      Brush.draw(ctx, figure.x, figure.y);
      break;
    case "rect":
      Rect.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.width,
        figure.height,
        figure.color
      );
      break;
    case "circle":
      Circle.staticDraw(
        ctx,
        figure.x,
        figure.y,
        figure.width,
        figure.height,
        figure.color
      );
      break;
    case "eraser":
      Eraser.draw(ctx, figure.x, figure.y);
      break;
    case "line":
      console.log("try draw line", figure);
      Line.staticDraw(
        ctx,
        figure.startX,
        figure.startY,
        figure.endX,
        figure.endY,
        figure.color
      );
    case "finish":
      ctx.beginPath();
      break;
  }
}

export const openWebsocket = (sessionId, username, messageCallback) => {
  const socket = new WebSocket("ws://localhost:5000/");
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id: sessionId,
        username: username,
        method: "connection",
      })
    );
  };
  socket.onmessage = messageCallback;
  return socket;
};
