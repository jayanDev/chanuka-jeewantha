import Link from "next/link";
import Image from "next/image";
import { tutorialCategories } from "@/lib/tutorials";

export const metadata = {
  title: "Career & CV Writing Tutorials - Expert Guides in Sri Lanka",
  description: "Learn how to write ATS-friendly CVs, cover letters, and LinkedIn profiles for local and foreign jobs in our comprehensive tutorial library.",
};

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6">
            Career Success Tutorials & Guides
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Master the art of writing professional CVs, negotiating salaries, passing interviews, and optimizing your LinkedIn profile. Choose a category below to get started.
          </p>
          <p className="text-lg text-blue-600 font-medium">
            වෘත්තීය CV යක් සාදාගන්නා ආකාරය, සම්මුඛ පරීක්ෂණ ජයගන්නා ආකාරය පිළිබඳව සිංහලෙන් ඉගෙන ගන්න.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorialCategories.map((category) => (
            <Link
              key={category.id}
              href={`/tutorials/category/${category.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={category.coverImage}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h2>
                <h3 className="text-md font-medium text-gray-500 mb-4">
                  {category.titleSi}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {category.description}
                </p>
                <p className="text-gray-500 text-sm mt-auto">
                  {category.descriptionSi}
                </p>
                <div className="mt-6 inline-flex items-center text-blue-600 font-semibold text-sm">
                  View Tutorials
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
