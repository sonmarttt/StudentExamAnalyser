import React, { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const questions = [
  {
    id: "gender",
    question: "What is your gender?",
    type: "buttons",
    options: [
      { value: "male", label: "Male", image: "/male.png" },
      { value: "female", label: "Female", image: "/female.png" },
    ],
  },
  {
    id: "race",
    question: "What is your race?",
    type: "buttons",
    options: [
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "asian", label: "Asian" },
      { value: "native", label: "Native" },
      { value: "hispanic", label: "Hispanic" },
    ],
  },
  {
    id: "parentsEducation",
    question: "What's the level of education of your parents?",
    type: "buttons",
    options: [
      { value: "bachelors", label: "Bachelor's Degree" },
      { value: "someCollege", label: "Some College" },
      { value: "masters", label: "Master's Degree" },
      { value: "associates", label: "Associate's Degree" },
      { value: "highSchool", label: "High School" },
      { value: "someHighSchool", label: "Some High School" },
    ],
  },
  {
    id: "lunchType",
    question: "What's your lunch type?",
    type: "buttons",
    options: [
      { value: "standard", label: "Standard" },
      { value: "free", label: "Free/Reduced" },
    ],
  },
  {
    id: "testPrep",
    question: "Have you prepared for the test?",
    type: "buttons",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "parentsMarital",
    question: "What's the marital status of your parents?",
    type: "buttons",
    options: [
      { value: "married", label: "Married" },
      { value: "single", label: "Single" },
      { value: "widowed", label: "Widowed" },
      { value: "divorced", label: "Divorced" },
    ],
  },
  {
    id: "sports",
    question: "How often do you practice sports?",
    type: "buttons",
    options: [
      { value: "regularly", label: "Regularly" },
      { value: "sometimes", label: "Sometimes" },
      { value: "never", label: "Never" },
    ],
  },
  {
    id: "firstBorn",
    question: "Are you a first born child?",
    type: "buttons",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "siblings",
    question: "How many siblings do you have?",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    id: "transportation",
    question: "What's your transportation means?",
    type: "buttons",
    options: [
      { value: "public", label: "Public Bus" },
      { value: "private", label: "Private Vehicle" },
    ],
  },
  {
    id: "studyTime",
    question: "How much time do you spend studying weekly?",
    type: "buttons",
    options: [
      { value: "<5", label: "Less than 5 hours" },
      { value: "5-10", label: "5-10 hours" },
      { value: ">10", label: "More than 10 hours" },
    ],
  },
  {
    id: "readingScore",
    question: "What's your average reading score?",
    type: "number",
    min: 1,
    max: 100,
  },
  {
    id: "writingScore",
    question: "What's your average writing score?",
    type: "number",
    min: 1,
    max: 100,
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (answer: string | number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeMathScore(newAnswers);
      setShowResults(true);
    }
  };

  const analyzeMathScore = (answers: Record<string, string | number>) => {
    // This is a simplified analysis. In a real application, you'd use proper ML models
    const readingScore = Number(answers.readingScore);
    const writingScore = Number(answers.writingScore);
    const studyTime = answers.studyTime;
    const testPrep = answers.testPrep;

    let predictedScore = (readingScore + writingScore) / 2;
    let struggles = [];
    let recommendations = [];

    if (studyTime === "<5") {
      predictedScore *= 0.9;
      struggles.push("Limited study time");
      recommendations.push("Increase study time to at least 5-10 hours per week");
    }

    if (testPrep === "no") {
      predictedScore *= 0.95;
      struggles.push("Lack of test preparation");
      recommendations.push("Consider enrolling in a test preparation course");
    }

    toast({
      title: "Analysis Complete",
      description: `Predicted Math Score: ${Math.round(predictedScore)}
        \nKey Struggles: ${struggles.join(", ")}
        \nRecommendations: ${recommendations.join(", ")}`,
      duration: 10000,
    });
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-text mb-8">
          Student Success Analyzer
        </h1>
        
        {!showResults ? (
          <QuestionCard
            question={questions[currentQuestion].question}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
            onNext={handleAnswer}
            options={questions[currentQuestion].options}
            type={questions[currentQuestion].type}
            min={questions[currentQuestion].min}
            max={questions[currentQuestion].max}
          />
        ) : (
          <div className="text-center">
            <Button onClick={restart} className="mt-8">
              Start New Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;