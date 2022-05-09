import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { MatCardModule } from '@angular/material/card/';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materialModules = [
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  imports: [CommonModule, materialModules, ReactiveFormsModule],
  declarations: [TodoListComponent, TodoComponent, AddTodoComponent],
  exports: [TodoListComponent, TodoComponent],
})
export class TodoListModule {}
