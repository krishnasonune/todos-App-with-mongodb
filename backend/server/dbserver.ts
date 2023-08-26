import express, { Request, Response } from "express";
import { DBConfig } from "./dbconfig";
import { todoSchema } from "../../common/interfaces/todoSchema";
import { ObjectId } from "bson";
import cors from "cors";

const app = express();
const db = new DBConfig("todos", "items");

app.use(cors())
app.use(express.json())

app.get('/getTasks', (req : Request, res : Response) => {
    db.getAllData().then(result => {
        res.json(result);
    }).catch(e => {
        res.json(e);
    })
});

app.post('/update', (req : Request, res : Response) => {
    let todo : todoSchema = {
        "_id" : new ObjectId(req.body._id),
        "title": req.body.title,
        "priority":req.body.priority,
        "isSnoozed":req.body.isSnoozed,
        "status":req.body.status,
        "createdAt": req.body.createdAt
    };
    db.UpdateData(todo).then(result => {
        res.json(result);
    }).catch(e => {
        res.json(e);
    })
});

app.post('/insert', (req : Request, res : Response) => {
    let todo : todoSchema = {
        "title": req.body.title,
        "priority":req.body.priority,
        "isSnoozed":req.body.isSnoozed,
        "status":req.body.status,
        "createdAt": req.body.createdAt
    };
    console.log(req.body);
    
    db.insertData(todo).then(result => {
        res.json(result);
    }).catch(e => {
        res.json(e);
    })
});

app.delete('/delete/:id', (req : Request, res : Response) => {
    db.DeletedData(new ObjectId(req.params.id)).then(result => {
        res.json(result);
    }).catch(e => {
        res.json(e);
    })
});

app.listen(3000, ()=> {
    console.log("connected");
})