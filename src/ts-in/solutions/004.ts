import { isPalindrome } from "../utility/util";

export const TITLE: string = "Largest palindrome product";
export const NUMBER: number = 4;
export const USE_DATA: boolean = false;

// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

export function solve(): string {
    let solution: number = -Infinity;
    for (let i = 999; i >= 99; i--) {
        for (let j = 999; j >= 99; j--) {
            let product: number = i * j;
            if (isPalindrome(product)) {
                if (product > solution) {
                    solution = product;
                }
            }
        }
    }
    return solution.toString();
}