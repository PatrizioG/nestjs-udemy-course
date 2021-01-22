import { Injectable, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status == status);
        }

        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateStatusTask(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        if (task) {
            task.status = status;
            return task;
        }
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }
}
