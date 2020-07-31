export interface IDateRange {
    startTimeUTC: number;
    endTimeUTC: number;
}

export interface IUserAvailibility {
    userId: string;
    events: IDateRange[]
}