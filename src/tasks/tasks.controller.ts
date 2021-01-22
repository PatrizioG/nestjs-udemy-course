import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {

        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        } else {        
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatusTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.taskService.updateStatusTask(id, status);
    }

    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto ): Task {
            return this.taskService.createTask(createTaskDto);
    }    
}
