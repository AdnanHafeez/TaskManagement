import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.respository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(getTaskFilterDto: GetTaskFilterDto): Task[] {
    //     const {status, search} = getTaskFilterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = tasks.filter(task => {
    //           return task.status === status
    //         });
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search))
    //     }
    //     return tasks;
    // }
    async getTaskById(id: number) : Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) throw new NotFoundException();
        return found;
    }
    // getTaskById(id: string): Task {
    //     let res : Task = this.tasks.find(task => 
    //         task.id === id
    //     );
    //     if(res)
    //         return res;
    //     throw new NotFoundException(`Task with id ${id} not found`);
    // }
    async createTask(createtaskDto: CreateTaskDto) : Promise<Task> {
      return this.taskRepository.createTask(createtaskDto);
    }

    async deleteTaskById(id :number) : Promise<void> {
       await this.taskRepository.delete(id);
    }

    // updateTaskStatus(id: string, status: TaskStatus) : Task {
    //     let task: Task = this.getTaskById(id);
    //     if(task)
    //     {
    //         task.status = status;
    //         return task;
    //     }
    //     else {
    //         throw new NotFoundException('Task not found');
    //     }
    // }

}
