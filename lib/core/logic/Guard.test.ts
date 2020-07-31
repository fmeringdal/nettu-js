import { expectError } from "../../../test/helpers/GenericErrors"
import { Guard } from "./Guard"
import { detailed } from "yargs-parser";

describe('Guard', () => {
    test('it should throw on invalid timestamps', () => {
        expectError(Guard.againstInvalidTimestamp);
        expectError(Guard.againstInvalidTimestamp, -1);
        expectError(Guard.againstInvalidTimestamp, 0);
        expectError(Guard.againstInvalidTimestamp, "124412");
        expectError(Guard.againstInvalidTimestamp, "s");
        expectError(Guard.againstInvalidTimestamp, null);
        expectError(Guard.againstInvalidTimestamp, new Date()+"s");
        expectError(Guard.againstInvalidTimestamp, 999999999999999);
    });

    test('it should not throw on valid timestamps', () => {
        Guard.againstInvalidTimestamp(new Date().getTime());
    });

    test('it should throw on values that are not array or is empty', () => {
        expectError(Guard.againstEmptyOrNoneArrays);
        expectError(Guard.againstEmptyOrNoneArrays, -1);
        expectError(Guard.againstEmptyOrNoneArrays, 0);
        expectError(Guard.againstEmptyOrNoneArrays, "124412");
        expectError(Guard.againstEmptyOrNoneArrays, "s");
        expectError(Guard.againstEmptyOrNoneArrays, null);
        expectError(Guard.againstEmptyOrNoneArrays, new Date()+"s");
        expectError(Guard.againstEmptyOrNoneArrays, 999999999999999);
        expectError(Guard.againstEmptyOrNoneArrays, []);
    });

    test('it should not throw on value that is array and is not empty', () => {
        Guard.againstEmptyOrNoneArrays([1, 2]);
        Guard.againstEmptyOrNoneArrays([1]);
        Guard.againstEmptyOrNoneArrays(['s']);
    });
})