"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question:
      "What should you do if a stranger online asks for your personal information like your home address or school name?",
    options: [
      "Share it if they seem friendly",
      "Never share this information and tell a trusted adult",
      "Share it only if they share their information first",
      "Ask them why they want to know before deciding",
    ],
    correctAnswer: 1,
    explanation:
      "You should never share personal information like your home address or school name with strangers online, even if they seem friendly. This information could be used to locate you in real life, which could be dangerous. Always tell a trusted adult if someone is asking for this type of information.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What is a strong password?",
    options: [
      "Your name followed by your birth year (e.g., Emma2010)",
      "A short word that's easy to remember (e.g., cat)",
      "A long combination of letters, numbers, and symbols that doesn't contain personal information (e.g., T5%xLp9@Qr2!)",
      "The same password you use for all your accounts",
    ],
    correctAnswer: 2,
    explanation:
      "A strong password should be long and include a mix of uppercase and lowercase letters, numbers, and symbols. It shouldn't contain easily guessable information like your name or birth year. Using different passwords for different accounts helps protect your information if one account is compromised.",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Having two different passwords for the same account",
      "A security feature that requires two different forms of identification to log in",
      "Sharing your password with two trusted friends for safekeeping",
      "Changing your password twice a year",
    ],
    correctAnswer: 1,
    explanation:
      "Two-factor authentication (2FA) is a security feature that requires two different forms of identification to log in to an account. Typically, this includes something you know (like a password) and something you have (like a code sent to your phone). This adds an extra layer of protection because even if someone learns your password, they still can't access your account without the second factor.",
    difficulty: "medium",
  },
  {
    id: 4,
    question:
      "What should you do if you receive a message saying you've won a prize and need to click a link to claim it?",
    options: [
      "Click the link right away so you don't miss out on the prize",
      "Share the link with friends so they can win too",
      "Be suspicious, as this is likely a phishing attempt, and don't click the link",
      "Reply asking for more details about the prize",
    ],
    correctAnswer: 2,
    explanation:
      "Messages about unexpected prizes are often phishing attempts designed to trick you into clicking malicious links. These links might install malware on your device or lead to fake websites that steal your information. Be suspicious of unexpected prize notifications, especially if you don't remember entering any contests.",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "What is 'private browsing' or 'incognito mode' in a web browser?",
    options: [
      "A mode that makes you completely anonymous online so no one can track you",
      "A mode that prevents websites from collecting any data about you",
      "A mode that doesn't save your browsing history, cookies, or form data on your device",
      "A special VPN service provided by your browser",
    ],
    correctAnswer: 2,
    explanation:
      "Private browsing or incognito mode prevents your browser from saving your browsing history, cookies, site data, and information entered in forms on your device. However, it doesn't make you anonymous online. Your internet service provider, school, employer, or the websites you visit can still see your activity. It's useful for using shared computers but doesn't provide complete privacy.",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "What is a 'digital footprint'?",
    options: [
      "A special computer mouse that leaves marks on your screen",
      "The trace of data you leave behind when using the internet",
      "A type of computer virus that tracks your steps online",
      "The amount of storage your digital files take up",
    ],
    correctAnswer: 1,
    explanation:
      "Your digital footprint is the trace of data you leave behind when using the internet. This includes information you actively share (like social media posts) and passive data (like browsing history or location data). Understanding your digital footprint helps you make informed decisions about what you share online and how it might affect your privacy and reputation.",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "What should you do if someone is bullying you online?",
    options: [
      "Bully them back to teach them a lesson",
      "Keep it to yourself because it's embarrassing",
      "Immediately post about it on social media",
      "Don't respond, save evidence, block the person, and tell a trusted adult",
    ],
    correctAnswer: 3,
    explanation:
      "If you're being bullied online, the best approach is to not respond to the bully, save evidence of the bullying (like screenshots), block the person if possible, and tell a trusted adult who can help. Retaliating can escalate the situation, while keeping it to yourself allows the bullying to continue. Sharing it on social media might make the situation worse.",
    difficulty: "easy",
  },
  {
    id: 8,
    question: "What is a VPN and how does it help with online privacy?",
    options: [
      "Virtual Personal Network - it creates a private social network for you and your friends",
      "Virtual Private Network - it encrypts your internet connection and hides your IP address",
      "Virtual Protection Notice - it notifies you when a website is trying to collect your data",
      "Virtual Password Network - it generates and stores secure passwords for all your accounts",
    ],
    correctAnswer: 1,
    explanation:
      "A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address by routing your traffic through servers in different locations. This helps protect your privacy by making it harder for websites, advertisers, and potential hackers to track your online activities or determine your physical location. VPNs are especially useful when using public Wi-Fi networks.",
    difficulty: "hard",
  },
  {
    id: 9,
    question: "What is 'oversharing' in the context of social media?",
    options: [
      "Posting too many times in one day",
      "Sharing content with too many social media platforms at once",
      "Revealing too much personal information that could put your privacy or safety at risk",
      "Using too many hashtags in your posts",
    ],
    correctAnswer: 2,
    explanation:
      "Oversharing on social media means revealing too much personal information that could put your privacy or safety at risk. This might include sharing your full name, address, school, vacation plans (showing when your home will be empty), or personal problems. Being mindful about what you share helps protect your privacy and maintain appropriate boundaries online.",
    difficulty: "medium",
  },
  {
    id: 10,
    question: "What is a 'cookie' in the context of web browsing?",
    options: [
      "A reward program where websites give you points for visiting frequently",
      "A small text file stored on your device that contains information about your browsing activity on a website",
      "A type of computer virus that 'eats' your data",
      "A pop-up advertisement that appears when you visit a website",
    ],
    correctAnswer: 1,
    explanation:
      "A cookie is a small text file that websites store on your device to remember information about you and your visit. This can include login information, preferences, items in a shopping cart, or tracking data about your browsing habits. Cookies can be helpful for a better browsing experience but also raise privacy concerns because they can be used to track your online behavior across websites.",
    difficulty: "medium",
  },
]

export default function OnlineSafetyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(Number(value));
  };

  const handleNext = () => {
    if (showExplanation) {
      // Update answers array
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer!;
      setAnswers(newAnswers);

      // Update score if answer is correct
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }

      // Move to next question or complete quiz
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    } else {
      setShowExplanation(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/10 text-green-500";
      case "medium": return "bg-amber-500/10 text-amber-500";
      case "hard": return "bg-red-500/10 text-red-500";
      default: return "bg-green-500/10 text-green-500";
    }
  };

  const getScoreBadge = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    if (percentage >= 90) return "Safety Ranger Master";
    if (percentage >= 70) return "Safety Ranger Pro";
    if (percentage >= 50) return "Safety Ranger Apprentice";
    return "Safety Ranger Rookie";
  };

  const getScoreMessage = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    if (percentage >= 90) return "Excellent! You're a safety expert!";
    if (percentage >= 70) return "Great job! You know your online safety!";
    if (percentage >= 50) return "Good effort! Keep learning about online safety.";
    return "Keep practicing! Online safety is important.";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!quizCompleted ? (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Online Safety Quiz</h1>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <div>Question {currentQuestionIndex + 1} of {quizQuestions.length}</div>
              <div>{Math.round(progress)}% complete</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  } ${
                    showExplanation && index === currentQuestion.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : showExplanation && index === selectedAnswer
                      ? index !== currentQuestion.correctAnswer
                        ? "border-red-500 bg-red-50"
                        : ""
                      : ""
                  }`}
                  onClick={() => !showExplanation && handleAnswerSelect(index.toString())}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index.toString())}
                    disabled={showExplanation}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="flex-1 cursor-pointer">{option}</label>
                  {showExplanation && index === currentQuestion.correctAnswer && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getDifficultyColor(currentQuestion.difficulty)
                }`}
              >
                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
              </span>
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium mb-2">Explanation:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => router.push("/assessment")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Exit Quiz
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                selectedAnswer === null && !showExplanation ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {showExplanation
                ? currentQuestionIndex < quizQuestions.length - 1
                  ? "Next Question"
                  : "See Results"
                : "Check Answer"}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
              <div className="text-xl font-medium">{getScoreBadge()}</div>
              <p className="mt-2 text-gray-600">{getScoreMessage()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">{quizQuestions.length - score}</div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Question Summary:</h3>
              {quizQuestions.map((question, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md border ${
                    answers[index] === question.correctAnswer
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">Question {index + 1}</div>
                    {answers[index] === question.correctAnswer ? (
                      <span className="text-green-600 font-medium">Correct</span>
                    ) : (
                      <span className="text-red-600 font-medium">Incorrect</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm">{question.question}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => router.push("/assessment")}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Assessment
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
                setScore(0);
                setAnswers(Array(quizQuestions.length).fill(-1));
                setQuizCompleted(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}