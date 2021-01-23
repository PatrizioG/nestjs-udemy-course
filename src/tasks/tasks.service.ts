import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './TaskStatus';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }   

    async getTaskById(id: number): Promise<Task> {

        const task = await this.taskRepository.findOne(id);

        if (!task)
            throw new NotFoundException();

        return task;
    }

    async deleteTask(id: number): Promise<void> {

        const result = await this.taskRepository.delete(id);
        if (result.affected === 0)
            throw new NotFoundException();
    }

    async updateStatusTask(id: number, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;

    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
}
