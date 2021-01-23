import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { GetTaskFilterDto } from "./dto/GetTaskFilterDto";
import { Task } from "./task.entity";
import { TaskStatus } from "./TaskStatus";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {

    const { status, search } = getTaskFilterDto;
    let query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;    
  }

}