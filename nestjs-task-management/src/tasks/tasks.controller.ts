import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService,
        private logger: Logger){
            logger.setContext('TasksController');
        }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    async createTask(
        @Body() createtaskDto: CreateTaskDto
    ) : Promise<Task> {
        return this.tasksService.createTask(createtaskDto);
    }
}
