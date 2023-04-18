import type { User } from './User';

export type League = {
    id: number;
    name: string;
    members: User[];
    icon: string;
    resetDate: Date;
}