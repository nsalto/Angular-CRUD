import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  data: string = '';
  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  title = '';
  task: Task = {
    title: '',
    description: '',
  };
  submitted = false;
  message = '';

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.retrieveTasks()
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
 }

  retrieveTasks(): void {
    this.taskService.getAllTasks()
      .subscribe(
        data => {
          this.tasks = data;
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  searchTask(event:any) {
    const title = event.target.value
    console.log(title);
    
    this.taskService.getTaskByTitle(title)
      .subscribe(
        response => {
          console.log(response);
          this.tasks = [response];
        },
        error => {
          console.log(error);
        })
  };

  saveTask(): void {
    const data = {
      title: this.task.title,
      description: this.task.description
    };

    this.taskService.createTask(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  };

  updateTask(): void {
    this.message = '';
    console.log('Current Selected', this.currentTask._id)
    console.log('Task', this.task)
    this.taskService.updateTask(this.currentTask._id, this.task)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'La tarea se editó correctamente';
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  deleteTask(task:Task): void {
    console.info(task)
    this.taskService.deleteTask(task._id)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }


  newTask(): void {
    this.submitted = false;
    this.task = {
      title: '',
      description: '',
    };
  }

}
