import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const AlgebraSolver = () => {
  const [expression, setExpression] = useState('');
  const [variables, setVariables] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState('simplify');
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

  const website = {
    name: "SageMath",
    slogan: "Math and Path – Achieve at Last",
  };

  // Available operations
  const operations = [
    { value: 'simplify', label: 'Simplify' },
    { value: 'factor', label: 'Factor' },
    { value: 'expand', label: 'Expand' },
    { value: 'derive', label: 'Derivative' },
    { value: 'integrate', label: 'Integrate' },
    { value: 'solve', label: 'Solve for x' },
  ];

  // Extract variables from expression
  const extractVariables = (expr) => {
    const vars = expr.match(/[a-zA-Z]+/g);
    return vars ? [...new Set(vars)] : [];
  };

  // Handle expression change
  const handleExpressionChange = (e) => {
    const expr = e.target.value;
    setExpression(expr);
    setVariables(extractVariables(expr));
  };

  // Handle solve button click
  const handleSolve = async () => {
    if (!expression.trim()) {
      setError('Please enter an expression');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Map the selected operation to a task type for the Groq prompt
      const taskMap = {
        simplify: 'Simplify the following algebraic expression:',
        factor: 'Factor the following algebraic expression:',
        expand: 'Expand the following algebraic expression:',
        derive: 'Compute the derivative of the following expression with respect to x:',
        integrate: 'Compute the indefinite integral of the following expression with respect to x:',
        solve: 'Solve the following equation for x:',
      };

      const taskType = taskMap[selectedOperation] || 'Simplify the following algebraic expression:';

      // Call the fetchGroqResponse function from the useGroq hook
      await fetchGroqResponse(taskType, expression);

      // Update the result with the response from Groq
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: colors.light }}>
            Algebra Solver
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Solve, simplify, factor, and more with SageMath's powerful algebra engine
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-dark rounded-xl shadow-lg overflow-hidden border"
          style={{ borderColor: colors.hrcolor }}
        >
          {/* Input Section */}
          <div className="p-6 border-b" style={{ borderColor: colors.hrcolor }}>
            <div className="mb-6">
              <label htmlFor="expression" className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
                Enter Algebraic Expression
              </label>
              <input
                type="text"
                id="expression"
                value={expression}
                onChange={handleExpressionChange}
                placeholder="e.g., x^2 + 2x + 1 or 3y + 2 = 5"
                className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
                style={{
                  color: colors.text,
                  borderColor: colors.hrcolor,
                  backgroundColor: colors.secondary,
                }}
              />
            </div>

            {/* Variables and Operations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
                  Detected Variables
                </label>
                <div className="flex flex-wrap gap-2">
                  {variables.length > 0 ? (
                    variables.map((varName) => (
                      <span
                        key={varName}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.light,
                        }}
                      >
                        {varName}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm" style={{ color: colors.paragraph }}>
                      No variables detected
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="operation" className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
                  Select Operation
                </label>
                <select
                  id="operation"
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{
                    color: colors.text,
                    borderColor: colors.hrcolor,
                    backgroundColor: colors.secondary,
                  }}
                >
                  {operations.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="p-6 border-b" style={{ borderColor: colors.hrcolor }}>
            <button
              onClick={handleSolve}
              disabled={groqLoading || !expression.trim()}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                groqLoading || !expression.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
              style={{
                backgroundColor: colors.accent,
                color: colors.dark,
              }}
            >
              {groqLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Solve Expression'
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

          {/* Result Section */}
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.light }}>
              Solution
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
                {groqLoading ? <span>Calculating result...</span> : <span>Your solution will appear here</span>}
              </div>
            )}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-dark rounded-xl p-6 border"
          style={{ borderColor: colors.hrcolor }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.light }}>
            How to Use the Algebra Solver
          </h3>
          <ul className="space-y-3" style={{ color: colors.paragraph }}>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: colors.accent }}>→</span>
              <span>Enter any algebraic expression using standard mathematical notation</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: colors.accent }}>→</span>
              <span>Variables will be automatically detected (e.g., x, y, z)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: colors.accent }}>→</span>
              <span>Select the operation you want to perform (simplify, factor, solve, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2" style={{ color: colors.accent }}>→</span>
              <span>Click "Solve Expression" to get the result</span>
            </li>
          </ul>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2" style={{ color: colors.light }}>
              Examples to Try:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['x^2 + 2x + 1', '3x + 5 = 2x - 7', '(x + 2)(x - 3)', '2x^3 - 4x^2 + 3x - 6', 'sin(x)^2 + cos(x)^2'].map(
                (example, i) => (
                  <button
                    key={i}
                    onClick={() => setExpression(example)}
                    className="text-left p-2 rounded hover:bg-secondary transition-colors text-sm"
                    style={{ color: colors.paragraph }}
                  >
                    {example}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlgebraSolver;