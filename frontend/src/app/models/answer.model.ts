export class Answer {

    question_id: number;
    username: string;
    survey_test_id: number;
    answers: string[];
    won_points: number;


    constructor(len: number, qid, username, sid){
        this.answers = [];
        for (var i = 0; i < len; i++){
            this.answers.push('');
        }
        this.question_id = qid;
        this.username = username;
        this.survey_test_id = sid;
    }

    
}
