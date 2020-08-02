import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.respository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
    
    async getTasks(filterDto: GetTaskFilterDto) : Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number) : Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) throw new NotFoundException();
        return found;
    }

    async createTask(createtaskDto: CreateTaskDto, user: User) : Promise<Task> {
      return this.taskRepository.createTask(createtaskDto, user);
    }

    async deleteTaskById(id :number) : Promise<void> {
       const result  = await this.taskRepository.delete(id);
       if(result.affected === 0) {
           throw new NotFoundException();
       }
    }

    async updateTaskStatus(id: number, status: TaskStatus):Promise<Task> {
        let task: Task = await this.getTaskById(id);
        task.status = status;
        return await this.taskRepository.save(task);
    }

}
