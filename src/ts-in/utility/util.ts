import * as firebase from "firebase";
import * as fb from "./config";

export let json = undefined;

// Execute solution using stored data if needed.
export async function executeSolution(callback: any, getJSON: boolean = true): Promise < void > {
  if (getJSON) {
    console.log("Retrieving data from Firebase...");
    await firebase.initializeApp(fb.config);
    let ref = await firebase.database().ref();
    let fireOnce: boolean = true;
    await ref.on("value", async function (data: any): Promise < void > {
        if (fireOnce) {
          fireOnce = false;
          console.log("Storing local copy...");
          json = cloneData(data);
          console.log("Processing data...");
          preProcessData();
          console.log("Executing code...");
          callback();
          postProcessData();
          console.log("Saving to database...");
          await ref.set(json);
          console.log("Everything is up-to-date.");
          process.exit();
        }
      },
      function (err: any): void {
        console.error(err);
      });
  } else {
    console.log("Executing code...");
    callback();
    process.exit();
  }
}

// Return a string backwards. "ABC" to "CBA"
export function reverseString(str1: string): string {
  let str2: string = "";
  for (let i = str1.length - 1; i >= 0; i--) {
    str2 += str1[i];
  }
  return str2;
}

// Check if N is a Palindrome. 
export function isPalindrome(num: number): boolean {
  let str: string = num.toString();
  return str === reverseString(str);
}

// Flatten an N-dimensional array.
export function flatten(array: any[]): any[] {
  return array.reduce((flat, next) => {
    if (Array.isArray(next)) {
      next = flatten(next);
    }
    return flat.concat(next);
  }, []);
}

// Count occurrences of N in an array.
export function count(arr: any[], item: any): number {
  let count: number = 0;
  for (let entry of arr) {
    if (entry === item) {
      count++
    }
  }
  return count;
}

// Remove duplicate entries in an array.
export function removeDuplicates(arr: any[]): any[] {
  let newArr: any[] = [];
  for (let entry of arr) {
    if (!newArr.includes(entry)) {
      newArr.push(entry);
    }
  }
  return newArr;
}

// Returns a deep clone of the entered data.
export function cloneData(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

// Sort numerically. Use for higher order array methods.
export function numberSort(a: number, b: number) {
  return a - b;
}

// Multiply items. Use for higher order array methods.
export function reduceMult(a: number, b: number) {
  return a * b;
}

// Return a string of the N-digit problem number.
export function processProblemNumber(num: any = 1, max: number = 653): string {
  num = parseInt(num);
  if (num > max || num < 1) {
    throw `\"${num}\" is an invalid problem number. It must be an integer between 1 and ${max}`;
  }
  let maxDigitCount: number = max.toString().split("").length;
  num = num.toString().split("");
  while (num.length < maxDigitCount) {
    num.unshift("0");
  }
  return num.reduce(function (a: string, b: string): string {
    return a + b
  }, "");
}

// Parse output from process.hrTime to seconds.
export function parseHrTime(hrtime: [number, number]): string {
  return (hrtime[0] + (hrtime[1] / 1e9)).toFixed(7);
}

// Throw error if Firebase is not queried.
export function requireJSON(): void | never {
  if (json === undefined) {
    throw "Firebase data required. Set USE_DATA to true.";
  }
}

export function blankJSON(): any {
  return {
    collatz: {
      comment: "Collatz sequence lengths of corresponding array index.",
      data: [0, 1]
    },
    fibonacci: {
      comment: "Numbers calculated in the fibonacci series starting from 1.",
      data: [1, 1]
    },
    prime: {
      comment: "Prime numbers found so far.",
      data: []
    }
  };
}

function preProcessData(): void {
  requireJSON();
  console.log("Processing data...");
  json.prime.data = json.prime.data ? snapshotToArray(json.prime.data).sort(numberSort) : [];
  json.fibonacci.data = json.fibonacci.data ? snapshotToArray(json.fibonacci.data).sort(numberSort) : [1, 1];
  json.collatz.data = json.collatz.data ? snapshotToArray(json.collatz.data) : [0, 1];
}

function postProcessData(): void {
  requireJSON();
  console.log("Cleaning data...");
  json.prime.data = removeDuplicates(json.prime.data);
}

export async function clearData(propName: string, propComment: string, initialData: any[] = []): Promise < void > {
  console.log("Retrieving data from Firebase...");
  await firebase.initializeApp(fb.config);
  let ref = await firebase.database().ref();
  let fireOnce: boolean = true;
  await ref.on("value", async function (data: any): Promise < void > {
      if (fireOnce) {
        fireOnce = false;
        json = blankJSON();
        console.log("Saving data...");
        await ref.set(json);
        console.warn(`Data has been reset to its initial values.`);
        process.exit();
      }
    },
    function (err: any): void {
      console.error(err);
    });
}

export async function addToDatabase(propName: string, propComment: string, initialData: any[] = []): Promise < void > {
  console.log("Retrieving data from Firebase...");
  await firebase.initializeApp(fb.config);
  let ref = await firebase.database().ref();
  let fireOnce: boolean = true;
  await ref.on("value", async function (data: any): Promise < void > {
      if (fireOnce) {
        fireOnce = false;
        json = cloneData(data);
        preProcessData();
        json[propName] = {
          comment: propComment,
          data: initialData
        }
        console.log("Saving data...");
        await ref.set(json);
        console.warn(`The "${propName}" property has been added to the database. Please update the following functions in the 'utility\\util.ts' file to reflect this change: blankJSON, preProcessData, postProcessData`);
        process.exit();
      }
    },
    function (err: any): void {
      console.error(err);
    });
}

// Convert a floating point number to an integer.
export function int(num: number): number {
  return parseInt(num.toString());
}

export function deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}

function snapshotToArray(snapshot) {
  var returnArr = [];
  snapshot.forEach(function (childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};