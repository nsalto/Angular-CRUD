import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'http://localhost:3300/api/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) {  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

  getTaskByTitle(title:any): Observable<any> {
    return this.http.get(baseUrl+"/taskByTitle/"+`${title}`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateTask(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteTask(id: any): Observable<any> {
    console.log(id)
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
