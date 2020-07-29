import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        let res : Task = this.tasks.find(task => 
            task.id === id
        );
        return res;
    }
    createTask(createtaskDto: CreateTaskDto) : Task {
        const {title, description} = createtaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id :string) : Task {
        let index = this.tasks.findIndex(task => task.id === id);
        if(index > -1) {
            return this.tasks.splice(index, 1)[0];
        } else {
            throw new NotFoundException(`ID:${id} not found`);
        }
    }

    updateTaskStatus(id: string, status: TaskStatus) : Task {
        let task: Task = this.getTaskById(id);
        if(task)
        {
            task.status = status;
            return task;
        }
        else {
            throw new NotFoundException('Task not found');
        }
    }

}
