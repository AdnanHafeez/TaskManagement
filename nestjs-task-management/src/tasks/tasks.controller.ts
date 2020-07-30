import { Controller, Get, Post, Body, Logger, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService,
        private logger: Logger){
            logger.setContext('TasksController');
        }

    // @Get()
    // getTasks(
    //    @Query(ValidationPipe) taskFilterDto : GetTaskFilterDto): Task[] {
    //     if(Object.keys(taskFilterDto).length) {
    //         return this.tasksService.getTasksWithFilter(taskFilterDto);
    //     }
    //     else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // async createTask(
    //     @Body() createtaskDto: CreateTaskDto
    // ) : Promise<Task> {
    //     return this.tasksService.createTask(createtaskDto);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus ) : Task {
    //     console.log('Patch route triggered');
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string) : Task {
    //     return this.tasksService.deleteTaskById(id);
    // }
}
