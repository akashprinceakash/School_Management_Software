import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
// Teacher Module
const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3000/api/teachers')
        .then(response => response.json())
        .then(data => setTeachers(data))
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:3000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contact }),
      })
        .then(response => response.json())
        .then(data => setTeachers([...teachers, data]))
        .catch(error => console.error('Error:', error));
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <h2>Teachers</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher._id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.contact}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h2>Create Teacher</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <br />
              <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <br />
              <label>
                Contact:
                <input type="text" value={contact} onChange={(event) => setContact(event.target.value)} />
              </label>
              <br />
              <Button type="submit">Create</Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Teacher;