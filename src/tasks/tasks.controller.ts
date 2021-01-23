import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { TaskStatusValidationPipe } from './pipes/TaskStatusValidationPipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './TaskStatus';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
      return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')    
    updateStatusTask(@Param('id') id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
        return this.taskService.updateStatusTask(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }    
}
