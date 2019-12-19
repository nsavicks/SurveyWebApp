export class StringWraper{

    value: string;
    constructor(val){
        this.value = val;
    }
  }

export class Question {
    id: number;
    text: string;
    solutions: string;
    type: number;
    labels:string[];
    correct: string[];
    points: number;

    labelsWrapper: StringWraper[];
    correctWrapper: StringWraper[];
}
