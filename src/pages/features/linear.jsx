import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const LinearAlgebra = () => {
  const [matrixA, setMatrixA] = useState('');
  const [matrixB, setMatrixB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
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

  const operations = [
    { value: 'add', label: 'Matrix Addition (A + B)' },
    { value: 'multiply', label: 'Matrix Multiplication (A × B)' },
    { value: 'transposeA', label: 'Transpose of A' },
    { value: 'determinantA', label: 'Determinant of A' },
    { value: 'inverseA', label: 'Inverse of A' },
  ];

  const parseMatrix = (input) => {
    try {
      return input.trim().split('\n').map(row =>
        row.trim().split(/[\s,]+/).map(Number)
      );
    } catch (err) {
      return null;
    }
  };

  const matrixToString = (matrix) => {
    return matrix.map(row => row.join(' ')).join('; ');
  };

  const handleSolve = async () => {
    const A = parseMatrix(matrixA);
    const B = parseMatrix(matrixB);

    if (!A || A.some(row => row.some(isNaN))) {
      setError('Matrix A is invalid.');
      return;
    }

    if (['add', 'multiply'].includes(operation) && (!B || B.some(row => row.some(isNaN)))) {
      setError('Matrix B is invalid or required.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Map the selected operation to a task type for the Groq prompt
      const taskMap = {
        add: 'Add the following two matrices (Matrix A and Matrix B):',
        multiply: 'Multiply the following two matrices (Matrix A and Matrix B):',
        transposeA: 'Compute the transpose of the following matrix (Matrix A):',
        determinantA: 'Compute the determinant of the following matrix (Matrix A):',
        inverseA: 'Compute the inverse of the following matrix (Matrix A):',
      };

      const taskType = taskMap[operation] || 'Add the following two matrices:';

      // Prepare the prompt with matrix data
      const matrixAString = matrixToString(A);
      let prompt = `Matrix A: [${matrixAString}]`;
      if (['add', 'multiply'].includes(operation)) {
        const matrixBString = matrixToString(B);
        prompt += `; Matrix B: [${matrixBString}]`;
      }

      // Call the fetchGroqResponse function from the useGroq hook
      await fetchGroqResponse(taskType, prompt);

      // Parse and set the result from the Groq response
      try {
        // Assuming Groq returns a matrix as a string like "[[1, 2], [3, 4]]" or a scalar
        const parsedResult = JSON.parse(response.replace(/;/g, ','));
        setResult(Array.isArray(parsedResult) ? parsedResult : parsedResult);
      } catch (err) {
        // Fallback to raw response if parsing fails
        setResult(response || 'No result returned');
      }
    } catch (err) {
      setError(groqError || 'An error occurred while processing the matrix operation');
      console.error('Groq API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderMatrix = (matrix) => (
    <div className="inline-block text-left font-mono">
      {matrix.map((row, i) => (
        <div key={i} className="flex space-x-3">
          {row.map((val, j) => (
            <div key={j} className="px-2 py-1 bg-secondary rounded">
              {val}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

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
            Linear Algebra Calculator
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Perform matrix operations like addition, multiplication, transpose, determinant, and inverse.
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
              Matrix A (each row on a new line, values comma or space separated)
            </label>
            <textarea
              value={matrixA}
              onChange={(e) => setMatrixA(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ color: colors.text, borderColor: colors.hrcolor }}
              placeholder={`e.g.\n1 2 3\n4 5 6`}
            />

            {(operation === 'add' || operation === 'multiply') && (
              <>
                <label className="block text-sm font-medium mt-6 mb-2" style={{ color: colors.light }}>
                  Matrix B
                </label>
                <textarea
                  value={matrixB}
                  onChange={(e) => setMatrixB(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{ color: colors.text, borderColor: colors.hrcolor }}
                  placeholder={`e.g.\n7 8 9\n10 11 12`}
                />
              </>
            )}

            <label className="block text-sm font-medium mt-6 mb-2" style={{ color: colors.light }}>
              Select Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
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
              disabled={groqLoading}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                groqLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
              style={{ backgroundColor: colors.accent, color: colors.dark }}
            >
              {groqLoading ? 'Calculating...' : 'Solve'}
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
                {Array.isArray(result) ? renderMatrix(result) : <div className="font-mono text-lg">{result}</div>}
              </motion.div>
            ) : (
              <div className="p-8 text-center rounded-lg bg-secondary" style={{ color: colors.paragraph }}>
                {groqLoading ? 'Solving matrix operation...' : 'Your result will appear here'}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LinearAlgebra;