import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { tutorialCategories, tutorials } from "@/lib/tutorials";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = tutorialCategories.find((c) => c.slug === categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.title} | Expert Tutorials`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = tutorialCategories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Get tutorials belonging to this category
  const categoryTutorials = tutorials.filter((t) => t.categoryId === category.id);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link href="/tutorials" className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Category List
          </Link>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{category.title}</h1>
            <h2 className="text-2xl text-gray-600 font-medium mb-4">{category.titleSi}</h2>
            <p className="text-lg text-gray-700">{category.description}</p>
          </div>
        </div>

        {categoryTutorials.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">More tutorials coming soon!</h3>
            <p className="text-gray-500">We are currently writing expert guides for this section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {categoryTutorials.map((tut) => (
              <div key={tut.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 min-h-[250px] md:min-h-auto">
                  <Image 
                    src={tut.coverImage} 
                    alt={tut.en.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      <Link href={`/tutorials/${tut.en.slug}`} className="hover:text-blue-600 transition-colors">
                        {tut.en.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600">{tut.en.intro.substring(0, 120)}...</p>
                  </div>
                  
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      <Link href={`/tutorials/${tut.si.slug}`} className="hover:text-blue-600 transition-colors">
                        {tut.si.title}
                      </Link>
                    </h4>
                    <p className="text-gray-600 text-sm font-sinhala">{tut.si.intro.substring(0, 120)}...</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-auto">
                    <Link 
                      href={`/tutorials/${tut.en.slug}`}
                      className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Read in English
                    </Link>
                    <Link 
                      href={`/tutorials/${tut.si.slug}`}
                      className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-primary text-primary text-sm font-bold rounded-lg hover:bg-gray-50 transition"
                    >
                      සිංහලෙන් කියවන්න
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
