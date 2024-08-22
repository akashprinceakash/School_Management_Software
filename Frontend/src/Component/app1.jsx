// // App.js
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';

// const App = () => {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [marks, setMarks] = useState([]);
//   const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
//   const [showUpdateTeacherModal, setShowUpdateTeacherModal] = useState(false);
//   const [updateStudent, setUpdateStudent] = useState({});
//   const [updateTeacher, setUpdateTeacher] = useState({});

//   useEffect(() => {
//     // Fetch data from API or database
//     fetch('/api/students')
//       .then(response => response.json())
//       .then(data => setStudents(data));

//     fetch('/api/teachers')
//       .then(response => response.json())
//       .then(data => setTeachers(data));

//     fetch('/api/marks')
//       .then(response => response.json())
//       .then(data => setMarks(data));
//   }, []);

//   const handleUpdateStudent = (student) => {
//     setUpdateStudent(student);
//     setShowUpdateStudentModal(true);
//   };

//   const handleUpdateStudentSubmit = (event) => {
//     event.preventDefault();
//     const updatedStudent = { ...updateStudent };
//     // Update student data in API or database
//     fetch(`/api/students/${updatedStudent.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedStudent),
//     })
//       .then(response => response.json())
//       .then((data) => {
//         setStudents(students.map((student) => (student.id === data.id ? data : student)));
//         setShowUpdateStudentModal(false);
//       });
//   };

//   const handleDeleteStudent = (studentId) => {
//     // Delete student data in API or database
//     fetch(`/api/students/${studentId}`, { method: 'DELETE' })
//       .then(response => response.json())
//       .then(() => {
//         setStudents(students.filter((student) => student.id !== studentId));
//       });
//   };

//   const handleUpdateTeacher = (teacher) => {
//     setUpdateTeacher(teacher);
//     setShowUpdateTeacherModal(true);
//   };

//   const handleUpdateTeacherSubmit = (event) => {
//     event.preventDefault();
//     const updatedTeacher = { ...updateTeacher };
//     // Update teacher data in API or database
//     fetch(`/api/teachers/${updatedTeacher.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedTeacher),
//     })
//       .then(response => response.json())
//       .then((data) => {
//         setTeachers(teachers.map((teacher) => (teacher.id === data.id ? data : teacher)));
//         setShowUpdateTeacherModal(false);
//       });
//   };

//   const handleDeleteTeacher = (teacherId) => {
//     // Delete teacher data in API or database
//     fetch(`/api/teachers/${teacherId}`, { method: 'DELETE' })
//       .then(response => response.json())
//       .then(() => {
//         setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
//       });
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h2>Students</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.id}</td>
//                   <td>{student.name}</td>
//                   <td>{student.age}</td>
//                   <td>
//                     <Button variant="primary" onClick={() => handleUpdateStudent(student)}>Update</Button>
//                     <Button variant="danger" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <h2>Teachers</h2>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Subject</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teachers.map((teacher) => (
//                 <tr key={teacher.id}>
//                   <td>{teacher.id}</td>
//                   <td>{teacher.name}</td>
//                   <td>{teacher.subject}</td>
//                   <td>
//                     <Button variant="primary" onClick={() => handleUpdateTeacher(teacher)}>Update</Button>
                    