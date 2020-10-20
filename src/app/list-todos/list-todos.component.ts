import {Component, OnInit} from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import {Router} from '@angular/router';

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
    this.todoService.deleteTodo('najm', id).subscribe(
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
    this.todoService.retreiveAllTodosService('najm').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }
}
