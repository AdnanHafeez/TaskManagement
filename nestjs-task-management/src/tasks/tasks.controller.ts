import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

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
    createTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ) : Task {
        this.logger.verbose(`Title:${title}`);
        this.logger.verbose(`Description:${description}`);
        return this.tasksService.createTask(title,description);
    }
}
