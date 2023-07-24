const express = require('express');

const router = express.Router()
const Model = require('../Model/model');

router.get("/", (req, res) => {
    res.send("anasayfadasın");
});

router.get("/studentList", async (req, res) => {
    // const std = {
    //     name: "Haydar",
    //     surname: "Dogan",
    //     age: 23
    // };

    res.header("Access-Control-Allow-Origin", "*");

    try {
        const stds = await Model.find();
        res.json(stds);
    } catch (err) {
        res.send("Hata : " + err.data);
    }
});

router.post("/addStudent", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const std = new Model({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        studentNo: req.body.studentNo
    });

    try {
        const saveStd = await std.save();
        res.send("Kayıt başarılı.");
    } catch (err) {
        res.send("Hata : " + err.data);
    }
});

router.get("/deleteStudent/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const id = req.params.id;
        await Model.findByIdAndDelete(id);
        res.json({
            isSuccess: true
        })
    } catch (err) {
        res.json({
            isSuccess: false
        })
    }
})

router.get("/getData/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        var std = await Model.findById(req.params.id);
        res.send(std)
    } catch (err) {
        console.log(err.data);
        res.send(err)
    }
})

router.post("/updateStudent/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        await Model.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            studentNo: req.body.studentNo
        })

        res.json({
            message: true
        });
    }
    catch (err) {
        res.json({
            message: false
        });
    }
})


module.exports = router;