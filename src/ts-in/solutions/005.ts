import { removeDuplicates, count, reduceMult } from "../utility/util";
import { primeComposition, PrimeExp } from "../utility/calc";

export const TITLE: string = "Smallest multiple";
export const NUMBER: number = 5;
export const USE_DATA: boolean = true;

// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

export function solve(): string {
    let solution: number | number[] = [];
    let counts: PrimeExp[] = [];
    for (let i = 1; i < 21; i++) {
        let composit: number[]|PrimeExp[] = primeComposition(i);
        if (composit.length === 0) {
            continue;
        }
        let primes: number[] = removeDuplicates(composit);
        for (let entry of primes) {
            let primeCount: PrimeExp = {
                prime: entry,
                exp: count(composit, entry)
            };
            let found: boolean = false;
            for (let j = 0; j < counts.length; j++) {
                if (counts[j].prime === primeCount.prime) {
                    counts[j].exp = Math.max(counts[j].exp, primeCount.exp);
                    found = true;
                }
            }
            if (!found) {
                counts.push(primeCount);
            }
        }
    }
    for (let i = 0; i < counts.length; i++) {
        for (let j = 0; j < counts[i].exp; j++) {
            solution.push(counts[i].prime);
        }
    }
    return solution.reduce(reduceMult).toString();
}