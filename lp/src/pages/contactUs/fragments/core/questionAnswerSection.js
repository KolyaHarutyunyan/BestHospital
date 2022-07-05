import React, { useState } from "react";
import { Images } from "assets";

export const QuestionAnswerSection = ({ item }) => {
    const [answerIsShown, setAnswerIsShown] = useState(false);

    return (
        <div className="question-answer-card">
            <div 
                className="question-box space-between" 
                onClick={() => setAnswerIsShown(prevState => !prevState)}
            >
                <p className="question">{item.question}</p>
                <img 
                    src={answerIsShown ? Images.MinusIcon : Images.PlusIcon} 
                    alt={answerIsShown ? "minus-sign" : "plus-sign"} 
                />
            </div>
            <div className={`answer-box ${answerIsShown ? "shown" : ""}`}>
                <p className="answer">{item.answer}</p>
            </div>
        </div>
    );
};
