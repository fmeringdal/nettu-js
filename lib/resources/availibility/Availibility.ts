import Resource from "../../core/Resource";
import { Guard } from "../../core/logic/Guard";
import { IUserAvailibility } from "../../core/domain/Availibility";
import { IEmployeesFilter, IAvailibilityFilter, validateEmployeesFilter } from "../../core/domain/Filters";


export interface IAvailibility {
    employees(employeesFilter: IEmployeesFilter, availibilityFilter: IAvailibilityFilter): Promise<IUserAvailibility[]>
}

export class Availibility extends Resource
    implements IAvailibility {
    async employees(employeesFilter: IEmployeesFilter, availibilityFilter: IAvailibilityFilter): Promise<IUserAvailibility[]> {

        validateEmployeesFilter(employeesFilter);

        if(!availibilityFilter){
            throw new Error("No availibilityFilter specified, this is a required filter");
        }

        Guard.againstInvalidTimestamp(availibilityFilter.startTimestampUTC);
        Guard.againstInvalidTimestamp(availibilityFilter.endTimestampUTC);
        const oneMonthInMS = 1000*60*60*24*31;
        const diff = availibilityFilter.endTimestampUTC - availibilityFilter.startTimestampUTC;
        if(diff > oneMonthInMS){
            throw new Error("Timespan is too big, maximum timespan is 31 days");
        }
        if(diff < 2){
            throw new Error("End timestamp can not be smaller that start timestamp");
        }

        return [];
    }
    
}