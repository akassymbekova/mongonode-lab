const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.post('/students', async (req, res) => {
  const { name, age, major, enrolled } = req.body;

  const newStudent = new Student({
    name,
    age,
    major,
    enrolled,
  });

  try {
    const result = await newStudent.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: 'Error creating student', error: err });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching students', error: err });
  }
});

app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, major, enrolled } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, major, enrolled },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: 'Error updating student', error: err });
  }
});

app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting student', error: err });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
