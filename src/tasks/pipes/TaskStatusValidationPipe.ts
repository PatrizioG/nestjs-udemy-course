import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../TaskStatus";

export class TaskStatusValidationPipe implements PipeTransform {

  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
  ];

  private isStatusValid(status: any)
  {
    const index = this.allowedStatus.indexOf(status);
    return index >= 0;
  }

  transform(value: any) {
    
    value = value.toUpperCase();
    
    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is an invalid status `);
    
    return value;
  }
}