import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuestionCardProps {
  question: string;
  currentQuestion: number;
  totalQuestions: number;
  onNext: (answer: string | number) => void;
  options?: Array<{ value: string | number; label: string; image?: string }>;
  type?: "buttons" | "number" | "text";
  min?: number;
  max?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  onNext,
  options = [],
  type = "buttons",
  min,
  max,
}) => {
  const [value, setValue] = React.useState<string | number>("");

  const handleNext = (selectedValue: string | number) => {
    setValue(selectedValue);
    onNext(selectedValue);
  };

  const handleNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value !== "") {
      onNext(value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-white/80 backdrop-blur shadow-lg">
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Question {currentQuestion} out of {totalQuestions}
        </p>
        <div className="h-2 bg-accent/30 rounded-full mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <h2 className="text-2xl font-semibold text-text mb-8">{question}</h2>
      </div>

      {type === "buttons" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleNext(option.value)}
              className="h-auto py-4 opacity-60 hover:opacity-100 transition-all duration-300 hover:animate-button-pop"
              variant="secondary"
            >
              {option.image && (
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-16 h-16 object-cover mb-2"
                />
              )}
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
      )}

      {(type === "number" || type === "text") && (
        <form onSubmit={handleNumberSubmit} className="flex flex-col items-center gap-4">
          <input
            type={type === "number" ? "number" : "text"}
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border rounded-md"
            required
          />
          <Button
            type="submit"
            className="opacity-60 hover:opacity-100 transition-all duration-300"
          >
            Next
          </Button>
        </form>
      )}
    </div>
  );
};