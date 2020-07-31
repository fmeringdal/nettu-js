import { validateEmployeesFilter } from "./Filters";
import { expectError } from "../../../test/helpers/GenericErrors";

describe('Filters', () => {

    test('It should reject invalid employee filters', () => {
        expectError(validateEmployeesFilter);
        expectError(validateEmployeesFilter, { employeesUserId: [] });
        expectError(validateEmployeesFilter, { employeesUserId: "1242112" });
        expectError(validateEmployeesFilter, { tag: "" });
    });
})