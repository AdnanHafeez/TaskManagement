import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(getTaskFilterDto: GetTaskFilterDto): Task[] {
        const {status, search} = getTaskFilterDto;
        let tasks = this.getAllTasks();
        if(status) {
            tasks = tasks.filter(task => {
              return task.status === status
            });
        }
        if(search) {
            tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search))
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        let res : Task = this.tasks.find(task => 
            task.id === id
        );
        if(res)
            return res;
        throw new NotFoundException(`Task with id ${id} not found`);
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
