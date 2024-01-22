
import { expect } from "@playwright/test";

export class Assertion {

    public static assertEqual(actual: any, expected: any, message?: string): void {
        expect.soft(actual, message).toEqual(expected);
    }

    public static assertTrue(actual: boolean, message?: string): void {
        expect.soft(actual, message).toEqual(true);
    }

    public static assertFalse(actual: boolean, message?: string): void {
        expect.soft(actual, message).toBe(false);
    }
}
