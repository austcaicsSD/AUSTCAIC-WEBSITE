export default function Register() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-brandBlue mb-4">
        General Member Registration
      </h1>
      <p className="text-gray-600 mb-8">
        Registration form will be connected to PostgreSQL here.
      </p>
      <div className="bg-white p-8 rounded-xl shadow-md h-64 flex items-center justify-center border border-gray-200">
        <span className="text-gray-400">Form components loading...</span>
      </div>
    </div>
  );
}
