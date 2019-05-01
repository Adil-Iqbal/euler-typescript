import { getPrimeFactors } from "../utility/calc";

export const TITLE: string = "Largest prime factor";
export const NUMBER: number = 3;
export const USE_DATA: boolean = true;

// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

export function solve(): string {
    const BIG_NUMBER: number = 600851475143;
    let allPrimeFactors: number[] = getPrimeFactors(BIG_NUMBER);
    let solution = allPrimeFactors[allPrimeFactors.length - 1];
    return solution.toString();
}