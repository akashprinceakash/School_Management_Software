import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';

// Teacher Module
const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
  const [updateTeacher, setUpdateTeacher] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/teachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, contact }),
    })
      .then((response) => response.json())
      .then((data) => setTeachers([...teachers, data]))
      .catch((error) => console.error('Error:', error));
  };

  const handleUpdateTeacher = (teacher) => {
    setUpdateTeacher(teacher);
    setShowUpdateTeacherModal(true);
  };

  const handleUpdateTeacherSubmit = (event) => {
    event.preventDefault();
    const updatedTeacher = { ...updateTeacher };
    fetch(`http://localhost:3000/api/teachers/${updatedTeacher._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeacher),
    })
      .then((response) => response.json())
      .then((data) => {
        setTeachers(teachers.map((teacher) => (teacher._id === data._id ? data : teacher)));
        setShowUpdateTeacherModal(false);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteTeacher = (teacherId) => {
    fetch(`http://localhost:3000/api/teachers/${teacherId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Teachers</h2>
          <Table striped bordered hover cellSpacing={20}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher._id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.contact}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleUpdateTeacher(teacher)}>Update</Button>
                    <Button variant="danger" onClick={() => handleDeleteTeacher(teacher._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h2>Create Teacher</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label>Contact:</label>
            <input type="text" value={contact} onChange={(event) => setContact(event.target.value)} minLength="10" maxLength="10"/>
            <br />
            <Button type="submit">Create</Button>
          </form>
        </Col>
      </Row>
      <Modal show={showUpdateTeacherModal} onHide={() => setShowUpdateTeacherModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateTeacherSubmit}>
            <label>ID:</label>
            <input type="text" value={updateTeacher._id} disabled />
            <br />
            <label>Name:</label>
            <input type="text" value={updateTeacher.name} onChange={(e) => setUpdateTeacher({ ...updateTeacher, name: e.target.value })} />
            <br />
            <label>Contact:</label>
            <input type="text" value={updateTeacher.contact} onChange={(e) => setUpdateTeacher({ ...updateTeacher, contact: e.target.value })} minLength="10" maxLength="10"/>
            <br />
            <Button variant="primary" type="submit">Update</Button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Teacher;
