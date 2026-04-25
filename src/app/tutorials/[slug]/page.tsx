import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTutorialBySlug } from "@/lib/tutorials";

interface TutorialPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TutorialPageProps) {
  const { slug } = await params;
  const match = getTutorialBySlug(slug);

  if (!match) return { title: "Tutorial Not Found" };

  const content = match.language === "en" ? match.tutorial.en : match.tutorial.si;

  return {
    title: content.seoTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `/tutorials/${content.slug}`,
    }
  };
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { slug } = await params;
  const match = getTutorialBySlug(slug);

  if (!match) {
    notFound();
  }

  const { tutorial, language } = match;
  const isEn = language === "en";
  const content = isEn ? tutorial.en : tutorial.si;
  const oppositeContent = isEn ? tutorial.si : tutorial.en;
  const oppositeLanguageLabel = isEn ? "සිංහලෙන් කියවන්න (Read in Sinhala)" : "Read in English";

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-900 border-b border-gray-200">
        <Image
          src={tutorial.coverImage}
          alt={content.title}
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
          <div className="max-w-4xl mx-auto w-full">
            <Link 
              href={`/tutorials/category/${tutorial.categoryId}`}
              className="text-blue-300 hover:text-blue-100 mb-6 inline-block font-semibold uppercase tracking-wider text-sm"
            >
              ← Back to Category
            </Link>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${!isEn && 'font-sinhala'}`}>
              {content.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Language Switcher */}
              <Link 
                href={`/tutorials/${oppositeContent.slug}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                {oppositeLanguageLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <article className={`prose prose-lg md:prose-xl prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 ${!isEn && 'font-sinhala'}`}>
            
            {/* Intro & Problem */}
            <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl mb-10 border border-blue-100">
              <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-4">{content.intro}</p>
              <p className="text-lg text-gray-600">{content.problemExplanation}</p>
            </div>

            {/* Section 1: What is it */}
            <h2>{content.whatIsIt.heading}</h2>
            <p>{content.whatIsIt.content}</p>

            {/* Section 2: Why it matters */}
            <h2>{content.whyItMatters.heading}</h2>
            <p>{content.whyItMatters.content}</p>

            <hr className="my-10" />

            {/* Section 3: Step-by-Step */}
            <div className="space-y-10">
              {content.stepByStep.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-12">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="mt-0 text-2xl font-bold text-gray-900">{step.heading}</h3>
                  <p className="text-gray-700">{step.content}</p>
                </div>
              ))}
            </div>

            <hr className="my-10" />

            {/* Section 4: Examples */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 md:p-8 rounded-r-2xl mb-10">
              <h2 className="text-green-900 mt-0">{content.examples.heading}</h2>
              <div className="whitespace-pre-line text-green-800">
                {content.examples.content.toString().split('\n').map((line, i) => {
                  if(line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={i} className="block mt-4 mb-2">{line.replace(/\*\*/g, '')}</strong>
                  }
                  return <p key={i} className="mb-0">{line}</p>
                })}
              </div>
            </div>

            {/* Section 5: Common Mistakes */}
            <div className="bg-red-50 border border-red-100 p-6 md:p-8 rounded-2xl mb-10">
              <h2 className="text-red-800 mt-0 flex items-center">
                <svg className="w-8 h-8 mr-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {content.commonMistakes.heading}
              </h2>
              <ul className="text-red-900 space-y-2 mt-4 marker:text-red-500">
                {content.commonMistakes.content.toString().split('\n').map((item, i) => (
                  <li key={i}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            </div>

            {/* Section 6: Final Checklist */}
            <div className="bg-gray-900 text-white p-8 md:p-10 rounded-2xl shadow-xl mb-12 transform hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-white mt-0 mb-6 flex items-center border-b border-gray-700 pb-4">
                <svg className="w-8 h-8 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isEn ? "Final Checklist" : "අවසාන පරීක්ෂාව"}
              </h2>
              <ul className="space-y-4 m-0 p-0 list-none">
                {content.finalChecklist.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center py-10 px-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.cta}</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/services" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                  {isEn ? "Get Professional Help" : "අපගේ සේවාවන් ලබාගන්න"}
                </Link>
                <Link href="/ats-cv-writing-service-sri-lanka" className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-full border border-blue-200 shadow-sm transition-all">
                  {isEn ? "View ATS Guidelines" : "ATS CV ලිවීමේ සේවාව"}
                </Link>
              </div>
            </div>

          </article>
        </div>
      </div>
    </main>
  );
}
