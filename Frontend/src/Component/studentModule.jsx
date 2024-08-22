import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';


const Student = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
  const [updateStudent, setUpdateStudent] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, contact }),
    })
      .then((response) => response.json())
      .then((data) => setStudents([...students, data]))
      .catch((error) => console.error('Error:', error));
  };

  const handleUpdateStudent = (student) => {
    setUpdateStudent(student);
    setShowUpdateStudentModal(true);
  };

  const handleUpdateStudentSubmit = (event) => {
    event.preventDefault();
    const updatedStudent = { ...updateStudent };
    fetch(`http://localhost:3000/api/students/${updatedStudent._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(students.map((student) => (student._id === data._id ? data : student)));
        setShowUpdateStudentModal(false);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteStudent = (studentId) => {
    fetch(`http://localhost:3000/api/students/${studentId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setStudents(students.filter((student) => student._id !== studentId));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Students</h2>
          <Table striped bordered hover cellSpacing={20}>
            <thead >
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student._id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleUpdateStudent(student)} className='btn btn-danger' >Update</Button>
                    <Button variant="danger" onClick={() => handleDeleteStudent(student._id)} className='btn btn-primary'>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h2>Create Student</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label>Contact:</label>
            <input type="text" value={contact} onChange={(event) => setContact(event.target.value)}  minLength="10" maxLength="10"/>
            <br />
            <Button type="submit">Create</Button>
          </form>
        </Col>
      </Row>
      <Modal show={showUpdateStudentModal} onHide={() => setShowUpdateStudentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateStudentSubmit}>
            <label>ID:</label>
            <input type="text" value={updateStudent._id} disabled />
            <br />
            <label>Name:</label>
            <input type="text" value={updateStudent.name} onChange={(e) => setUpdateStudent({ ...updateStudent, name: e.target.value })} />
            <br />
            <label>Contact:</label>
            <input type="text" value={updateStudent.contact} onChange={(e) => setUpdateStudent({ ...updateStudent, contact: e.target.value })} minLength="10" maxLength="10" />
            <br />
            <Button variant="primary" type="submit">Update</Button>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Student;
