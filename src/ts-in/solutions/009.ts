import { int } from "../utility/util";
import { sq } from "../utility/calc";

export const TITLE: string = "Special Pythagorean triplet";
export const NUMBER: number = 9;
export const USE_DATA: boolean = false;

// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
// a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product a * b * c.

export function solve(): string {
    let solution: number;
    let s: number = 1000;
    let minA: number = 3;
    let maxA: number = int(Math.ceil((s - 3) / 3));
    for(let a = minA; a < maxA + 1; a++) {
        let sMinusA: number = s - a;
        let aSqOverSMinusA: number = sq(a) / sMinusA;
        let b: number = int((sMinusA - aSqOverSMinusA) / 2);
        let c: number = int((sMinusA + aSqOverSMinusA) / 2);
        let pythagoreanRule: boolean = (sq(a) + sq(b) === sq(c));
        let inequalityRule: boolean = (a < b && b < c);
        if (pythagoreanRule && inequalityRule) {
            solution = a * b * c;
            break;
        }
    }
    return solution.toString();
}
