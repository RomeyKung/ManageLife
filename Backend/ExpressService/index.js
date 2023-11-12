const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("hello ");
})

app.get("/calories/:sex/:weight/:height/:age/:activity", (req, res, error) =>{
    try {
        if(req.params.sex != "male"  &&  req.params.sex != "female" || !req.params.weight || !req.params.age || !req.params.height || !req.params.activity)
            throw Error("ข้อมูลไม่เพียงพอ")

        const bmr = req.params.sex == "male" ? 66.47 + (13.75 * req.params.weight) + (5.003 * req.params.height) - (6.755 * req.params.age) :
        655.1 + (9.563 * req.params.weight) + (1.850 * req.params.height) - (4.676 * req.params.age);

        const activity = req.params.activity;
        calories = 0;

        if (activity == "Sedentary") {
            calories = bmr * 1.2
        }
        else if(activity == "Lightly active"){
            calories = bmr * 1.375
        }
        else if(activity == "Moderately active"){
            calories = bmr * 1.55
        }
        else if(activity == "Active"){
            calories = bmr * 1.725
        }
        else if(activity == "Very active"){
            calories = bmr * 1.9
        }
        res.send(calories.toString());
    } catch (error) {
        res.status(400).json(error.toString())
    }
})

app.listen(3000, ()=> console.log("Sever start && Run in port 3000"))