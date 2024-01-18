
import { expect } from "@playwright/test";

export class Assertion {
    public static assertEqual(actual: any, expected: any): void {
        expect.soft(actual).toEqual(expected);
    }

    public static assertTrue(actual: boolean): void {
        expect.soft(actual).toBe(true);
    }

    public static assertFalse(actual: boolean): void {
        expect.soft(actual).toBe(false);
    }
}
