const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
app.use(cors())
mongoose.connect('mongodb://localhost:27017/school-management-software', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Define models
const studentSchema = new mongoose.Schema({
  name: String,
  id: Number,
  email: String,
  contact: String,
});

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
});

const markSchema = new mongoose.Schema({
  studentId: String,
  teacherId: String,
  subject: String,
  marksValue: Number,
});
// netstat -ano | findstr :3000 taskkill /PID <PID> /F  terminates port number



const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Mark = mongoose.model('Mark', markSchema);

// API routes
// Students API
app.get('/api/students', async (req, res) => {
  const students = await Student.find().limit(10);
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.get('/api/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

app.put('/api/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

app.delete('/api/students/:id', async (req, res) => {
  try{
    const studentId = req.params._id;
 const result= await Student.dea(studentId);
  res.send(result);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// Teachers API
app.get('/api/teachers', async (req, res) => {
  const teachers = await Teacher.find().limit(10);
  res.json(teachers);
});




app.post('/api/teachers', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
});

app.get('/api/teachers/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.json(teacher);
});

app.put('/api/teachers/:id', async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(teacher);
});

app.delete('/api/teachers/:id', async (req, res) => {
  await Teacher.findByIdAndRemove(req.params.id);
  res.json({ message: 'Teacher deleted successfully' });
});

// Marks API
app.get('/api/marks', async (req, res) => {
  const marks = await Mark.find().limit(10);
  res.json(marks);
});

app.post('/api/marks', async (req, res) => {
  const mark = new Mark(req.body);
  await mark.save();
  res.json(mark);
});

app.get('/api/marks/:id', async (req, res) => {
  const mark = await Mark.findById(req.params.id);
  res.json(mark);
});

app.put('/api/marks/:id', async (req, res) => {
  const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(mark);
});

app.delete('/api/marks/:id', async (req, res) => {
  await Mark.findByIdAndRemove(req.params.id);
  res.json({ message: 'Mark deleted successfully' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});