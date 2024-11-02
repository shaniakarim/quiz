const questions = [
    {
        question: "When she's not around, do I find myself missing her?",
        options: [
            "A) Yes, I often wish she was here.",
            "B) Sometimes, but I don’t think about it much.",
            "C) No, I’m fine either way."
        ]
    },
    {
        question: "When she shares something important to her, how invested am I in listening?",
        options: [
            "A) I genuinely care and want to understand her.",
            "B) I listen, but sometimes it’s hard to stay focused.",
            "C) I zone out; it doesn’t seem that important."
        ]
    },
    {
        question: "Do I feel a sense of happiness or excitement when I see her?",
        options: [
            "A) Yes, every time.",
            "B) Occasionally, but it depends on my mood.",
            "C) Not really, I feel the same as with anyone else."
        ]
    },
    {
        question: "When she's upset or stressed, what’s my response?",
        options: [
            "A) I want to comfort her and help if I can.",
            "B) I try to listen, but I don’t feel strongly affected.",
            "C) I feel annoyed or want to avoid it."
        ]
    },
    {
        question: "How do I feel when I think of her with someone else?",
        options: [
            "A) I feel a pang of jealousy or protectiveness.",
            "B) It bothers me a bit, but I could handle it.",
            "C) I wouldn’t care much."
        ]
    },
    {
        question: "How much do I enjoy spending time with her?",
        options: [
            "A) I genuinely enjoy it and look forward to it.",
            "B) I don’t mind it, but I don’t go out of my way for it.",
            "C) I prefer being on my own or with others."
        ]
    },
    {
        question: "Do I find myself thinking about her and our future?",
        options: [
            "A) Yes, I can see her being a part of it.",
            "B) Maybe sometimes, but it’s not a priority.",
            "C) No, I don’t really think that far ahead."
        ]
    },
    {
        question: "When we argue, do I feel a strong urge to resolve things?",
        options: [
            "A) Yes, because I care about her feelings and our connection.",
            "B) Only if it’s serious; small issues don’t bother me much.",
            "C) Not really, I feel like moving on would be fine."
        ]
    },
    {
        question: "Do I feel comfortable being open and vulnerable with her?",
        options: [
            "A) Yes, I trust her and feel safe.",
            "B) Somewhat, but I keep certain things to myself.",
            "C) No, I feel like keeping my guard up."
        ]
    },
    {
        question: "When I think about ending things, how does it make me feel?",
        options: [
            "A) The thought is painful; I can’t imagine losing her.",
            "B) I’d feel a bit sad, but I’d get over it.",
            "C) I’d feel relieved or indifferent."
        ]
    },
    {
        question: "How often do I think about her throughout the day?",
        options: [
            "A) Constantly, she's often on my mind.",
            "B) Occasionally, but not all the time.",
            "C) Rarely, I have other things to think about."
        ]
    },
    {
        question: "When I see her with someone else, how do I feel?",
        options: [
            "A) I feel uneasy or jealous.",
            "B) I’m indifferent; it doesn’t bother me.",
            "C) I feel happy for her, no matter what."
        ]
    },
    {
        question: "Do I ever catch myself daydreaming about her?",
        options: [
            "A) Yes, I often imagine scenarios with her.",
            "B) Sometimes, but not frequently.",
            "C) No, I don’t daydream about her."
        ]
    },
    {
        question: "Do I feel lucky to have her in my life?",
        options: [
            "A) Absolutely, I appreciate her presence.",
            "B) Sometimes I do, but not always.",
            "C) Not really, I don’t think about it much."
        ]
    },
    {
        question: "Would I choose her over someone else from my past?",
        options: [
            "A) Yes, I prefer her over anyone else.",
            "B) Maybe, it would depend on the situation.",
            "C) No, I don’t feel that strongly."
        ]
    },
    {
        question: "Do I see her as someone I could settle down with?",
        options: [
            "A) Yes, I can envision a future together.",
            "B) Possibly, but I have some doubts.",
            "C) No, I don’t see that happening."
        ]
    },
    {
        question: "Am I bothered by her friendships with other guys?",
        options: [
            "A) Yes, it makes me feel insecure.",
            "B) Sometimes, but I try to trust her.",
            "C) No, I’m totally fine with it."
        ]
    },
    {
        question: "Do I think she might hurt me in the future?",
        options: [
            "A) Yes, I worry about that.",
            "B) Occasionally, but I trust her mostly.",
            "C) No, I don’t think she would."
        ]
    },
    {
        question: "Do I feel secure in our relationship?",
        options: [
            "A) Yes, I feel confident about us.",
            "B) Sometimes, but I have my doubts.",
            "C) No, I often feel insecure."
        ]
    },
];

let currentQuestionIndex = 0;
const quizForm = document.getElementById('quiz-form');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultsDiv = document.getElementById('results');

function displayQuestions() {
    quizForm.innerHTML = '';
    const endIndex = Math.min(currentQuestionIndex + 4, questions.length);
    for (let i = currentQuestionIndex; i < endIndex; i++) {
        const q = questions[i];
        const questionBlock = document.createElement('div');
        questionBlock.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
            questionBlock.innerHTML += `<label><input type="radio" name="q${i}" value="${option}">${option}</label><br>`;
        });
        quizForm.appendChild(questionBlock);
    }
    currentQuestionIndex += 4;
    nextBtn.style.display = currentQuestionIndex < questions.length ? 'block' : 'none';
    submitBtn.style.display = currentQuestionIndex >= questions.length ? 'block' : 'none';
}

nextBtn.addEventListener('click', () => {
    displayQuestions();
});

submitBtn.addEventListener('click', () => {
    const answers = {};
    questions.forEach((q, index) => {
        const answer = quizForm[`q${index}`].value;
        answers[`q${index}`] = answer;
    });
    
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = "<h2>Your Answers:</h2>";
    for (const [key, value] of Object.entries(answers)) {
        resultsDiv.innerHTML += `<p>${key}: ${value}</p>`;
    }
    
    const explanation = generateExplanation(answers);
    resultsDiv.innerHTML += `<h3>Explanation:</h3><p>${explanation}</p>`;
    quizForm.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
});

function generateExplanation(answers) {
    let score = 0;

    for (const answer of Object.values(answers)) {
        if (answer.startsWith("A)")) score += 2;
        else if (answer.startsWith("B)")) score += 1;
    }

    if (score >= 30) {
        return "You definitely have strong feelings for her! Your answers indicate a deep connection and a lot of care.";
    } else if (score >= 20) {
        return "You seem to have some feelings for her. There's a connection, but you might want to explore it further.";
    } else {
        return "You may not have strong feelings for her. It could be worth reflecting on your relationship.";
    }
}

displayQuestions();
