import React, { useState } from 'react';
// import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const Plotter = () => {
  const [expression, setExpression] = useState('sin(x)');
  const [xRange, setXRange] = useState({ min: -10, max: 10 });
  const [data, setData] = useState(null);
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

  const generatePlotData = async () => {
    if (!expression.trim()) {
      setError('Please enter a mathematical expression');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const xValues = [];
      const yValues = [];
      const step = 0.1;

      // Generate x-values
      for (let x = xRange.min; x <= xRange.max; x += step) {
        xValues.push(x);
      }

      // Construct prompt for Groq to evaluate the expression for all x-values
      const prompt = `Evaluate the mathematical expression "${expression}" for the following x-values: [${xValues.join(', ')}]. Return a list of y-values in JSON format, e.g., [y1, y2, ...]. Use standard mathematical functions (sin, cos, tan, log, sqrt, exp) and assume x is the variable.`;
      const taskType = 'Evaluate the following mathematical expression for given x-values and return the results as a JSON array:';

      // Call Groq API
      await fetchGroqResponse(taskType, prompt);

      // Parse the response
      let yResults;
      try {
        yResults = JSON.parse(response);
        if (!Array.isArray(yResults)) {
          throw new Error('Expected an array of y-values');
        }
      } catch (err) {
        setError('Invalid response format from API. Expected a JSON array of y-values.');
        setLoading(false);
        return;
      }

      // Validate and set y-values
      if (yResults.length !== xValues.length) {
        setError('Number of y-values does not match number of x-values.');
        setLoading(false);
        return;
      }

      yValues.push(...yResults);

      // Set plot data
      setData({
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        marker: { color: colors.accent },
      });
      setError(null);
    } catch (err) {
      setError(groqError || 'An error occurred while generating the plot');
      console.error('Groq API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlot = () => {
    // Preprocess expression to align with standard mathematical notation
    const parsed = expression
      .replace(/sin/g, 'sin')
      .replace(/cos/g, 'cos')
      .replace(/tan/g, 'tan')
      .replace(/log/g, 'log')
      .replace(/sqrt/g, 'sqrt')
      .replace(/exp/g, 'exp')
      .replace(/\^/g, '**');
    setExpression(parsed);
    generatePlotData();
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
            Function Plotter
          </h1>
          <p className="text-xl" style={{ color: colors.paragraph }}>
            Enter a mathematical expression and visualize it on a graph.
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
              Expression (use `x` as variable)
            </label>
            <input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border"
              style={{ color: colors.text, borderColor: colors.hrcolor }}
              placeholder="e.g., x**2, sin(x), log(x)"
            />

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm mb-2" style={{ color: colors.light }}>X Min</label>
                <input
                  type="number"
                  value={xRange.min}
                  onChange={(e) => setXRange({ ...xRange, min: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border"
                  style={{ color: colors.text, borderColor: colors.hrcolor }}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: colors.light }}>X Max</label>
                <input
                  type="number"
                  value={xRange.max}
                  onChange={(e) => setXRange({ ...xRange, max: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border"
                  style={{ color: colors.text, borderColor: colors.hrcolor }}
                />
              </div>
            </div>

            <button
              onClick={handlePlot}
              disabled={groqLoading || !expression.trim()}
              className={`mt-6 w-full py-3 px-6 rounded-lg font-bold transition-all ${
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
                  Plotting...
                </span>
              ) : (
                'Plot'
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
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.light }}>Graph</h3>
            {data ? (
              // <Plot
              //   data={[data]}
              //   layout={{
              //     width: 700,
              //     height: 450,
              //     paper_bgcolor: colors.background,
              //     plot_bgcolor: colors.secondary,
              //     font: { color: colors.text },
              //     margin: { t: 30, l: 50, r: 30, b: 50 },
              //     xaxis: { title: 'x' },
              //     yaxis: { title: 'y' },
              //   }}
              // />
              <div className="p-8 text-center rounded-lg bg-secondary" style={{ color: colors.paragraph }}>
                Plot component is commented out. Uncomment Plot import to render the graph.
              </div>
            ) : (
              <div className="p-8 text-center rounded-lg bg-secondary" style={{ color: colors.paragraph }}>
                {groqLoading ? 'Generating plot...' : 'Plot will appear here after input'}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Plotter;