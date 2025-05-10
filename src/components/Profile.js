import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";

export default function Profile({ userData }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(true);

  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "", // Added address
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword)
      newErrors.newPassword = "New password is required";
    else if (passwordData.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!profileData.name.trim()) newErrors.name = "Full name is required";
    if (!profileData.email.trim()) newErrors.email = "Email is required";
    if (!profileData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!profileData.address.trim()) newErrors.address = "Address is required";
    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleSubmitProfileUpdate = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
            justify
          >
            <Tab eventKey="profile" title="Profile Information">
              <Row>
                <Col md={3} className="text-center mb-4">
                  <div
                    className="bg-light rounded-circle p-4 mx-auto"
                    style={{ width: 120, height: 120 }}
                  >
                    <i className="bi bi-person-circle fs-1 text-primary"></i>
                  </div>
                  <Button
                    variant="outline-primary"
                    className="rounded-pill mt-3"
                  >
                    <i className="bi bi-camera me-2"></i>
                    Change Photo
                  </Button>
                </Col>

                <Col md={9}>
                  <h4 className="mb-4">
                    {isEditing ? "Edit Profile" : "Profile Information"}
                  </h4>

                  {successMessage && (
                    <Alert
                      variant="success"
                      dismissible
                      onClose={() => setSuccessMessage("")}
                    >
                      {successMessage}
                    </Alert>
                  )}

                  {isEditing ? (
                    <Form onSubmit={handleSubmitProfileUpdate}>
                      <FloatingLabel
                        controlId="name"
                        label="Full Name"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          isInvalid={!!profileErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {profileErrors.name}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="email"
                        label="Email Address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          isInvalid={!!profileErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {profileErrors.email}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="address"
                        label="Address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          isInvalid={!!profileErrors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {profileErrors.address}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <FloatingLabel
                        controlId="phone"
                        label="Phone Number"
                        className="mb-4"
                      >
                        <Form.Control
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          isInvalid={!!profileErrors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {profileErrors.phone}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                      <div className="d-grid">
                        <Button
                          type="submit"
                          variant="primary"
                          className="rounded-pill"
                        >
                          <i className="bi bi-save me-2"></i>
                          Update Profile
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <p>
                        <strong>Name:</strong> {profileData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {profileData.email}
                      </p>
                      <p>
                        <strong>Address:</strong> {profileData.address}
                      </p>
                      <p>
                        <strong>Phone:</strong> {profileData.phone}
                      </p>
                      <Button
                        variant="outline-secondary"
                        className="rounded-pill mt-2"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit Profile
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="password" title="Change Password">
              <Row className="justify-content-center mt-4">
                <Col md={8}>
                  {successMessage && (
                    <Alert
                      variant="success"
                      dismissible
                      onClose={() => setSuccessMessage("")}
                    >
                      {successMessage}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmitPasswordChange}>
                    <FloatingLabel
                      controlId="currentPassword"
                      label="Current Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        isInvalid={!!errors.currentPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.currentPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="newPassword"
                      label="New Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Minimum 8 characters
                      </Form.Text>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="confirmPassword"
                      label="Confirm New Password"
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-pill"
                      >
                        <i className="bi bi-shield-lock me-2"></i>
                        Change Password
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
}
