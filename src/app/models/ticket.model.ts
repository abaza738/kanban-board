export interface ITicket {
    id: string;
    title: string;
    description?: string;
    status: TicketStatus;
    priority: Priority;
}

export enum TicketStatus {
    NEW = 1,
    IN_PROGRESS = 2,
    DONE = 3
};

export enum Priority {
    LOW = 1,
    NORMAL = 2,
    HIGH = 3,
    CRITICAL = 4
};