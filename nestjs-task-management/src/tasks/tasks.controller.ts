import { Controller, Get, Post, Body, Logger, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService,
        private logger: Logger){
            logger.setContext('TasksController');
        }

    @Get()
    getTasks(
       @Query() taskFilterDto : GetTaskFilterDto): Task[] {
        if(Object.keys(taskFilterDto).length) {
            return this.tasksService.getTasksWithFilter(taskFilterDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
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

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus ) : Task {
        console.log('Patch route triggered');
        return this.tasksService.updateTaskStatus(id, status);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) : Task {
        return this.tasksService.deleteTaskById(id);
    }
}
