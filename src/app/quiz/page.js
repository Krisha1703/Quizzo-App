//Quiz Page
"use client";
import React, { useState, useEffect } from "react";
import Menus from "@/components/quiz/quiz-menus";
import Options from "@/components/quiz/options";
import Images from "@/components/homepage/bg-images";
import Modal from "@/components/quiz/result-modal";

const QuizPage = () => {
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [attempts, setAttempts] = useState(1); 
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [progress, setProgress] = useState([]);

  //Fetches API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/quiz");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          setProgress(new Array(data.length).fill("bg-gray-300"));
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuestions();
  }, []);

  //Updates timer and progress
  useEffect(() => {
    if (timer === 0 && !isAnswered) {
      setShowNext(true);
      updateProgress(currentQuestionIndex, "bg-red-500"); 
    }
    if (!isAnswered && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isAnswered]);

  //Update dot progress
  const updateProgress = (index, color) => {
    setProgress((prev) => {
      const updatedProgress = [...prev];
      updatedProgress[index] = color;
      return updatedProgress;
    });
  };

  //Handle option selecting
  const handleOptionClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;
      setCorrectAnswer(isCorrect);
      setIsAnswered(true);
      setShowNext(true);
  
      if (isCorrect) {
        setScore(score + 10);
        setCorrectCount(correctCount + 1);
        updateProgress(currentQuestionIndex, "bg-green-500");
      } else {
        setMistakeCount(mistakeCount + 1);
        updateProgress(currentQuestionIndex, "bg-red-500");
      }
    }
  };
  
  //Handle next question
  const handleNext = () => {
    if (!isAnswered) {
      setUnansweredCount(unansweredCount + 1);
      updateProgress(currentQuestionIndex, "bg-red-500");
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      setShowNext(false);
    } else {
      setShowModal(true);
    }
  };
  
  //Handle retry, attempts increase as retry clicked
  const handleRetry = () => {
    setAttempts(attempts + 1); 
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimer(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setShowModal(false);
    setProgress(new Array(questions.length).fill("bg-gray-300")); 
  };

  //Shows the result summary modal
  if (showModal) {
    return <Modal 
              score={((correctCount / questions.length) * 100).toFixed(0)}
              totalQuestions={questions.length}
              correctCount={correctCount}
              mistakeCount={mistakeCount}
              unansweredCount={unansweredCount} 
              onRetry={handleRetry} 
              onClose={() => setShowModal(false)}
            />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <Images />
      <div className="pt-[12vh]">
        <Menus timer={timer} score={score} attempts={attempts} />
        
        {/*Question and Options*/}
        <h1 className="font-semibold text-2xl text-center m-4 my-5">
          Q{currentQuestionIndex + 1} {currentQuestion?.question}
        </h1>

        <Options
          options={currentQuestion.options}
          onOptionClick={handleOptionClick}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
          disabled={disabled}
        />

        {/* Progress Dots */}
        <div className="flex justify-center mt-4">
          {progress.map((bgColor, index) => (
            <div
              key={index}
              className={`w-4 h-4 mx-1 rounded-full ${index === currentQuestionIndex ? "bg-yellow-500" : bgColor}`}
            ></div>
          ))}
        </div>

        {/* Explanation and Next Button */}
        {showNext && (
          <div className="text-center mt-5">
            {correctAnswer === false || timer == 0 && <p className="text-red-500">{currentQuestion.explanation}</p>}
            <button
              onClick={handleNext}
              className="p-2 bg-primary md:w-1/12 w-1/2 text-xl font-semibold hover:bg-secondary text-white rounded-md mt-2"
            >
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
