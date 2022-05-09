import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../../core/services/storage.service';
import { Todo } from '../todo/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly todosSubject$ = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this.todosSubject$.asObservable().pipe(
    tap((todos) => {
      // persist data with browser storage
      this.storageService.setItem('todos', JSON.stringify(todos));
    })
  );

  constructor(private storageService: StorageService) {
    //fetch todos from persisted data
    const persistedTodos = JSON.parse(
      this.storageService.getItem('todos')
    ) as Todo[];
    if (persistedTodos) {
      this.todosSubject$.next(persistedTodos);
    }
  }

  private get currentTodos() {
    return this.todosSubject$.value;
  }

  addTodo(todo: Todo) {
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  updateTodo(index: number, updatedTodo: Todo) {
    const todos = this.currentTodos;
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? updatedTodo : todo
    );
    this.todosSubject$.next(updatedTodos);
  }

  removeTodo(index: number) {
    const todos = this.currentTodos;
    const updatedTodos = todos.filter((todo, idx) => idx !== index);
    this.todosSubject$.next(updatedTodos);
  }

  sortTodosByCompleted() {
    const todos = this.currentTodos;
    const updatedTodos = todos.sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );
    this.todosSubject$.next(updatedTodos);
  }
  sortTodosByCreatedDate() {
    const todos = this.currentTodos;
    const updatedTodos = todos.sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );
    this.todosSubject$.next(updatedTodos);
  }
}
