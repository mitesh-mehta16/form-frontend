import { useEffect, useState } from "react";
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
const ListForms = () => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormData, setEditedFormData] = useState({});
  const [currentlyEditingFormData, setCurrentlyEditingFormData] = useState({});
  useEffect(() => {
    fetch("http://localhost:8081/user/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleEdit = (data) => {
    setIsEditing(true);
    setCurrentlyEditingFormData(data);
  };

  const handleDelete = (id) => {
    console.log(id);
    setData(data.filter((formData) => !(formData.id == id)));

    try {
      const response = fetch(`http://localhost:8081/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const handleSave = () => {
    const dataIndex = findIndexByKey(data, currentlyEditingFormData);

    setData((data) => {
      const newData = [...data];
      newData[dataIndex] = currentlyEditingFormData;
      return newData;
    });

    try {
      const response = fetch(
        `http://localhost:8081/user/${currentlyEditingFormData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentlyEditingFormData),
        }
      );

      if (response.ok) {
        console.log("Data updated successfully");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }

    setIsEditing(false);
    setCurrentlyEditingFormData({});
  };

  const findIndexByKey = (array, edited) => {
    return array.findIndex((item) => edited.id === item.id);
  };

  const handleCancel = () => {
    // Restore the original form data and exit the edit mode
    setFormData(formData);
    setEditedFormData(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    // setEditedFormData({ ...userFormData, [e.target.name]: e.target.value });
    setCurrentlyEditingFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {!data
          ? console.log("no data")
          : data.map((formData) => {
              return (
                <Card key={formData.id}>
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
                            value={currentlyEditingFormData.FirstName}
                            onChange={handleChange}
                          />
                          <textarea
                            name="LastName"
                            value={currentlyEditingFormData.LastName}
                            onChange={handleChange}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={handleSave}>
                            Save
                          </Button>
                          <Button color="secondary" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    ) : (
                      <div>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(formData)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => handleDelete(formData.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
        {/* {console.log(data)} */}
      </div>
    </>
  );
};

export default ListForms;
