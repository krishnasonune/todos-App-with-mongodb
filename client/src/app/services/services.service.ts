import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { todoSchema } from '../../../../common/interfaces/todoSchema';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http : HttpClient) { }

  getTasks() : Observable<any> {
    return this.http.get<any>("http://localhost:3000/getTasks").pipe(catchError(this.errorHandler));
  }

  addTasks(task : todoSchema) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/insert", task).pipe(catchError(this.errorHandler));
  }

  updateTasks(task : todoSchema) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/update", task).pipe(catchError(this.errorHandler));
  }

  deleteTasks(taskid : string) : Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/delete/${taskid}`).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
