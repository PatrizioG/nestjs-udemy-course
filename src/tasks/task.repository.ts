import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { GetTaskFilterDto } from "./dto/GetTaskFilterDto";
import { Task } from "./task.entity";
import { TaskStatus } from "./TaskStatus";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(getTaskFilterDto: GetTaskFilterDto, user: User): Promise<Task[]> {

    const { status, search } = getTaskFilterDto;
    let query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user
    await task.save();

    delete task.user;

    return task;    
  }

}