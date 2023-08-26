import { ObjectId } from "../../backend/node_modules/bson";

export interface todoSchema{
    _id ?: ObjectId,
    title: string,
    priority: string,
    isSnoozed: string,
    status: string,
    createdAt: string
}