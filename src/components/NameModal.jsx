import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NameModal = ({ show, handler }) => {
  const [username, setUsername] = useState("");
  return (
    <Modal show={show} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Введите ваше имя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handler(username)}>
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NameModal;
