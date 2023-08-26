import { AfterViewInit, Component, OnInit } from '@angular/core';
import { todoSchema } from "../../../common/interfaces/todoSchema";
import { ServicesService } from './services/services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  todo : any;

  constructor(private service : ServicesService){}
  
  gettask(){
    this.service.getTasks().subscribe(x => {
      this.todo = x;
    },
    y => {
      console.log(y);
    })
  }

  addTodoTask(form: NgForm){
    let task : todoSchema = {
      title : form.value.title,
      priority : form.value.priority,
      status : form.value.status,
      isSnoozed : "false",
      createdAt : new Date().toLocaleTimeString()
    }
    
    this.service.addTasks(task).subscribe(
      x => {
        this.gettask();
      },
      y => {
        console.log(y);
      }
    )
  }

  deleteTask(id : string){
    this.service.deleteTasks(id).subscribe(
      x => {
        this.gettask()
      },
      y => {
        console.log(y);
      }
    )
  }

  updateTask(todo : todoSchema){
    let task : todoSchema = {
      _id : todo._id,
      title : todo.title,
      priority : todo.priority,
      status : todo.status,
      isSnoozed : "true",
      createdAt : todo.createdAt
    }

    this.service.updateTasks(task).subscribe(
      x => {
        console.log(x);
      },
      y => {
        console.log(y);
      }
    )
    this.gettask();
  }

  updateTaskstatus(todo : todoSchema, ustatus : string){
    let task : todoSchema = {
      _id : todo._id,
      title : todo.title,
      priority : todo.priority,
      status : ustatus,
      isSnoozed : todo.isSnoozed,
      createdAt : todo.createdAt
    }
    
    this.service.updateTasks(task).subscribe(
      x => {
        this.gettask();
      },
      y => {
        console.log(y);
      }
    )
  }

  ngOnInit(): void{
    this.gettask();
  }
}
