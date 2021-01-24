import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './TaskStatus';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {

        const task = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!task)
            throw new NotFoundException();

        return task;
    }

    async deleteTask(id: number, user: User): Promise<void> {

        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0)
            throw new NotFoundException();
    }

    async updateStatusTask(id: number, status: TaskStatus, user: User): Promise<Task> {

        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;

    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }
}
