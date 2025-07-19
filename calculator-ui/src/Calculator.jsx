import { useState } from "react";

function safeEval(expr) {
  // Only allow numbers, operators, and decimal points
  if (!/^[-+*/().\d\s]+$/.test(expr)) return "Error";
  try {
    // eslint-disable-next-line no-new-func
    // Use Function constructor for safer evaluation
    // Still not perfect, but avoids direct eval
    // For production, use a math parser library
    // e.g. mathjs
    // This is for basic arithmetic only
    // Remove spaces to avoid issues
    const fn = new Function(`return (${expr.replace(/\s+/g,"")})`);
    return fn().toString();
  } catch {
    return "Error";
  }
}

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    setResult(safeEval(input));
  };

  return (
    <div className="max-w-xs mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-full mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full text-right text-2xl p-2 border rounded mb-2 bg-gray-50"
        />
        <div className="text-right text-lg text-gray-500">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full mb-2">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"]
          .map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 text-white rounded p-3 text-xl hover:bg-blue-600 transition"
              onClick={() =>
                btn === "=" ? handleCalculate() : handleClick(btn)
              }
            >
              {btn}
            </button>
          ))}
      </div>
      <button
        className="bg-red-500 text-white rounded p-2 w-full text-lg hover:bg-red-600 transition"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}
