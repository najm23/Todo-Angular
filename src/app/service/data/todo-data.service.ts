import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from '../../list-todos/list-todos.component';
import {TODO_JPA_API_URL} from '../../app.constants';


@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) {
  }


  retreiveAllTodosService(userName): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${userName}/todos`);
  }

  deleteTodo(userName, id): Observable<void> {
    return this.http.delete<void>(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`);
  }

  retreiveTodo(userName, id): Observable<Todo> {
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`);
  }

  updateTodo(userName, todo): Observable<Todo> {
    return this.http.put<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${todo.id}`, todo);
  }

  createTodo(userName, todo): Observable<Todo> {
    return this.http.post<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos`, todo);
  }
}
