import { useState } from "react";

function safeEval(expr) {
  if (!/^[-+*/().\d\s]+$/.test(expr)) return "Error";
  try {
    const fn = new Function(`return (${expr.replace(/\s+/g,"")})`);
    return fn().toString();
  } catch {
    return "Error";
  }
}

const numpad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", ".", "C"]
];
const operations = ["/", "*", "-", "+", "="];

const colors = {
  operator: "bg-blue-500 hover:bg-blue-600 text-white",
  function: "bg-gray-300 hover:bg-gray-400 text-gray-700",
  number: "bg-teal-200 hover:bg-teal-300 text-gray-900",
};

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (!value) return;
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      setResult(safeEval(input));
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl flex flex-col items-center">
      <div className="w-full mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full text-right text-3xl p-3 rounded bg-gray-50 border border-gray-300 mb-2"
        />
        <div className="text-right text-xl text-gray-500 min-h-[2rem]">{result}</div>
      </div>
      <div className="flex w-full">
        <div className="grid grid-cols-3 gap-3 flex-1">
          {numpad.flat().map((btn, idx) => {
            let style = colors.number;
            if (btn === "C") style = colors.function;
            return (
              <button
                key={btn + idx}
                className={`${style} rounded-full p-4 text-2xl font-semibold transition-colors duration-150`}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 ml-3">
          {operations.map((op, idx) => (
            <button
              key={op + idx}
              className={`${colors.operator} rounded-full p-4 text-2xl font-semibold transition-colors duration-150`}
              onClick={() => handleClick(op)}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
