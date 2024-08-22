import React, { useState, useEffect } from 'react';
import Teacher from './Component/TeacherModule';
import Student from './Component/studentModule';
import Marks from './Component/MarksModule';
import { Container, Row, Col, } from 'react-bootstrap';


const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Student />
        </Col>
      </Row>
      <Row>
        <Col>
          <Teacher />
        </Col>
      </Row>
      <Row>
        <Col>
          <Marks />
        </Col>
      </Row>
    </Container>
  );
};



export default App
