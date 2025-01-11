import React, { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Heart, Book, Battery, Activity, Clock, Brain } from "lucide-react";

const questions = [
  {
    id: "gender",
    question: "What is your gender?",
    type: "buttons",
    options: [
      { value: "male", label: "Male", image: "gender-male" },
      { value: "female", label: "Female", image: "gender-female" },
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
  const [analysis, setAnalysis] = useState<{
    predictedScore: number;
    struggles: string[];
    recommendations: {
      category: string;
      items: string[];
      icon: React.ReactNode;
    }[];
  } | null>(null);

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
    const readingScore = Number(answers.readingScore);
    const writingScore = Number(answers.writingScore);
    const studyTime = answers.studyTime;
    const testPrep = answers.testPrep;
    const sports = answers.sports;
    const lunchType = answers.lunchType;

    let predictedScore = (readingScore + writingScore) / 2;
    let struggles = [];
    let recommendations = [];

    // Study Habits Category
    if (studyTime === "<5") {
      predictedScore *= 0.9;
      struggles.push("Limited study time");
      recommendations.push({
        category: "Study Habits",
        icon: <Clock className="w-6 h-6 text-primary" />,
        items: [
          "Try to increase your study time gradually to 5-10 hours per week",
          "Break your study sessions into smaller, manageable chunks",
          "Use a study planner to organize your time effectively",
        ],
      });
    }

    // Test Preparation
    if (testPrep === "no") {
      predictedScore *= 0.95;
      struggles.push("Lack of test preparation");
      recommendations.push({
        category: "Test Preparation",
        icon: <Book className="w-6 h-6 text-primary" />,
        items: [
          "Consider enrolling in a test preparation course",
          "Practice with past exam papers to familiarize yourself with the format",
          "Join a study group to share knowledge and stay motivated",
        ],
      });
    }

    // Physical Well-being
    if (sports === "never") {
      struggles.push("Limited physical activity");
      recommendations.push({
        category: "Physical Well-being",
        icon: <Activity className="w-6 h-6 text-primary" />,
        items: [
          "Try to incorporate light exercise into your daily routine",
          "Take short walks between study sessions to refresh your mind",
          "Remember that physical activity helps improve concentration and memory",
        ],
      });
    }

    // Energy and Nutrition
    if (lunchType === "free") {
      recommendations.push({
        category: "Energy and Nutrition",
        icon: <Battery className="w-6 h-6 text-primary" />,
        items: [
          "Make sure to eat regular, nutritious meals to maintain energy levels",
          "Stay hydrated throughout the day",
          "Consider healthy snacks during study sessions",
        ],
      });
    }

    // Mental Well-being
    recommendations.push({
      category: "Mental Well-being",
      icon: <Heart className="w-6 h-6 text-primary" />,
      items: [
        "Take regular breaks to avoid burnout",
        "Practice stress-management techniques",
        "Remember that everyone learns differently - find what works best for you",
      ],
    });

    setAnalysis({
      predictedScore: Math.round(predictedScore),
      struggles,
      recommendations,
    });
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-title mb-8">
          Student Success Analyzer
        </h1>
        
        {!showResults ? (
          <QuestionCard
            question={questions[currentQuestion].question}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
            onNext={handleAnswer}
            options={questions[currentQuestion].options}
            type={questions[currentQuestion].type as "buttons" | "number" | "text"}
            min={questions[currentQuestion].min}
            max={questions[currentQuestion].max}
          />
        ) : (
          <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-white/80 backdrop-blur shadow-lg">
            <h2 className="text-2xl font-semibold text-title mb-6">Analysis Results</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Predicted Math Score</h3>
              <p className="text-3xl font-bold text-title">
                {analysis?.predictedScore}%
              </p>
            </div>

            {analysis?.struggles.length ? (
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Areas That Need Attention
                </h3>
                <ul className="list-disc list-inside">
                  {analysis.struggles.map((struggle, index) => (
                    <li key={index} className="mb-2 text-gray-700">{struggle}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {analysis?.recommendations.map((category, index) => (
              <div key={index} className="mb-8 p-4 bg-secondary/50 rounded-lg">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  {category.icon}
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 ml-4">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Button onClick={restart} className="mt-4 opacity-60 hover:opacity-100 w-full">
              Start New Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
