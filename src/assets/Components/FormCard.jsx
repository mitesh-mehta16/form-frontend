import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const FormCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [editedFormData, setEditedFormData] = useState({});

  useEffect(
    () => setFormData(JSON.parse(localStorage.getItem("formdata"))),
    []
  );

  const handleEdit = (e) => {
    // setEditedFormData({ ..., [e.target.name]: e.target.value });
    console.log("handleEdit", { editedFormData });
    setIsEditing(true);
  };

  const handleDelete = () => {
    onDelete(formDetails.id);
  };

  const handleSave = (e) => {
    setFormData(editedFormData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restore the original form data and exit the edit mode
    setFormData(formData);
    setEditedFormData(formData);
    setIsEditing(false);
  };

  const handleChange = (e, formData) => {
    console.log({ editedFormData });
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          {formData.FirstName} {formData.LastName}
        </CardTitle>
        <CardText>{formData.addressLine1}</CardText>
        <CardText>{formData.addressLine2}</CardText>
        <CardText>{formData.city}</CardText>
        <CardText>{formData.state}</CardText>
        <CardText>{formData.zipCode}</CardText>

        {isEditing ? (
          <Modal isOpen={true} toggle={handleCancel}>
            <ModalHeader>Edit Form Details</ModalHeader>
            <ModalBody>
              <input
                type="text"
                name="FirstName"
                value={editedFormData.FirstName}
                onChange={(e) => handleChange(e)}
              />
              <textarea
                name="LastName"
                value={editedFormData.LastName}
                onChange={(e) => handleChange(e)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSave}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        ) : (
          <div>
            <Button
              color="primary"
              // onClick={(e) => handleEdit(e)}
              onClick={(e) => console.log("button clicked")}
            >
              Edit
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default FormCard;
