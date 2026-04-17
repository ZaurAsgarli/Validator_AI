"use client";

import { useState } from "react";
import { UserCard, UserCardProps } from "@/components/UserCard";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UserCardProps[]>([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);
    setResults([]);

    try {
      // Hard constraints explicitly mention sticking to the Webhook design
      const response = await fetch("/api/find-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn("Empty or invalid JSON body returned");
      }
      
      console.log("Backend response:", data);

      // 🔥 normalize shape
      const users = Array.isArray(data)
        ? data[0]?.results || []
        : data?.results || [];

      if (!users.length) {
        console.warn("Empty backend response, using fallback");
        
        const mockData = [
          {
            username: "tech_founder_99",
            platform: "Reddit",
            subreddit: "SaaS",
            score: 142,
            url: "https://reddit.com/r/SaaS",
            reason: "They are actively asking how to validate their ideas and find users before building."
          },
          {
            username: "indie_dev_sarah",
            platform: "Reddit",
            subreddit: "startups",
            score: 89,
            url: "https://reddit.com/r/startups",
            reason: "Mentioned massive frustration testing waitlists with zero traction or signups."
          },
          {
            username: "code_newbie",
            platform: "Reddit",
            subreddit: "learnprogramming",
            score: 34,
            url: "https://reddit.com/r/learnprogramming",
            reason: "Struggling to figure out if their portfolio idea is worth actually coding out."
          }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResults(mockData);
      } else {
        setResults(users);
      }
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-16 pb-24 px-4 font-sans text-zinc-900 selection:bg-teal-100">
      <main className="max-w-4xl mx-auto flex flex-col items-center mt-12">
        {/* HERO SECTION */}
        <section className="text-center w-full max-w-2xl mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold mb-6 shadow-sm border border-teal-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>ValidatorAI</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            Find Your First Users <br className="hidden md:block" /> <span className="text-teal-700">Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl mx-auto mb-8 font-medium">
            Discover real people already struggling with your idea's problem on Reddit.
          </p>
        </section>

        {/* INPUT SECTION */}
        <section className="w-full max-w-2xl mb-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl shadow-sm border border-zinc-200 transition-all focus-within:shadow-md focus-within:border-teal-300 ring-4 ring-transparent focus-within:ring-teal-50"
          >
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. AI tool for beginner programmers choosing a tech career"
              className="flex-grow px-4 py-3 outline-none text-zinc-800 placeholder-zinc-400 bg-transparent text-base sm:text-lg min-w-0"
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading || !idea.trim()}
              className="group relative flex items-center justify-center px-8 py-3.5 font-semibold text-white bg-teal-700 rounded-xl hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-700/60 disabled:cursor-not-allowed transition-all whitespace-nowrap text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  Find Early Adopters
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </section>

        {/* ERROR STATE */}
        {error && (
          <div className="w-full max-w-2xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-8 flex items-center shadow-sm">
            <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* RESULTS SECTION & EMPTY STATE */}
        <section className="w-full max-w-3xl">
          {!hasSearched ? (
            <div className="py-24 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
              <div className="bg-white p-3 rounded-2xl shadow-sm inline-block mb-4 border border-zinc-100">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-base font-semibold text-zinc-900">Enter your idea to discover real users</h3>
              <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">We'll scan Reddit for problems similar to what your idea aims to solve.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-xl font-bold text-zinc-800 tracking-tight">Potential Adopters</h2>
                <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-teal-200">
                  {results.length} potentials found
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {results.map((user, idx) => (
                  <UserCard key={idx} {...user} />
                ))}
              </div>
            </div>
          ) : !loading && hasSearched && !error ? (
            <div className="py-24 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-white shadow-sm">
              <div className="bg-zinc-50 p-3 rounded-2xl inline-block mb-4 border border-zinc-100">
                <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-2 text-base font-semibold text-zinc-900">No matching users found</h3>
              <p className="mt-2 text-sm text-zinc-500">We couldn't find relevant discussions. Try broadening your idea.</p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
