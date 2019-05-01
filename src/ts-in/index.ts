import * as answers from "./utility/answers.json";
import { TITLE, NUMBER, USE_DATA, solve } from "./solutions/014";
import { executeSolution, parseHrTime, processProblemNumber } from "./utility/util";

if (NUMBER === 0 || TITLE === "Template") {
    throw "Invalid solution import. Set appropriate NUMBER and TITLE";
}

executeSolution(function () {
    const TIME_OUT = 90000;
    let timer: any = setTimeout(function () {
        throw `TIME OUT: More than ${TIME_OUT / 1000} seconds have elapsed.`;
    }, TIME_OUT);
    const START_TIME: [number, number] = process.hrtime();
    const GIVEN_ANSWER: string = solve();
    const ELAPSED_TIME: string = parseHrTime(process.hrtime(START_TIME));
    clearTimeout(timer);
    const EVALUATION: boolean = GIVEN_ANSWER === answers[NUMBER];
    function getError(): any {
        if (EVALUATION) {
            return 0;
        }
        if (Number(answers[NUMBER]) === NaN) {
            return "NaN"
        }
        return Number(answers[NUMBER]) - Number(GIVEN_ANSWER);
    }
    const REPORT: string =
        `
============================== REPORT ==============================
    Title:           ${TITLE}
    Problem Number:  ${processProblemNumber(NUMBER)}
    Given Answer:    ${GIVEN_ANSWER}
    Evaluation:      ${EVALUATION ? "Correct" : "Wrong"}
    Error:           ${getError()}
    Elapsed Time:    ${ELAPSED_TIME} s
====================================================================
    `; 
    console.log(REPORT);
}, USE_DATA === undefined ? true : USE_DATA);

