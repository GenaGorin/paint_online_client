import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";
import {
  drawPicture,
  getImage,
  openWebsocket,
  sendImage,
} from "../api/functions";
import NameModal from "./NameModal";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const [show, setShow] = useState(true);
  const params = useParams();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    getImage(params.id, drawStartIamge);
  }, []);

  const drawStartIamge = (image) => {
    let ctx = canvasRef.current.getContext("2d");
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };
  };

  useEffect(() => {
    if (canvasState.username) {
      const socket = openWebsocket(
        params.id,
        canvasState.username,
        onMessageCallback
      );
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
    }
  }, [canvasState.username]);

  const onMessageCallback = (event) => {
    let msg = JSON.parse(event.data);
    switch (msg.method) {
      case "connection":
        console.log(msg.username, " join");
        break;
      case "draw":
        drawHandler(msg);
        break;
    }
  };

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    drawPicture(ctx, figure);
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const mouseUpHandler = () => {
    sendImage(params.id, canvasRef.current.toDataURL());
  };

  const connectionHandler = (name) => {
    if (name.length > 0) {
      canvasState.setUsername(name);
      setShow(false);
    }
  };

  return (
    <div>
      <div className="canvas">
        <NameModal show={show} handler={connectionHandler} />
        <div>
          <canvas
            onMouseDown={() => mouseDownHandler()}
            onMouseUp={mouseUpHandler}
            ref={canvasRef}
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
});

export default Canvas;
