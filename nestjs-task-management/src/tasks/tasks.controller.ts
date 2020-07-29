import { Controller, Get, Post, Body, Logger, Param, Delete } from '@nestjs/common';
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

    @Get('/:id')
    getTaskById(@Param('id') id: string ) : Task {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    async createTask(
        @Body() createtaskDto: CreateTaskDto
    ) : Promise<Task> {
        return this.tasksService.createTask(createtaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) : Task {
        return this.tasksService.deleteTaskById(id);
    }
}
