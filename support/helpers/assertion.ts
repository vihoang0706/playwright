
import { expect } from "@playwright/test";

export default class Assertion {

    public static assertEqual(actual: any, expected: any, message?: string): void {
        expect.soft(actual, message).toEqual(expected);
    }
}
