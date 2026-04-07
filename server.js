const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let students = [];

function fakeDatabase(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

app.post('/students', async (req, res) => {
    try {
        const { id, name, age, course } = req.body;

        if (!id || !name || !age || !course) {
            return res.status(400).json({
                message: 'Please enter all student details'
            });
        }

        const student = { id, name, age, course };

        const savedStudent = await fakeDatabase(student);

        students.push(savedStudent);

        res.json({
            message: 'Student added successfully',
            student: savedStudent
        });

    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

app.get('/students', async (req, res) => {
    const allStudents = await fakeDatabase(students);

    res.json(allStudents);
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
