import { Component, OnInit } from "@angular/core";
import { Task } from "../model/task.model";
import { TaskService } from "../services/task.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"],
})
export class ListComponent implements OnInit {
  public items = [];
  task = {} as Task;
  tasks: Task[];
  isEditEnable : boolean = false;
  EditableIndex : any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  addTask(form: NgForm) {
      this.taskService.saveTask(this.task).subscribe(() => {
        this.getTasks();
        this.task = {} as Task;
        this.cleanForm(form);
      });
  }

  doneTask(task) {
    this.taskService.updateDoneTask(task).subscribe(() => {
      this.getTasks();
      this.task = {} as Task;
    });
}

  updateTask(form: NgForm, task) {
      this.taskService.updateTask(task).subscribe(() => {
        this.getTasks();
        this.task = {} as Task;
      });
  }

  onEdit(index) {
    this.isEditEnable = !this.isEditEnable;
    this.EditableIndex = index;
  }

  onUpdate(task) {
    this.task.id = task.id;
    this.isEditEnable = false;
    this.EditableIndex = {};
    this.updateTask(task, task);
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.task.descricao = '';
    this.task.done = false;
    this.task.titulo = '';

    this.task = {} as Task;
  }
}
