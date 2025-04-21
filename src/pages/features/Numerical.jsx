import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const NumericalMaths = () => {
  const [expression, setExpression] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('evaluate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the useGroq hook
  const { fetchGroqResponse, response, loading: groqLoading, error: groqError } = useGroq();

  const colors = {
    primary: "#3A86FF",
    secondary: "#1A1A2E",
    accent: "#FFBE0B",
    light: "#E6F1FF",
    dark: "#0A0A12",
    background: "#1A1A2E",
    text: "#FFFFFF",
    paragraph: "#CCCCCC",
    hrcolor: "#333344",
  };

  const operations = [
    { value: 'evaluate', label: 'Evaluate Expression' },
    { value: 'round', label: 'Round to Nearest Integer' },
    { value: 'sqrt', label: 'Square Root' },
    { value: 'abs', label: 'Absolute Value' },
  ];

  const handleSolve = async () => {
    if (!expression.trim()) {
      setError('Please enter a numeric expression');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Map the selected operation to a task type for the Groq prompt
      const taskMap = {
        evaluate: 'Evaluate the following numerical expression:',
        round: 'Round the following numerical expression to the nearest integer:',
        sqrt: 'Compute the square root of the following numerical expression:',
        abs: 'Compute the absolute value of the following numerical expression:',
      };

      const taskType = taskMap[selectedOperation] || 'Evaluate the following numerical expression:';

      // Call the fetchGroqResponse function from the useGroq hook
      await fetchGroqResponse(taskType, expression);

      // Set the result with the response from Groq
      setResult(response || 'No result returned');
    } catch (err) {
      setError(groqError || 'An error occurred while processing the expression');
      console.error('Groq API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.light }}>
            Numerical Maths
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Perform quick and accurate numeric computations with SageMath
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-dark rounded-xl shadow-lg overflow-hidden border"
          style={{ borderColor: colors.hrcolor }}
        >
          <div className="p-6 border-b" style={{ borderColor: colors.hrcolor }}>
            <label htmlFor="expression" className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
              Enter Numeric Expression
            </label>
            <input
              type="text"
              id="expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g., 3 * (4 + 2) / 5"
              className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ color: colors.text, borderColor: colors.hrcolor, backgroundColor: colors.secondary }}
            />
            <div className="mt-6">
              <label htmlFor="operation" className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
                Select Operation
              </label>
              <select
                id="operation"
                value={selectedOperation}
                onChange={(e) => setSelectedOperation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
                style={{ color: colors.text, borderColor: colors.hrcolor }}
              >
                {operations.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 border-b" style={{ borderColor: colors.hrcolor }}>
            <button
              onClick={handleSolve}
              disabled={groqLoading || !expression.trim()}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                groqLoading || !expression.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              {groqLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Calculating...
                </span>
              ) : (
                'Calculate'
              )}
            </button>

            {(error || groqError) && (
              <div
                className="mt-4 p-3 rounded-lg text-sm"
                style={{ backgroundColor: 'rgba(255, 107, 107, 0.1)', color: colors.accent }}
              >
                {error || groqError}
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.light }}>
              Result
            </h3>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-secondary"
                style={{ color: colors.text }}
              >
                <div className="font-mono text-lg whitespace-pre-wrap">{result}</div>
              </motion.div>
            ) : (
              <div className="p-8 text-center rounded-lg bg-secondary" style={{ color: colors.paragraph }}>
                {groqLoading ? 'Working on it...' : 'Your result will be shown here.'}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NumericalMaths;