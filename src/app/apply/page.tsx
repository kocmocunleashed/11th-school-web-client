'use client';

import { useState } from "react";

export default function Apply() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const checkResult = () => {
    // Check if code is exactly 8 characters
    if (code.length !== 8) {
      setResult("Please enter an 8-character code");
      return;
    }

    // Simple logic: if the last character is even, accept; if odd, deny
    const lastChar = code[code.length - 1];
    const isEven = parseInt(lastChar) % 2 === 0;

    if (isEven) {
      setResult("Congratulations! Your application has been accepted!");
    } else {
      setResult("We regret to inform you that your application has been denied.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Application Guides</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Application Guide</h2>
          <div className="aspect-[4/3] w-full">
            <iframe
              src="/main.pdf"
              className="w-full h-full rounded-md border border-gray-300"
              title="Application Guide PDF"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Check Application Result</h2>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your 8-character application code:
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              placeholder="XXXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <button
            onClick={checkResult}
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          >
            Check Result
          </button>

          {result && (
            <div
              className={`mt-4 p-4 rounded-md text-center font-medium ${
                result.includes("accepted")
                  ? "bg-green-100 text-green-800"
                  : result.includes("denied")
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
