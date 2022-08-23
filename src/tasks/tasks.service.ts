import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks: Task[] = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  //

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) throw new NotFoundException(`${id} does not exist`);
    return task;
  }

  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: 'Task-' + Math.ceil(Math.random() * 1000),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // deleteTaskById(id: string): Task {
  //   let deletedTask: Task;
  //   this.tasks = this.tasks.filter((task) => {
  //     if (task.id === id) {
  //       deletedTask = task;
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  //   if (!deletedTask) throw new NotFoundException(`${id} does not exist`);
  //   return deletedTask;
  // }
  //
  // updateTaskStatusById(id: string, status: TaskStatus): Task {
  //   let updatedTask: Task;
  //   this.tasks.forEach((task, index) => {
  //     if (task.id === id) {
  //       this.tasks[index].status = status;
  //       updatedTask = task;
  //     }
  //   });
  //   if (!updatedTask) throw new NotFoundException(`${id} does not exist`);
  //   return updatedTask;
  // }
}
