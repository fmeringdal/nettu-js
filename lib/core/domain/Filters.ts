import { Guard } from "../logic/Guard";

export interface IEmployeesFilter {
  tag?: string;
  employeesUserId?: string[];
}

export interface IAvailibilityFilter {
  startTimestampUTC: number;
  endTimestampUTC: number;
}

export const validateEmployeesFilter = (employeesFilter: IEmployeesFilter) => {
  if (!employeesFilter) {
    throw new Error(
      "No employees filter specified. Either specify a tag or some user ids"
    );
  }

  if (!employeesFilter.tag) {
    try {
      Guard.againstEmptyOrNoneArrays(employeesFilter.employeesUserId);
    } catch (error) {
      throw new Error(
        "Bad filter specified. Either specify a tag or some user ids"
      );
    }
  }
};
