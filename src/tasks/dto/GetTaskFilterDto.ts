import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../TaskStatus";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}