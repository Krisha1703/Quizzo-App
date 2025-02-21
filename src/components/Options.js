import React from "react";

const Option = ({ text, isAnswered, selectedAnswer, correctAnswer, onClick, disabled }) => {
  const getBgColor = () => {
    if (isAnswered) {
      if (selectedAnswer === text) {
        return text === correctAnswer ? "bg-green-500" : "bg-red-500";
      }
    }
    return "";
  };

  return (
    <div
      className={`p-4 font-semibold text-xl text-center border w-full md:w-1/2 cursor-pointer rounded-md 
        ${getBgColor()} 
        ${disabled ? "cursor-not-allowed" : "hover:bg-gradient-to-r from-primary to-secondary hover:text-white"}`}
      onClick={() => !disabled && onClick(text)}
    >
      {text}
    </div>
  );
};

const Options = ({ options, onOptionClick, isAnswered, selectedAnswer, correctAnswer, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-5/6 md:w-1/2 gap-4">
        <Option text={options[0]} isAnswered={isAnswered} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} onClick={onOptionClick} disabled={disabled} />
        <Option text={options[1]} isAnswered={isAnswered} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} onClick={onOptionClick} disabled={disabled} />
      </div>
      <div className="flex w-5/6 md:w-1/2 gap-4">
        <Option text={options[2]} isAnswered={isAnswered} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} onClick={onOptionClick} disabled={disabled} />
        <Option text={options[3]} isAnswered={isAnswered} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} onClick={onOptionClick} disabled={disabled} />
      </div>
    </div>
  );
};

export default Options;
