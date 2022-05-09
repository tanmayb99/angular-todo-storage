import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoService } from './services/todo.service';
import { Todo } from './todo/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  private addTodoActionSubject$ = new BehaviorSubject<Todo>(undefined);
  addTodoAction$ = this.addTodoActionSubject$.asObservable().pipe(
    map((todo) => {
      this.todoService.addTodo(todo);
      return this.todoService.todos$;
    })
  );

  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit() {}

  onClickAdd() {
    const dialogRef = this.dialog.open(AddTodoComponent, {});

    dialogRef.afterClosed().subscribe((event: { name: string }) => {
      if (event && event.name.length) {
        this.addTodo({
          name: event.name,
          completed: false,
          created: new Date().toISOString(),
        });
      }
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }

  handleRemoveTodo(index: number) {
    this.todoService.removeTodo(index);
  }

  handleMarkAsComplete(event: Todo, index: number) {
    this.todoService.updateTodo(index, event);
  }

  sortTodosByCreatedDate() {
    this.todoService.sortTodosByCreatedDate();
  }
  sortTodosByCompletion() {
    this.todoService.sortTodosByCompleted();
  }
}
