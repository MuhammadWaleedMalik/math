import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const StatsProbability = () => {
  const [dataInput, setDataInput] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('mean');
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
    { value: 'mean', label: 'Mean (Average)' },
    { value: 'median', label: 'Median' },
    { value: 'mode', label: 'Mode' },
    { value: 'stddev', label: 'Standard Deviation' },
    { value: 'probability', label: 'Probability (of a value)' },
  ];

  const handleSolve = async () => {
    const numbers = dataInput
      .split(/[\s,]+/)
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      setError('Please enter a valid list of numbers.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Map the selected operation to a task type for the Groq prompt
      const taskMap = {
        mean: 'Calculate the mean (average) of the following dataset:',
        median: 'Calculate the median of the following dataset:',
        mode: 'Calculate the mode of the following dataset:',
        stddev: 'Calculate the standard deviation of the following dataset:',
        probability: 'Calculate the probability of a specific value in the following dataset (assume a discrete uniform distribution unless specified):',
      };

      const taskType = taskMap[selectedOperation] || 'Calculate the mean (average) of the following dataset:';

      // Format the dataset as a string for the prompt
      const prompt = `Dataset: [${numbers.join(', ')}]`;

      // Call the fetchGroqResponse function from the useGroq hook
      await fetchGroqResponse(taskType, prompt);

      // Parse and set the result from the Groq response
      try {
        // Attempt to parse the response as a number or array (for mode or probability)
        const parsedResult = JSON.parse(response);
        setResult(parsedResult);
      } catch (err) {
        // Fallback to raw response if parsing fails
        setResult(response || 'No result returned');
      }
    } catch (err) {
      setError(groqError || 'An error occurred while processing the dataset');
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
            Statistics & Probability
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Analyze numerical datasets and calculate statistical measures
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
              Enter Dataset (comma or space-separated)
            </label>
            <input
              type="text"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              placeholder="e.g., 1, 2, 2, 3, 4"
              className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ color: colors.text, borderColor: colors.hrcolor, backgroundColor: colors.secondary }}
            />

            <label className="block text-sm font-medium mt-6 mb-2" style={{ color: colors.light }}>
              Select Operation
            </label>
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ color: colors.text, borderColor: colors.hrcolor }}
            >
              {operations.map(op => (
                <option key={op.value} value={op.value}>{op.label}</option>
              ))}
            </select>
          </div>

          <div className="p-6 border-b" style={{ borderColor: colors.hrcolor }}>
            <button
              onClick={handleSolve}
              disabled={groqLoading || !dataInput.trim()}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                groqLoading || !dataInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
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
            {result !== null ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-secondary"
                style={{ color: colors.text }}
              >
                <div className="font-mono text-lg">
                  {Array.isArray(result) ? result.join(', ') : result}
                </div>
              </motion.div>
            ) : (
              <div className="p-8 text-center rounded-lg bg-secondary" style={{ color: colors.paragraph }}>
                {groqLoading ? 'Calculating result...' : 'Your result will appear here'}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-dark rounded-xl p-6 border"
          style={{ borderColor: colors.hrcolor }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.light }}>
            How to Use
          </h3>
          <ul className="space-y-3" style={{ color: colors.paragraph }}>
            <li>→ Enter your dataset (e.g., test scores or survey results)</li>
            <li>→ Choose a statistical or probability operation</li>
            <li>→ Click "Calculate" to get the result</li>
          </ul>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2" style={{ color: colors.light }}>
              Sample Datasets:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '5, 10, 15, 10, 20',
                '1 2 3 4 5 6',
                '7, 8, 9, 10, 11, 12, 13',
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setDataInput(example)}
                  className="text-left p-2 rounded hover:bg-secondary transition-colors text-sm"
                  style={{ color: colors.paragraph }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsProbability;