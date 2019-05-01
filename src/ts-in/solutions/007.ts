import { getPrime } from "../utility/calc";

export const TITLE: string = "Template";
export const NUMBER: number = 7;
export const USE_DATA: boolean = true;

// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
// What is the 10,001st prime number?

export function solve(): string {
    let solution: number = getPrime(10001);
    return solution.toString();
}
