import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/GetUserDecorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { GetTaskFilterDto } from './dto/GetTaskFilterDto';
import { TaskStatusValidationPipe } from './pipes/TaskStatusValidationPipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './TaskStatus';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User
        ): Promise<Task[]> {
      return this.taskService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')    
    updateStatusTask(
        @Param('id') id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
        ) {
        return this.taskService.updateStatusTask(id, status, user);
    }

    @Post()
    @UsePipes(ValidationPipe)    
    createTask( 
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }    
}
