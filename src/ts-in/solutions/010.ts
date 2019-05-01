import {  } from "../utility/util";
import { getPrime } from "../utility/calc";

export const TITLE: string = "Summation of primes";
export const NUMBER: number = 10;
export const USE_DATA: boolean = true;

// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

export function solve(): string {
    let solution: number = 0;
    let max: number = 2000000;
    let index: number = 1;
    let nextPrime: number = getPrime(index);
    while(nextPrime < max) {
        solution += nextPrime;
        index++;
        nextPrime = getPrime(index);
    }
    return solution.toString();
}
