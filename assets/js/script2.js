const buttonId = document.getElementById("buttonId");
const questionId = document.getElementById("questionId");

const Q1 = [{
    question1: "What is the 4th digit?",
    options: [1,2,3,4],
    answer: 4
},
{
    question2: "What is the 4th alpha?",
    options: ['a','b',3,'d'],
    answer: 4
}
];

function handler() {
    console.log("here");
    // console.log(Q1);
    for (var i=0; i<Q1.length; i++){
        console.log(Q1[i]);
        questionId
    };
};

buttonId.addEventListener("click", handler);




