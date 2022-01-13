const express = require('express')
const { ObjectID, ObjectId } = require('mongodb')
var cron = require('node-cron');


const app = express();

app.get("/", (req, res) => res.send("Hello Time Scheduler"))

const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://arif123:arif123@cluster0.xsirj.mongodb.net/smartAttendence?retryWrites=true&w=majority`;
const uri = `mongodb+srv://suny:Password6251420@collegemanagement.vwy82.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

    const database = client.db("collegeManagement");
    const studentsCollection = database.collection("students");

    // const get = studentsCollection.find({});
    // const male = get.filter({ gender: 'Male' });
    // console.log(male.length)

    cron.schedule('10 12 * * *', async () => {
        // Computer Department
        const cmt_A_present_members_today = studentsCollection.find({dept: 'Computer', section: 'A'});
        const cmt_B_present_members_today = studentsCollection.find({dept: 'Computer', section: 'B'});
        const cmt_A_absent_members_today = (80 - await ((await cmt_A_present_members_today.toArray()).length))

        console.log(cmt_A_absent_members_today)
        // const cmt_A_males = studentsCollection.find({ gender: 'Male' });
        // const cmt_A_females = studentsCollection.find({ gender: 'Female' });

        // const male = await males.toArray();
        // const female = await females.toArray();
        // const cmt_A_Total_member = await cmt_A_Total_members.toArray();


        // const female = await studentsCollection.filter({gender: 'Female'});
        // const departmentAndSection_A = await studentsCollection.filter({dept: 'Computer', section: 'A'});
        // const departmentAndSection_B = await studentsCollection.filter({dept: 'Computer', section: 'B'});
        // students = await get.toArray();
        // console.log(male.length, female.length, cmt_A_Total_member.length);
        // console.log(female.length);
        // console.log(departmentAndSection_A.length);
        // console.log(departmentAndSection_B.length);
        // res.send(students);
        // console.log("Found all students", students);
    })

    app.get("/students", async (req, res) => {
        console.log(req.query);
        const get = studentsCollection.find({});
        console.log("Request to find students");
        students = await get.toArray();
        // res.send(students);
        console.log("Found all students", students);
    });
    console.log("Database Connected")

});

const port = 4000;
app.listen(process.env.PORT || port)