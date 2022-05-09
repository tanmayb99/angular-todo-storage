import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddTodoComponent>) {}
  todoName = new FormControl('', [Validators.required]);
  ngOnInit() {}

  onKeyPress(event: KeyboardEvent) {
    if (this.isEnterKeyPressed(event)) {
      this.onClickAdd();
    }
  }

  isEnterKeyPressed(event: KeyboardEvent) {
    return event.code === 'Enter';
  }

  onClickAdd() {
    if (this.todoName.value.length) {
      this.dialogRef.close({
        name: this.todoName.value,
      });
    }
  }
}
