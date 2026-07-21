const Student = require("../models/Student");

async function createStudent(req, res, next) {
    try {

        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {

        next(error);

    }
}

async function getStudents(req, res, next) {
    try {        console.log("========== CONTROLLER ==========");
 console.log(req.user)
        const students = await Student.find(req.query);
       ;
        res.status(200).json(students);

    } catch (error) {

        next(error);

    }
}

async function getStudentById(req, res, next) {
    try {
        const student = await Student.findById(req.params.id);

        res.status(200).json(student);
    } catch (error) {

        next(error);

    }
}

async function updateStudent(req, res, next) {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(student);

    } catch (error) {

        next(error);

    }
}
async function updateStudentPartially(req, res, next) {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
}

async function deleteStudent(req, res, next) {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        next(error);

    }
}
module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    updateStudentPartially,
    deleteStudent
};