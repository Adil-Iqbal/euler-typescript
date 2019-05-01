import * as util from "./util";

// Get Nth number in the fibonacci sequence.
export function getFibonacci(index: number): number {
  util.requireJSON();
  if (index < util.json.fibonacci.data.length) {
    return util.json.fibonacci.data[index];
  }
  while (index >= util.json.fibonacci.data.length) {
    let a_: number = util.json.fibonacci.data.length - 1;
    let b_: number = util.json.fibonacci.data.length - 2;
    let a: number = util.json.fibonacci.data[a_];
    let b: number = util.json.fibonacci.data[b_];
    util.json.fibonacci.data.push(a + b);
  }
  return util.json.fibonacci.data[index];
}

// Return an array of all of the factors of N.
export function getFactors(num: number): number[] {
  if (num === 0) {
    throw "Zero has an infinite number of factors."
  }
  if (num % 1 !== 0) {
    throw "Factoring floating point numbers is pointless."
  }
  let isNegative: boolean = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  let factors: number[] = [1, num];
  for (let i: number = 2; i < Math.ceil(Math.sqrt(num)) + 1; i++) {
    if (num % i === 0) {
      if (!factors.includes(i)) {
        factors.push(i);
        let j: number = num / i;
        if (i !== j) {
          factors.push(j);
        }
      }
    }
  }
  if (isNegative) {
    let negFactors: number[] = [];
    for (let factor of factors) {
      negFactors.push(factor * -1);
    }
    factors = factors.concat(negFactors);
  }
  return factors.sort(util.numberSort);
}

// Test N for primality.
export function isPrime(num: number, forceSieve: boolean = false): boolean {
  util.requireJSON();
  if (num % 1 !== 0) {
    return false;
  }
  if (num < 2) {
    return false;
  }
  for (let prime of util.json.prime.data) {
    if (num < prime) {
      if (forceSieve) {
        continue;
      }
      break;
    }
    if (num === prime) {
      return true;
    }
    if (num % prime === 0) {
      return false;
    }
  }
  let factors: number[] = getFactors(num);
  if (factors.length > 2) {
    return false;
  }

  util.json.prime.data.push(num);
  return true;
}

// Return an array of prime factors of N.
export function getPrimeFactors(num: number): number[] {
  let factors: number[] = getFactors(num);
  let primeFactors: number[] = [];
  for (let factor of factors) {
    if (isPrime(factor)) {
      primeFactors.push(factor);
    }
  }
  return primeFactors.sort(util.numberSort);
}

export interface PrimeExp {
  prime: number,
    exp: number
}

// Return an array of the prime composition of N,
export function primeComposition(num: number, withExponents: boolean = false): number[] | PrimeExp[] {
  if (num < 2 || num % 1 !== 0) {
    return [];
  }
  let factors: number[] = getFactors(num);
  if (factors.length === 2) {
    return [factors[1]];
  }
  let primeComposit: any = [];
  primeComposit.push(factors[1])
  primeComposit.push(num / factors[1]);
  for (let i = 0; i < primeComposit.length; i++) {
    if (isPrime(primeComposit[i])) {
      continue;
    }
    primeComposit[i] = primeComposition(primeComposit[i], false);
  }
  let composit: number[] = util.flatten(primeComposit).sort(util.numberSort);
  if (!withExponents) {
    return composit;
  }
  let compositWithExponents: PrimeExp[] = [];
  let primes: number[] = util.removeDuplicates(composit);
  for (let entry of primes) {
    let primeCount: PrimeExp = {
      prime: entry,
      exp: util.count(composit, entry)
    };
    compositWithExponents.push(primeCount);
  }
  return compositWithExponents;
}

// Sum of all numbers from 1 to N.
export function sumOfSeries(limit: number): number {
  return limit * (limit + 1) / 2;
}

// Sum of all numbers from 1^2 to N^2.
export function sumOfSquares(limit: number): number {
  return ((2 * limit + 1) * (limit + 1) * limit) / 6;
}

// Get Nth prime number.
export function getPrime(index: number): number {
  util.requireJSON();
  index--;
  if (index > util.json.prime.data.length) {
    return util.json.prime.data[index];
  }
  let count = util.json.prime.data[util.json.prime.data.length - 1] + 1;
  while (index >= util.json.prime.data.length) {
    isPrime(count);
    count++;
  }
  return util.json.prime.data[index];
}

// Return N^2.
export function sq(num: number): number {
  return num * num;
}

// Summation of i -> n of f(x).
export function sigma(i: number, n: number, f: (x: number) => number = x => x): number {
  let num: number = 0;
  for (let x = i; x < n + 1; x++) {
    num += f(x);
  }
  return num;
}

// Return the number of divisors of N.
export function factorCount(num: number): number {
  if (num === 0) {
    return Infinity;
  }
  util.requireJSON();
  let count: number = 1;
  for (let prime of util.json.prime.data) {
    if (sq(prime) > num) {
      count *= 2;
      break;
    }
    let exponent: number = 0;
    while (num % prime === 0) {
      num /= prime;
      exponent += 1;
    }
    count *= exponent + 1;
    if (num === 1) {
      break;
    }
  }
  return count;
}