import {Component, OnInit} from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import {Router} from '@angular/router';
import {AUTHENTICATED_USER} from '../app.constants';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  message: string;

  constructor(
    private  todoService: TodoDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.refreshTodos();
  }

  deleteTodo(id): void {
    this.todoService.deleteTodo(sessionStorage.getItem(AUTHENTICATED_USER), id).subscribe(
      response => {
        console.log(response);
        this.message = `Todo ${id} deleted Successfully !`;
        this.refreshTodos();
      }
    );
  }

  updateTodo(id): void {
    this.router.navigate(['todos', id]);
  }

  refreshTodos(): void {
    this.todoService.retreiveAllTodosService(sessionStorage.getItem(AUTHENTICATED_USER)).subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  addTodo(): void {
    this.router.navigate(['todos', -1]);
  }
}
