// Marks Module
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
const Marks = () => {
    const [marks, setMarks] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');
    const [marksValue, setMarksValue] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3000/api/marks')
        .then(response => response.json())
        .then(data => setMarks(data))
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:3000/api/marks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, teacherId, subject, marksValue }),
      })
        .then(response => response.json())
        .then(data => setMarks([...marks, data]))
        .catch(error => console.error('Error:', error));
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <h2>Marks</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Teacher Name</th>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark) => (
                  <tr key={mark._id}>
                    <td>{mark.studentId}</td>
                    <td>{mark.studentName}</td>
                    <td>{mark.teacherName}</td>
                    <td>{mark.subject}</td>
                    <td>{mark.marksValue}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h2>Create Mark</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Student ID:
                <input type="text" value={studentId} onChange={(event) => setStudentId(event.target.value)} />
              </label>
              <br />
              <label>
                Teacher ID:
                <input type="text" value={teacherId} onChange={(event) => setTeacherId(event.target.value)} />
              </label>
              <br />
              <label>
                Subject:
                <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
              </label>
              <br />
              <label>
                Marks:
                <input type="number" value={marksValue} onChange={(event) => setMarksValue(event.target.value)} />
              </label>
              <br />
              <Button type="submit">Create</Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  };
export default Marks;  