export default function LabFree() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-brandPurple mb-4">
        Gift Resources & Lab Free
      </h1>
      <p className="text-gray-600 mb-8">
        Direct download links for our exclusive resources.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brandBlue text-left">
          <h2 className="text-xl font-bold text-brandBlue mb-2">
            Cybersecurity Roadmap 2026
          </h2>
          <button className="mt-4 px-4 py-2 bg-gray-100 text-brandBlue font-semibold rounded hover:bg-gray-200">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
