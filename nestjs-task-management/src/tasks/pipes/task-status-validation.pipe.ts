import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]
    transform(value: any) {
        console.log('value', value);
        let v : string = value; 
        value = v.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value} is not a valid state`);
        }
        return value;
    }

    private isStatusValid(status : any) { 
        return this.allowedStatuses.indexOf(status) !== -1;
    }
}