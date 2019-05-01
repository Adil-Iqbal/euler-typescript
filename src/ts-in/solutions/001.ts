export const TITLE: string = "Multiples of 3 and 5"
export const NUMBER: number = 1;
export const USE_DATA: boolean = false;

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

export function solve(): string {
    let solution: number = 0;
    for (let i: number = 1; i < 1000; i++) {
        if (i % 3 === 0) {
            solution += i;
            continue;
        }
        if (i % 5 === 0) {
            solution += i;
        }
    }
    return solution.toString();
}