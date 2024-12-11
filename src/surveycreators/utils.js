const textTemplate = {
    type: "text",
    question: "",
    isRequired: false
}

const checkBoxTemplate = {
    type: "checkbox",
    question: "question",
    choices: [
        "Item 1",
        "Item 3",
        "Item 2"
    ],
    isRequired: false
}

const radioGroupTemplate = {
    type: "radiogroup",
    question: "question1",
    choices: [
        "Item 1",
        "Item 2",
        "Item 3"
    ],
    isRequired: false
}

const dropDownTemplate = {
    type: "dropdown",
    question: "question1",
    choices: [
        "Item 1",
        "Item 2",
        "Item 3"
    ],
    isRequired: false
}



const ratingTemplate = {
    type: "rating",
    question: "question1",
    rateCount: 5,
    rateValues: [
        {
            "value": 1,
            "text": "1"
        },
        {
            "value": 2,
            "text": "2"
        },
        {
            "value": 3,
            "text": "3"
        },
        {
            "value": 4,
            "text": "4"
        },
        {
            "value": 5,
            "text": "5"
        }
    ],
    isRequired: false
}

const likertTemplate={
    type: "likert",
    question: "question1",
    rateCount: 5,
    likertType:"Strongly Disagree - Strongly Agree",
    isRequired: false
}



export const getQuestionTemplate = (type) => {
    if (type == "text") 
        return textTemplate;
    else if(type=="checkbox")
        return checkBoxTemplate
    else if(type=="radiogroup")
        return radioGroupTemplate
    else if(type=="dropdown")
        return dropDownTemplate
    else if(type=="rating")
        return ratingTemplate
    else if(type=="likert")
        return likertTemplate
}