import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFolderUser } from "../../redux/actionCreators/filefoldersActionCreators";

const CreateFolder = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const dispatch = useDispatch();
  const { userId, userFolders } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual
  );

  const handleFolderSubmit = (e) => {
    e.preventDefault();
    const filteredFolders =
      currentFolder === "root folder"
        ? userFolders.filter(
            (folder) =>
              folder.data.parent === "" &&
              folder.data.name === folderName.trim()
          )
        : userFolders.filter(
            (folder) =>
              folder.data.parent === currentFolder.docId &&
              folder.data.name === folderName.trim()
          );
    if (!folderName) return toast.dark("Veuillez saisir le nom du dossier!");

    if (filteredFolders.length > 0)
      return toast.dark("Ceci est déjà présent dans le dossier");

    if (currentFolder === "root folder") {
      dispatch(addFolderUser(folderName, userId, "", []));
      setFolderName("");
      setShowModal(false);
      return;
    }

    const path =
      currentFolder.data.path.length > 0
        ? [
            ...currentFolder.data.path,
            { id: currentFolder.docId, name: currentFolder.data.name },
          ]
        : [{ id: currentFolder.docId, name: currentFolder.data.name }];
    dispatch(addFolderUser(folderName, userId, currentFolder.docId, path));
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Créer un dossier</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFolderSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder="Entrez le nom du dossier..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
              Ajouter un dossier
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2"
      >
        <FontAwesomeIcon icon={faFolderPlus} />
        &nbsp; Créer un dossier
      </Button>
    </>
  );
};

export default CreateFolder;
