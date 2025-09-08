"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Type definitions
type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type Answers = {
  [key: number]: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "New Delhi",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "Who wrote the national anthem of India?",
    options: [
      "Rabindranath Tagore",
      "Bankim Chandra Chatterjee",
      "Sarojini Naidu",
      "Subhash Chandra Bose",
    ],
    answer: "Rabindranath Tagore",
  },
  {
    id: 4,
    question: "What is the chemical symbol of Gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: "Au",
  },
  {
    id: 5,
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    id: 6,
    question: "Who is known as the father of computers?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    answer: "Charles Babbage",
  },
  {
    id: 7,
    question: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    answer: "12",
  },
  {
    id: 8,
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    id: 9,
    question: "Which country won the 2011 Cricket World Cup?",
    options: ["Australia", "India", "Sri Lanka", "Pakistan"],
    answer: "India",
  },
  {
    id: 10,
    question: "Who discovered gravity?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answer: "Isaac Newton",
  },
];

const AllQuestions: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qid: number, option: string) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, q) => {
      return score + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const score = calculateScore();
  const progressPercentage =
    (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="md:max-h-[90vh] h-full overflow-y-scroll overflow-x-hidden bg-white p-4 md:p-6 relative">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-4 relative">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl pb-1 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-0">
            Knowledge Quiz
          </h1>
          <p className="text-gray-600 text-sm">
            Test your general knowledge with these 10 questions
          </p>
        </div>

        {/* Score Display */}
        {submitted && (
          <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 mb-6 text-center shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quiz Complete!
            </h2>
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score} / {questions.length}
            </div>
            <p className="text-gray-600">
              {score >= 8
                ? "Excellent work! 🎉"
                : score >= 6
                ? "Good job! 👍"
                : "Keep learning! 📚"}
            </p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto space-y-4 pb-8">
        {questions.map((q, index) => (
          <Card
            key={q.id}
            className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 gap-0"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-xl text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {q.id}
                </span>
                {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(val) => handleSelect(q.id, val)}
                value={answers[q.id] || ""}
                className="space-y-1 gap-1"
              >
                {q.options.map((opt, i) => (
                  <div key={i} className="group">
                    <div
                      className={`
                      flex items-center space-x-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer
                      ${
                        answers[q.id] === opt
                          ? "bg-blue-100 border-blue-500 shadow"
                          : "bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                      }
                      ${
                        submitted && opt === q.answer
                          ? "bg-green-100 border-green-500 shadow"
                          : ""
                      }
                      ${
                        submitted && answers[q.id] === opt && opt !== q.answer
                          ? "bg-red-100 border-red-500 shadow"
                          : ""
                      }
                    `}
                    >
                      <RadioGroupItem
                        value={opt}
                        id={`${q.id}-${i}`}
                        className="border-gray-400"
                      />
                      <Label
                        htmlFor={`${q.id}-${i}`}
                        className="text-gray-800 cursor-pointer text-base flex-1 font-medium"
                      >
                        {opt}
                      </Label>
                      {submitted && opt === q.answer && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                      {submitted &&
                        answers[q.id] === opt &&
                        opt !== q.answer && (
                          <span className="text-red-600 text-lg">✗</span>
                        )}
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {submitted && (
                <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-300">
                  <p
                    className={`text-sm font-semibold flex items-center gap-2 ${
                      answers[q.id] === q.answer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {answers[q.id] === q.answer ? (
                      <>
                        <span className="text-lg">🎉</span>
                        Correct! Well done!
                      </>
                    ) : (
                      <>
                        <span className="text-lg">💡</span>
                        The correct answer is:{" "}
                        <span className="text-green-600 font-bold">
                          {q.answer}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="w-full z-10 flex justify-center sticky bottom-0 right-0">
          <div className="relative w-fit">
            {/* Progress Bar Background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Button on top */}
            <Button
              onClick={handleSubmit}
              className="relative px-8 py-4 text-base disabled:hidden cursor-pointer mx-auto w-fit font-semibold border border-solid border-green-400 text-green-800 shadow-md transition-all duration-300 rounded-xl bg-transparent hover:bg-transparent"
              disabled={Object.keys(answers).length === 0}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      {/* Restart Button */}
      {submitted && (
        <div className="w-full z-10 flex justify-center sticky bottom-0 right-0">
          <Button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="px-6 cursor-pointer py-4 text-base font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md transition-all duration-300 hover:scale-105 rounded-xl"
          >
            Try Again
            <span className="ml-1 text-xl">🔄</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
