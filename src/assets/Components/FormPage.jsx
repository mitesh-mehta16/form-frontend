import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { validateName } from "../js/formValidation";
import { useState } from "react";

const FormPage = () => {
  const [formError, setFormError] = useState({
    FirstName: false,
    LastName: false,
    addressLine1: false,
    addressLine2: false,
    city: false,
    state: false,
    zipCode: false,
  });

  const [formData, setFormData] = useState({
    id: "",
    FirstName: "",
    LastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    gender: "",
  });
  const [rSelected, setRSelected] = useState(null);

  const formDataUpdate = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${key}`]: value,
    }));
    if (value == "Male") setRSelected(1);
    else if (value == "Female") setRSelected(2);
    else setRSelected(3);
  };

  const handleSubmit = async (e) => {
    formData["id"] = uuidv4();
    e.preventDefault();
    // Send form data to the Spring Boot server
    try {
      const response = await fetch("http://localhost:8081/user", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully");
      } else {
        console.error("Error submitting form data");
      }
    } catch (error) {
      console.error("Error submitting form data", error);
    }
    const emptyFormData = Object.fromEntries(
      Object.keys(formData).map((key) => [key, ""])
    );
    setFormData(emptyFormData);
    setRSelected("");
  };

  const firstNameTestRegex = "/^[a-zA-Z]+$/";
  return (
    <Form onSubmit={handleSubmit}>
      {console.log({ formData })}
      <Row>
        <Col md={6}>
          <FormGroup floating>
            <Input
              id="FirstName"
              name="FirstName"
              placeholder="Please enter your firstName here"
              type="text"
              // onBlur={(e) => formDataUpdate(e)}
              onChange={(e) => formDataUpdate(e)}
              value={formData.FirstName}
              // firstNameTestRegex.test(`${formData.FirstName}`)
            />
            <Label for="FirstName">First Name</Label>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup floating>
            <Input
              id="LastName"
              name="LastName"
              placeholder="Please enter your lastName here"
              type="text"
              // onBlur={(e) => formDataUpdate(e)}
              onChange={(e) => formDataUpdate(e)}
              value={formData.LastName}
            />
            <Label for="LastName">Last Name</Label>
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label>Gender </Label>
        <br />
        <ButtonGroup>
          <Button
            color="primary"
            outline
            name="gender"
            value="Male"
            onClick={(e) => formDataUpdate(e)}
            active={rSelected === 1}
          >
            Male
          </Button>
          <Button
            color="primary"
            outline
            name="gender"
            value="Female"
            onClick={(e) => formDataUpdate(e)}
            active={rSelected === 2}
          >
            Female
          </Button>
          <Button
            color="primary"
            outline
            name="gender"
            value="Other"
            onClick={(e) => formDataUpdate(e)}
            active={rSelected === 3}
          >
            Other
          </Button>
        </ButtonGroup>
      </FormGroup>

      <FormGroup floating>
        <Input
          id="addressLine1"
          name="addressLine1"
          placeholder="Enter first line of address"
          onChange={(e) => formDataUpdate(e)}
          value={formData.addressLine1}
        />
        <Label for="addressLine1">Address Line 1</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          id="addressLine2"
          name="addressLine2"
          placeholder="Enter second line of address"
          onChange={(e) => formDataUpdate(e)}
          value={formData.addressLine2}
        />
        <Label for="addressLine2">Address Line 2</Label>
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup floating>
            <Input
              id="city"
              name="city"
              placeholder="Enter your city here"
              type="text"
              onChange={(e) => formDataUpdate(e)}
              value={formData.city}
            />
            <Label for="city">City</Label>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup floating>
            <Input
              id="state"
              name="state"
              placeholder="Enter your state here"
              type="text"
              onChange={(e) => formDataUpdate(e)}
              value={formData.state}
            />
            <Label for="state">State</Label>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup floating>
            <Input
              id="zipCode"
              name="zipCode"
              placeholder="Enter your zipcode here"
              type="text"
              onChange={(e) => formDataUpdate(e)}
              value={formData.zipCode}
            />
            <Label for="zipCode">Zip</Label>
          </FormGroup>
        </Col>
      </Row>
      <Button>Submit</Button>
    </Form>
  );
};
export default FormPage;
