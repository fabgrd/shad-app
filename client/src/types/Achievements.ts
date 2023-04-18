export type Achievement = {
    id: number;
    title: string;
    total: number;
    description: string;
    completed: boolean;
    progress: number;
    icon: string;
    completedDate: Date | null;
};