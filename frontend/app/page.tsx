import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center pt-32 px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-brandBlue">
        AUST Cybersecurity <br />
        <span className="text-brandPurple">and AI Club</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Secure. Innovate. Lead. Join the community of tech enthusiasts shaping
        the future of security and artificial intelligence.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/register"
          className="px-8 py-4 bg-brandBlue text-white rounded-lg font-bold hover:bg-blue-800 transition shadow-lg"
        >
          Member Registration
        </Link>
        <Link
          href="/lab-free"
          className="px-8 py-4 bg-white text-brandPurple border-2 border-brandPurple rounded-lg font-bold hover:bg-brandPurple hover:text-white transition shadow-lg"
        >
          Get Lab Free Resources
        </Link>
      </div>
    </section>
  );
}
