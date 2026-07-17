const express = require("express");

const app = express();

app.use(express.json());

const students = [
    {
        id: 1,
        name: "Parthil",
        age: 22,
        course: "B.Tech IT"
    },
    {
        id: 2,
        name: "Rahul",
        age: 21,
        course: "BCA"
    },
    {
        id: 3,
        name: "Priya",
        age: 20,
        course: "BCA"
    }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);

});

app.get("/students/name/:name", (req, res) => {

    const studentName = req.params.name;

    const student = students.find((s) => s.name === studentName);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);

});

app.get("/students/course/:course", (req, res) => {

    const studentCourse = req.params.course;

    const student = students.filter((s) => s.course === studentCourse);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);

});

app.post("/students", (req, res) => {
    console.log(req.body);
    const newStudent = req.body;
    if (
        !newStudent.id ||
        !newStudent.name ||
        !newStudent.age ||
        !newStudent.course
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    students.push(newStudent);
    res.status(201).json({
        message: "Student added successfully"
    });
});

app.patch("/students/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const updatedStudent = req.body;

    const index = students.findIndex(
        (s) => s.id === studentId
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students[index] = {
        ...students[index],
        ...updatedStudent
    };

    res.json({
        message: "Student updated successfully",
        student: students[index]
    });
});


app.delete("/students/:id", (req, res) => {
const studentId = Number(req.params.id);
const index = students.findIndex(
    (s) => s.id === studentId
);
if (index === -1) {
    return res.status(404).json({
        message: "Student not found"
    });
}
students.splice(index, 1);
res.json({
    message: "Student deleted successfully"
});
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});