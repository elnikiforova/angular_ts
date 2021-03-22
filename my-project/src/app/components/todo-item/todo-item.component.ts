import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // Set Dymanic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-completed': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    // toggle in UI
    todo.completed = !todo.completed;
    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(`todo`, todo);
    });
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
