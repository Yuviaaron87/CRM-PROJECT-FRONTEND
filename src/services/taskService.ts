import {
  mockTasks,
} from "../data/tasks";

import type {
  Task,
  TaskFormData,
  TaskStatus,
} from "../types/taskTypes";

const STORAGE_KEY =
  "crm_tasks";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const initialize = (): Task[] => {
  const stored =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (stored) {
    try {
      return JSON.parse(
        stored
      ) as Task[];
    } catch {
      localStorage.removeItem(
        STORAGE_KEY
      );
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mockTasks)
  );

  return mockTasks;
};

const save = (
  tasks: Task[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
};

export const taskService = {
  async getAll(): Promise<
    Task[]
  > {
    await delay(400);

    return initialize();
  },

  async getById(
    id: string
  ): Promise<Task | undefined> {
    await delay(300);

    return initialize().find(
      (task) => task.id === id
    );
  },

  async create(
    data: TaskFormData
  ): Promise<Task> {
    await delay(400);

    const tasks =
      initialize();

    const task: Task = {
      id: `TASK-${Date.now()}`,

      title: data.title,

      description:
        data.description,

      type: data.type,

      status: data.status,

      priority:
        data.priority,

      dueDate:
        data.dueDate,

      dueTime:
        data.dueTime,

      assignedUserId:
        data.assignedUserId,

      leadId:
        data.leadId ||
        undefined,

      contactId:
        data.contactId ||
        undefined,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),

      completedAt:
        data.status ===
        "completed"
          ? new Date().toISOString()
          : undefined,
    };

    save([
      task,
      ...tasks,
    ]);

    return task;
  },

  async update(
    id: string,
    data: TaskFormData
  ): Promise<Task> {
    await delay(400);

    const tasks =
      initialize();

    const index =
      tasks.findIndex(
        (task) =>
          task.id === id
      );

    if (index === -1) {
      throw new Error(
        "Task not found"
      );
    }

    const oldTask =
      tasks[index];

    const task: Task = {
      ...oldTask,

      title: data.title,

      description:
        data.description,

      type: data.type,

      status: data.status,

      priority:
        data.priority,

      dueDate:
        data.dueDate,

      dueTime:
        data.dueTime,

      assignedUserId:
        data.assignedUserId,

      leadId:
        data.leadId ||
        undefined,

      contactId:
        data.contactId ||
        undefined,

      updatedAt:
        new Date().toISOString(),

      completedAt:
        data.status ===
        "completed"
          ? oldTask.completedAt ??
            new Date().toISOString()
          : undefined,
    };

    tasks[index] = task;

    save(tasks);

    return task;
  },

  async updateStatus(
    id: string,
    status: TaskStatus
  ): Promise<Task> {
    await delay(250);

    const tasks =
      initialize();

    const index =
      tasks.findIndex(
        (task) =>
          task.id === id
      );

    if (index === -1) {
      throw new Error(
        "Task not found"
      );
    }

    tasks[index] = {
      ...tasks[index],

      status,

      completedAt:
        status === "completed"
          ? new Date().toISOString()
          : undefined,

      updatedAt:
        new Date().toISOString(),
    };

    save(tasks);

    return tasks[index];
  },

  async delete(
    id: string
  ): Promise<void> {
    await delay(300);

    const tasks =
      initialize().filter(
        (task) =>
          task.id !== id
      );

    save(tasks);
  },
};