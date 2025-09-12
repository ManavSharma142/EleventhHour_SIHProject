import { Link } from "react-router-dom";

export default function TempHero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <h1 className="text-5xl font-bold mb-6">FitLife</h1>
      <p className="text-xl mb-8 text-center max-w-lg">
        Your AI-powered fitness buddy. Track workouts, stay motivated, and build healthy habits.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-600 rounded-xl shadow-lg font-semibold hover:bg-gray-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-yellow-400 text-black rounded-xl shadow-lg font-semibold hover:bg-yellow-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
