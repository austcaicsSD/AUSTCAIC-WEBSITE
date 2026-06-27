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
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden bg-gray-50">
      
      {/* Background Decorative Elements (Tech/AI Vibe) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brandBlue/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brandPurple/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Main Form Container - Glassmorphism Effect */}
      <div className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-lg p-8 sm:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brandBlue to-brandPurple tracking-tight">
            Member Registration
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Join the <span className="text-brandBlue font-semibold">AUST Cybersecurity and AI Club</span> today.
          </p>
        </div>

        {/* Status Message Alert */}
        {statusMessage.text && (
          <div
            className={`flex items-center gap-3 p-4 mb-8 rounded-xl font-medium border transition-all duration-500 animate-fade-in-down ${
              statusMessage.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {statusMessage.type === "success" ? (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ) : (
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )}
            {statusMessage.text}
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Full Name */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandBlue">
                Full Name
              </label>
              <input required type="text" name="fullName" placeholder="e.g. Priyo Saha"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue outline-none transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Student ID */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandBlue">
                Student ID
              </label>
              <input required type="text" name="studentId" placeholder="20.01.04.xxx"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue outline-none transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Email Address */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandPurple">
                Email Address
              </label>
              <input required type="email" name="email" placeholder="student@aust.edu.bd"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandPurple/50 focus:border-brandPurple outline-none transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandPurple">
                Phone Number
              </label>
              <input required type="tel" name="phone" placeholder="+880 1..."
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandPurple/50 focus:border-brandPurple outline-none transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Department */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandBlue">
                Department
              </label>
              <select required name="department"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue outline-none transition-all duration-300 shadow-sm appearance-none cursor-pointer"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="IPE">IPE</option>
              </select>
            </div>

            {/* Semester */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-brandBlue">
                Current Semester
              </label>
              <select required name="semester"
                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brandBlue/50 focus:border-brandBlue outline-none transition-all duration-300 shadow-sm appearance-none cursor-pointer"
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-brandBlue to-brandPurple text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-brandBlue/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Complete Registration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}