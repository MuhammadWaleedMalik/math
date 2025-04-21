import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const SymbolicComputations = () => {
  const [expression, setExpression] = useState('');
  const [symbol, setSymbol] = useState('x');
  const [simplified, setSimplified] = useState('');
  const [deriv, setDeriv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleCompute = async () => {
    if (!expression.trim()) {
      setError('Please enter a valid expression.');
      return;
    }
    if (!symbol.trim()) {
      setError('Please enter a valid symbol for differentiation.');
      return;
    }

    setLoading(true);
    setError('');
    setSimplified('');
    setDeriv('');

    try {
      // Prompt for simplification
      const simplifyPrompt = `Simplify the following mathematical expression: ${expression}`;
      const simplifyTaskType = 'Simplify the following mathematical expression and return the result:';

      // Call Groq API for simplification
      await fetchGroqResponse(simplifyTaskType, simplifyPrompt);
      let simplifiedResult = response || 'No result returned';

      // Store the simplified result
      setSimplified(simplifiedResult);

      // Prompt for differentiation
      const derivativePrompt = `Compute the derivative of the following expression with respect to ${symbol}: ${expression}`;
      const derivativeTaskType = 'Compute the derivative of the following expression and return the result:';

      // Call Groq API for differentiation
      await fetchGroqResponse(derivativeTaskType, derivativePrompt);
      let derivativeResult = response || 'No result returned';

      // Store the derivative result
      setDeriv(derivativeResult);
    } catch (err) {
      setError(groqError || 'An error occurred while computing the results');
      console.error('Groq API Error:', err);
      setSimplified('');
      setDeriv('');
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
            Symbolic Computations
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Perform symbolic simplification and differentiation.
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
            <label className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
              Expression
            </label>
            <input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border mb-4"
              style={{ color: colors.text, borderColor: colors.hrcolor }}
              placeholder="e.g., x^2 + 2*x + 1"
            />

            <label className="block text-sm font-medium mb-2" style={{ color: colors.light }}>
              Differentiate with respect to:
            </label>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary border"
              style={{ color: colors.text, borderColor: colors.hrcolor }}
              placeholder="e.g., x"
            />

            <button
              onClick={handleCompute}
              disabled={groqLoading || !expression.trim() || !symbol.trim()}
              className={`mt-6 w-full py-3 px-6 rounded-lg font-bold transition-all ${
                groqLoading || !expression.trim() || !symbol.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
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
                  Computing...
                </span>
              ) : (
                'Compute'
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
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.light }}>Results</h3>
            <div className="mb-4">
              <p className="text-sm mb-1" style={{ color: colors.paragraph }}>Simplified:</p>
              <div className="px-4 py-2 bg-secondary rounded-lg" style={{ color: colors.text }}>
                {simplified || '—'}
              </div>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: colors.paragraph }}>Derivative:</p>
              <div className="px-4 py-2 bg-secondary rounded-lg" style={{ color: colors.text }}>
                {deriv || '—'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SymbolicComputations;