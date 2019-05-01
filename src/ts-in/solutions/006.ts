import { sumOfSeries, sumOfSquares, sq } from "../utility/calc";

export const TITLE: string = "Sum square difference";
export const NUMBER: number = 6;
export const USE_DATA: boolean = false;

// The sum of the squares of the first ten natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 552 = 3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

export function solve(): string {
    const LIMIT: number = 100;
    let solution: number = Math.abs(sq(sumOfSeries(LIMIT)) - sumOfSquares(LIMIT));
    return solution.toString();
}