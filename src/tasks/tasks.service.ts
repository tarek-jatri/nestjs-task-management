import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks: Task[] = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: 'Task-' + Math.ceil(Math.random() * 1000),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): Task {
    let deletedTask: Task;
    this.tasks = this.tasks.filter((task) => {
      if (task.id === id) {
        deletedTask = task;
        return false;
      } else {
        return true;
      }
    });
    return deletedTask;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    let updatedTask: Task;
    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        this.tasks[index].status = status;
        updatedTask = task;
      }
    });
    return updatedTask;
  }
}
