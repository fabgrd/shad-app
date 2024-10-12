import { RoutineTask } from './RoutineTask';

export type Routine = {
    id: number;
    deadline: Date;
    completed: boolean;
    tasks: RoutineTask[];
    cheatDay: boolean;
    finished: Date | null;
    cigaretteSmoked: number;
};