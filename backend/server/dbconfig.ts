import { Collection, MongoClient, ObjectId } from "mongodb";
import { todoSchema } from "../../common/interfaces/todoSchema";
import { environment } from "../environment/environment";

export class DBConfig{
    client : MongoClient;
    coll : Collection;
    constructor(database : string, collection : string) {
        this.client = new MongoClient(environment.mongodb);
        this.client.connect();
        let dbase = this.client.db(database);
        this.coll = dbase.collection(collection);
    }

    async getAllData() {
        return await this.coll.find({}).toArray();
    }

    async insertData(todo : todoSchema) {
        return await this.coll.insertOne({
            "title" : todo.title,
            "status" : todo.status,
            "isSnoozed" : todo.isSnoozed,
            "priority" : todo.priority,
            "createdAt" : todo.createdAt
        });
    }

    async UpdateData(todo : todoSchema) {
        return await this.coll.updateOne({"_id" : todo._id}, {$set : {
            "title" : todo.title,
            "status" : todo.status,
            "isSnoozed" : todo.isSnoozed,
            "priority" : todo.priority
        }});
    }

    async DeletedData(todo_id : ObjectId) {
        return await this.coll.deleteOne({"_id" : todo_id});
    }
}