import { Controller, Get, Post, Body, Logger, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService,
        private logger: Logger){
            logger.setContext('TasksController');
        }

    @Get()
    getTasks(
       @Query(ValidationPipe) taskFilterDto : GetTaskFilterDto): Promise<Task[]> {
       return this.tasksService.getTasks(taskFilterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createtaskDto: CreateTaskDto,
        @GetUser() user: User,
    ) : Promise<Task> {
        return this.tasksService.createTask(createtaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus ) : Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number) : Promise<void> {
       return this.tasksService.deleteTaskById(id);
    }
}
