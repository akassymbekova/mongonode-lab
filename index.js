const mongoose = require('mongoose');
const Student = require('./models/Student'); // Import the Student model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// CREATE - Insert multiple students
const insertStudents = async () => {
  const students = [
    { name: 'John Doe', age: 22, major: 'Computer Science', enrolled: true },
    { name: 'Jane Smith', age: 21, major: 'Mathematics', enrolled: true },
    { name: 'Mike Johnson', age: 23, major: 'Physics', enrolled: false },
  ];

  try {
    const result = await Student.insertMany(students);
    console.log('Inserted students:', result);
  } catch (err) {
    console.error('Error inserting students:', err);
  }
};

// READ - Retrieve all students
const queryStudents = async () => {
  try {
    const students = await Student.find();
    console.log('All students:', students);
  } catch (err) {
    console.error('Error fetching students:', err);
  }
};

// UPDATE - Update a specific student's information
const updateStudent = async () => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { name: 'John Doe' },
      { major: 'Software Engineering' },
      { new: true }
    );
    console.log('Updated student:', updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err);
  }
};

// DELETE - Delete a specific student
const deleteStudent = async () => {
  try {
    await Student.deleteOne({ name: 'Mike Johnson' });
    console.log('Student deleted');
  } catch (err) {
    console.error('Error deleting student:', err);
  }
};

// Run CRUD operations
const runCRUDOperations = async () => {
  await insertStudents();
  await queryStudents();
  await updateStudent();
  await deleteStudent();
  await queryStudents(); // Check remaining students after deletion
};

// Execute the operations
runCRUDOperations();
