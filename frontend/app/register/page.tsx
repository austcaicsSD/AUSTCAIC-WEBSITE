"use client";

import { useState } from "react";
import { registerMember } from "../actions";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const formData = new FormData(e.currentTarget);
    const response = await registerMember(formData);

    if (response.success) {
      setStatusMessage({ text: response.message, type: "success" });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatusMessage({ text: response.message, type: "error" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-brandBlue mb-4">
          General Member Registration
        </h1>
        <p className="text-gray-600 text-lg">
          Join AUST Cybersecurity and AI Club.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {statusMessage.text && (
          <div
            className={`p-4 mb-6 rounded-lg font-bold text-center ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID
              </label>
              <input
                required
                type="text"
                name="studentId"
                placeholder="20.01.04.xxx"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="+880 1..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <select
                required
                name="department"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none bg-white"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="IPE">IPE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Semester
              </label>
              <select
                required
                name="semester"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brandPurple outline-none bg-white"
              >
                <option value="">Select Semester</option>
                <option value="1.1">1.1</option>
                <option value="1.2">1.2</option>
                <option value="2.1">2.1</option>
                <option value="2.2">2.2</option>
                <option value="3.1">3.1</option>
                <option value="3.2">3.2</option>
                <option value="4.1">4.1</option>
                <option value="4.2">4.2</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-brandBlue text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition disabled:opacity-70"
          >
            {isSubmitting ? "Processing..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
