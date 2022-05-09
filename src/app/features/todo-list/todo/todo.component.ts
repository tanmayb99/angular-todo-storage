import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox/checkbox';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() set todo(todo: Todo) {
    this._todo = todo;
    this.todoNameControl.patchValue(todo.name);
    this.isCompleted && this.todoNameControl.disable();
  }
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter();
  todoNameControl = new FormControl('');
  showDelete = false;
  private _todo: Todo;

  constructor() {}

  onMouseEnter() {
    this.showDelete = true;
  }

  onMouseLeave() {
    this.showDelete = false;
  }

  ngOnInit() {}

  get isCompleted() {
    return (this._todo && this._todo.completed) || false;
  }

  get todoName() {
    return this._todo.name;
  }

  onClickRemove() {
    this.delete.emit();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.update.emit({
        ...this._todo,
        name: this.todoNameControl.value,
      });
    }
  }

  handleChange(event: MatCheckboxChange) {
    this.update.emit({
      ...this._todo,
      completed: true,
    });
  }
}
