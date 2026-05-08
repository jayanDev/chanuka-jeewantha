import type { Checklist } from "./checklists";

export const linkedinProfileOptimizationChecklist: Checklist = {
  slug: "linkedin-profile-optimization",
  title: "LinkedIn Profile Optimization System",
  subtitle: "Complete checklist and AI prompt playbook for a recruiter-ready LinkedIn profile",
  description:
    "A practical LinkedIn profile optimization system with 10 profile sections, 50 action items, AI prompts, and clear implementation tips. Use it to improve profile completion, recruiter search visibility, personal branding, and inbound opportunity flow.",
  coverImage: "/images/Linkedin Profile Optimization System.jpg",
  freeSteps: 2,
  highlights: [
    "10 LinkedIn profile sections with a 50-item optimization checklist",
    "AI prompts for profile photo, headline, About, experience, skills, recommendations, content, and settings",
    "Cleaned Sinhala and English guidance based on the original PDF content",
    "Progress tracking with sign-in unlock for the full checklist",
    "Built for job seekers, professionals, freelancers, consultants, and personal brands",
  ],
  steps: [
    {
      id: 1,
      title: "Profile Photo & Banner Image",
      description: "First impression within seconds: professional headshot, brand fit, banner, and profile frame.",
      free: true,
      items: [
        {
          id: "linkedin-1",
          text: "Upload a high-quality professional headshot.",
          priority: "High",
          details: [
            "Use a clear 400 x 400 px or higher image with good lighting, a natural smile, and a simple background.",
            "ඔබගේ profile photo එක පැහැදිලි, වෘත්තීය, සහ recruiter කෙනෙකුට විශ්වාසය දෙන ආකාරයට තබන්න.",
          ],
          prompt:
            "Review this photo: [upload your photo]. Does it align with a [role title] in [industry]? Suggest specific improvements to attire, background, and expression to strengthen my professional brand.",
          tip: "Avoid group crops, sunglasses, heavy filters, and casual backgrounds. Dress one level above your target role.",
        },
        {
          id: "linkedin-2",
          text: "Make sure the photo matches your professional brand.",
          priority: "High",
          details: [
            "Your photo should support the role, industry, and level you want to be known for.",
            "Job seeker, executive, freelancer, and consultant profiles need slightly different visual positioning.",
          ],
          prompt:
            "I am targeting [role/industry]. Describe the ideal LinkedIn profile photo style for this target, including clothing, background, expression, crop, and visual tone.",
          tip: "A strong photo makes the profile feel active and trustworthy before the visitor reads any text.",
        },
        {
          id: "linkedin-3",
          text: "Design a custom LinkedIn banner at 1584 x 396 px.",
          priority: "High",
          details: [
            "Use the banner to show your name, target role, core value, service area, or one clear CTA.",
            "Canva's free LinkedIn banner templates are enough if the design stays clean and readable.",
          ],
          prompt:
            "Create 5 LinkedIn banner concepts for a [role] in [industry]. Include headline text, supporting text, visual style, and one CTA for each concept.",
          tip: "The banner should not be crowded. One message is stronger than five tiny messages.",
        },
        {
          id: "linkedin-4",
          text: "Add a LinkedIn profile frame only when it supports your goal.",
          priority: "Low",
          details: [
            "Use Open to Work, Hiring, or other frames only when the signal helps your current situation.",
            "ඔබගේ වෘත්තීය අරමුණට ගැළපෙන්නේ නම් පමණක් profile frame එක භාවිත කරන්න.",
          ],
          prompt:
            "Suggest the best LinkedIn profile frame for a [role] who wants to [get hired / grow network / build brand]. Explain what each frame communicates to visitors.",
          tip: "Frames can help job seekers and hiring managers, but they should not weaken an executive or consultant positioning.",
        },
      ],
    },
    {
      id: 2,
      title: "Headline",
      description: "The most searchable profile line: keywords, audience, value, and positioning under 220 characters.",
      free: true,
      items: [
        {
          id: "linkedin-5",
          text: "Write a keyword-rich, value-driven headline.",
          priority: "High",
          details: [
            "Include 2-3 high-search keywords and a clear outcome you help create.",
            "Headline එක recruiter search ranking සඳහා ඉතා වැදගත් නිසා generic words අඩු කර role keywords භාවිත කරන්න.",
          ],
          prompt:
            "Write 5 LinkedIn headline variations for a [your job title] with [X years] of experience in [industry]. Each must be under 220 characters, contain 2-3 high-search keywords, communicate clear value, and avoid cliches like 'passionate' or 'results-driven'.",
          tip: "Test multiple headline versions over two-week periods and compare profile views.",
        },
        {
          id: "linkedin-6",
          text: "Include the top keywords recruiters actually search.",
          priority: "High",
          details: [
            "Collect repeated words from job descriptions, recruiter posts, and profiles of strong candidates in your field.",
            "Keywords ඔබගේ headline, About, Experience, Skills තුළ ස්වාභාවිකව repeat වීම profile discoverability වැඩි කරයි.",
          ],
          prompt:
            "List the top 15 keywords recruiters use on LinkedIn when searching for a [job title] in [industry/location]. Rank them by likely search value. Show me exactly how to embed the top 5 naturally into a 220-character headline.",
          tip: "Use phrases that appear in five or more relevant job posts.",
        },
        {
          id: "linkedin-7",
          text: "Tailor the headline to your primary audience.",
          priority: "Medium",
          details: [
            "A job seeker headline should speak to recruiters. A founder or freelancer headline should speak to clients and partners.",
            "ඔබ සේවය කරන්නේ කාටද සහ ලබාදෙන outcome එක කුමක්ද කියන දෙක headline එකෙන් පැහැදිලි විය යුතුය.",
          ],
          prompt:
            "I am targeting [recruiters / potential clients / industry peers]. Rewrite my current headline - [paste your headline] - to speak directly to that audience's pain points and what they gain from connecting with me.",
          tip: "Do not try to serve every audience in one line. Pick the audience that matters most now.",
        },
      ],
    },
    {
      id: 3,
      title: "About Section",
      description: "Your professional story: hook, proof, value, keywords, CTA, and mobile-friendly formatting.",
      free: false,
      items: [
        {
          id: "linkedin-8",
          text: "Write a scroll-stopping opening hook in the first 2-3 lines.",
          priority: "High",
          details: [
            "Only the first part shows before 'See more', so make it direct, specific, and benefit-led.",
            "Opening එක recruiter කෙනෙකුට continue කර කියවීමට හේතුවක් දිය යුතුය.",
          ],
          prompt:
            "Write an opening hook for my LinkedIn About section. I am a [role] who helps [target audience] achieve [outcome]. The first 2 sentences must stop a recruiter from scrolling, be in active voice, and tease the reader to click 'see more'. Do not start with 'I'.",
          tip: "Treat the opening like an ad headline, not a biography opening.",
        },
        {
          id: "linkedin-9",
          text: "Write your full professional story using Hook, Story, Proof, Value, and CTA.",
          priority: "High",
          details: [
            "Use short paragraphs and first-person language. Explain who you help, what you do, and proof that you can deliver.",
            "Achievement, strengths, target audience, and CTA එක clearly structure කරන්න.",
          ],
          prompt:
            "Write a full LinkedIn About section using: Name: [name], Role: [role], Industry: [industry], Top 3 achievements: [list], Unique strengths: [list], Who I help: [audience], CTA goal: [get hired / get clients]. Structure: Hook -> My Story -> Proof of Impact -> What I Offer -> CTA. Keep it under 2,400 characters.",
          tip: "Most readers are on mobile. Keep each paragraph to 2-3 lines.",
        },
        {
          id: "linkedin-10",
          text: "Add a clear call-to-action at the end.",
          priority: "Medium",
          details: [
            "Tell people what to do next: connect, message, email, view portfolio, book a call, or discuss roles.",
            "CTA එක නැති profile එකක් visitor කෙනෙකුට next step එකක් නොදෙන profile එකක් වේ.",
          ],
          prompt:
            "Write 3 closing CTA lines for my LinkedIn About section. My goal is [get hired as X / attract clients for Y / grow my network in Z]. Each CTA should be direct, confident, and include my email or a prompt to connect.",
          tip: "A clear CTA can increase inbound messages because visitors know exactly how to act.",
        },
        {
          id: "linkedin-11",
          text: "Embed missing SEO keywords naturally throughout the About section.",
          priority: "High",
          details: [
            "Add role, industry, tools, certifications, service keywords, and outcome words without keyword stuffing.",
            "LinkedIn algorithm එක profile ranking සඳහා keyword relevance බලන නිසා About section එක keyword-rich විය යුතුය.",
          ],
          prompt:
            "Here is my LinkedIn About draft: [paste text]. Identify the top 8 keywords missing that recruiters or clients search for a [role] in [industry]. Rewrite the section naturally embedding all 8 keywords without keyword stuffing.",
          tip: "Natural keyword placement is better than repeating the same phrase unnaturally.",
        },
        {
          id: "linkedin-12",
          text: "Format the About section for mobile readability.",
          priority: "Medium",
          details: [
            "Use short blocks, line breaks, a few visual dividers, and bullet-style achievements.",
            "Long walls of text mobile screen එකක කියවීමට අපහසු නිසා scannable format එකක් භාවිත කරන්න.",
          ],
          prompt:
            "Reformat my LinkedIn About section for maximum scannability on mobile. Use 2-3 relevant emojis or text dividers, short bullet points for achievements, and bold key phrases. Keep under 2,400 characters. Original: [paste text].",
          tip: "Use visual dividers carefully. Too many symbols make the profile look unprofessional.",
        },
      ],
    },
    {
      id: 4,
      title: "Featured Section",
      description: "The profile fold portfolio: proof, articles, projects, posts, media, and clickable captions.",
      free: false,
      items: [
        {
          id: "linkedin-13",
          text: "Enable and strategically populate the Featured section.",
          priority: "High",
          details: [
            "Feature your strongest proof: portfolio, top post, article, project, case study, media mention, or service page.",
            "Featured section එක හිස්ව තිබීම profile real estate එකක් නාස්ති කිරීමක් වේ.",
          ],
          prompt:
            "I am a [role]. What should I feature in my LinkedIn Featured section to impress [recruiters / clients / investors]? Give me 5 specific content ideas with a rationale for each, ordered by impact.",
          tip: "Featured appears above Experience, so it can guide visitors before they scroll deeper.",
        },
        {
          id: "linkedin-14",
          text: "Publish a post or article to feature.",
          priority: "High",
          details: [
            "If you have no portfolio item, publish a strong educational post or article and add it to Featured.",
            "Your expertise in a visible post can work like a mini case study.",
          ],
          prompt:
            "Write a 200-word LinkedIn post I can publish and then feature. Topic: my expertise in [topic]. Include a scroll-stopping hook, 3 key actionable insights, and a CTA. Target audience: [audience]. Make it shareable.",
          tip: "Your most-liked post, top article, or portfolio website usually converts best.",
        },
        {
          id: "linkedin-15",
          text: "Write compelling captions for every featured item.",
          priority: "Medium",
          details: [
            "Explain what the item is, why it matters, and what result or proof it shows.",
            "Blank caption එකක් click කිරීමට හේතුවක් නොදෙන නිසා Featured item එකේ value එක අඩු කරයි.",
          ],
          prompt:
            "Write a 1-2 sentence Featured section caption for [project/article/post name]. It should explain what it is, the impact it created, and why a profile visitor should click it.",
          tip: "A caption is the first impression for the item. Do not leave it empty.",
        },
      ],
    },
    {
      id: 5,
      title: "Work Experience",
      description: "Achievement-first, keyword-rich role descriptions with metrics, media, company links, and gap handling.",
      free: false,
      items: [
        {
          id: "linkedin-16",
          text: "Rewrite every role with achievement-based bullet points.",
          priority: "High",
          details: [
            "Use Challenge, Action, Result for each role and replace duties with measurable outcomes.",
            "Responsibilities list එකක් වෙනුවට impact list එකක් ලියන්න.",
          ],
          prompt:
            "Rewrite my job description for [Job Title] at [Company] into 5 achievement-based LinkedIn bullet points. Use the CAR framework: Challenge -> Action -> Result. Quantify every result with numbers. Original bullets: [paste your bullets]. Industry: [industry].",
          tip: "Numbers stop the scroll: revenue, percentage, time saved, team size, customers served.",
        },
        {
          id: "linkedin-17",
          text: "Add metrics and quantifiable results to every role.",
          priority: "High",
          details: [
            "Where exact numbers are unavailable, use verified ranges or realistic approximations you can defend.",
            "Performance reviews, reports, dashboards, and past managers can help you recover real metrics.",
          ],
          prompt:
            "Here are my job responsibilities for [role]: [paste text]. Help me quantify each one. Where I lack exact numbers, suggest credible ranges I can verify, such as 'managed a team of 5-8' or 'reduced costs by approx. 15%'.",
          tip: "Do not invent numbers. Use evidence or conservative estimates.",
        },
        {
          id: "linkedin-18",
          text: "Optimise job descriptions for search visibility.",
          priority: "High",
          details: [
            "Use commonly searched role variants inside the description while keeping the official title honest.",
            "LinkedIn experience description එක තුළ searchable title variants add කළ හැක.",
          ],
          prompt:
            "My official job title is [title] but I functionally work as [real function]. Suggest 3 LinkedIn-optimised title variations I can use in my description, not the official title field, that are honest yet searchable.",
          tip: "Keep official job titles accurate, but describe the functional role clearly.",
        },
        {
          id: "linkedin-19",
          text: "Attach media, links, or documents to each key role.",
          priority: "Medium",
          details: [
            "Add proof such as case studies, product screenshots, presentations, articles, certificates, or project links.",
            "Visual proof text-only descriptions වලට වඩා profile trust වැඩි කරයි.",
          ],
          prompt:
            "What media should I attach to my [role] experience entry to prove my impact? I worked on [describe projects]. Give me 5 specific content ideas I could create or gather as supporting evidence.",
          tip: "Use only materials you are allowed to share publicly.",
        },
        {
          id: "linkedin-20",
          text: "Link all companies to their official LinkedIn pages.",
          priority: "Low",
          details: [
            "Select the official company page in the company field so the logo appears and credibility improves.",
            "Company logo සහ link එක profile එක professional ලෙස පෙන්වයි.",
          ],
          prompt:
            "List all the benefits of linking my employer's LinkedIn company page to my experience entry. How does it affect profile visibility, recruiter discovery, and credibility?",
          tip: "Choose the official page, not a duplicate or empty company page.",
        },
        {
          id: "linkedin-21",
          text: "Address employment gaps proactively.",
          priority: "Medium",
          details: [
            "Frame gaps honestly: freelance work, caregiving, sabbatical, upskilling, career break, or relocation.",
            "Unexplained gaps recruiters ට ප්‍රශ්න ඇති කළ හැකි නිසා positive framing එකක් දෙන්න.",
          ],
          prompt:
            "Review my experience dates and identify any gaps longer than 3 months: [list roles and dates]. For each gap, write a brief, honest description I can add, such as freelance, sabbatical, caregiving, or upskilling, so the gap appears intentional.",
          tip: "Honest explanation is better than hiding dates or creating confusion.",
        },
      ],
    },
    {
      id: 6,
      title: "Education",
      description: "Academic credibility, alumni discovery, certifications, courses, GPA, honours, and awards.",
      free: false,
      items: [
        {
          id: "linkedin-22",
          text: "Complete education entries with useful descriptions.",
          priority: "Medium",
          details: [
            "Add key skills, projects, thesis, extracurricular work, and career relevance.",
            "Education descriptions alumni search සහ academic keyword visibility වැඩි කරයි.",
          ],
          prompt:
            "Write a LinkedIn education description for my [Degree] in [Subject] from [University]. Include key skills learned, notable projects or thesis title, extracurricular activities, and how it prepared me for my career in [industry]. Keep it under 300 characters.",
          tip: "Keep descriptions short and relevant to your current career direction.",
        },
        {
          id: "linkedin-23",
          text: "Add certifications and online courses.",
          priority: "High",
          details: [
            "Prioritise LinkedIn Learning, Coursera, Google, Microsoft, AWS, PMI, or industry-recognised certificates.",
            "Relevant certifications search results වලින් ඔබව හඳුනාගැනීමට උපකාරී වේ.",
          ],
          prompt:
            "I work in [industry/role]. List the top 10 LinkedIn Learning, Coursera, Google, or industry certifications I should complete to strengthen my profile for [target goal: promotion / new role / client attraction]. Prioritise by employer value.",
          tip: "Aim for at least three relevant certifications if your field values formal learning.",
        },
        {
          id: "linkedin-24",
          text: "Add GPA, honours, or awards only when relevant.",
          priority: "Low",
          details: [
            "Include GPA if it is strong and recent, or if you are targeting academic, research, internship, or graduate roles.",
            "Experienced professionals usually get more value from achievements than GPA.",
          ],
          prompt:
            "Should I include my GPA of [X] on LinkedIn given I graduated [X years] ago and work in [industry]? Provide the pros and cons, and if yes, write a professional one-line format I can use.",
          tip: "If GPA is not impressive or not relevant anymore, leave it out.",
        },
      ],
    },
    {
      id: 7,
      title: "Skills & Endorsements",
      description: "Searchable skills, top 3 pinned skills, targeted endorsements, badges, and positioning cleanup.",
      free: false,
      items: [
        {
          id: "linkedin-25",
          text: "Add up to 50 relevant skills and pin your top 3 strategically.",
          priority: "High",
          details: [
            "Include hard skills, tools, methodologies, soft skills, and industry-specific keywords.",
            "Pinned top 3 skills fold line එකට ඉහළින් පෙනෙන නිසා target role එකට ගැළපිය යුතුය.",
          ],
          prompt:
            "I am a [role] in [industry]. Generate a prioritised list of 50 LinkedIn skills I should add, ordered by recruiter search frequency. Include hard skills, soft skills, tools, methodologies, and industry-specific terms.",
          tip: "Profiles with five or more skills can receive more views than profiles with no skills.",
        },
        {
          id: "linkedin-26",
          text: "Request targeted endorsements from colleagues.",
          priority: "Medium",
          details: [
            "Ask people who have seen the specific skill in action. Endorse others first when appropriate.",
            "Top 3 skills සඳහා endorsements 10+ ලබාගැනීම profile credibility වැඩි කරයි.",
          ],
          prompt:
            "Write a personalised LinkedIn message to [name], a [their role], asking them to endorse me for [specific skill]. We worked together on [project]. Make it brief, warm, and specific, not a generic template.",
          tip: "A specific request gets better results than asking for a vague endorsement.",
        },
        {
          id: "linkedin-27",
          text: "Take LinkedIn Skill Assessments to earn verified badges.",
          priority: "High",
          details: [
            "Pass relevant assessments where available so your skills carry stronger proof.",
            "Verified badges recruiter searches තුළ profile trust එක වැඩි කරයි.",
          ],
          prompt:
            "What are the most valued LinkedIn Skill Assessment badges for a [role] in [industry]? Which assessments have the highest impact on recruiter clicks? Give me a preparation strategy for the top 3.",
          tip: "Assessments are free where available, and you can prepare before trying.",
        },
        {
          id: "linkedin-28",
          text: "Remove outdated or irrelevant skills to sharpen positioning.",
          priority: "Medium",
          details: [
            "Too many unrelated skills dilute your target identity and confuse recruiters.",
            "Target role එකට නොගැළපෙන outdated skills ඉවත් කර profile positioning එක sharpen කරන්න.",
          ],
          prompt:
            "Here is my current skills list: [paste skills]. I am targeting [new role/direction]. Identify which skills to remove, which to keep, and which new skills to add. Explain the reasoning.",
          tip: "Curate ruthlessly for the role you want next, not every task you have ever done.",
        },
      ],
    },
    {
      id: 8,
      title: "Recommendations",
      description: "Social proof from managers, colleagues, clients, and direct reports.",
      free: false,
      items: [
        {
          id: "linkedin-29",
          text: "Request at least three strong, specific recommendations.",
          priority: "High",
          details: [
            "Ask managers, colleagues, clients, or stakeholders to speak about different strengths.",
            "Generic recommendation එකකට වඩා specific outcome, skill, සහ project එකක් සඳහන් recommendation එක වටිනාය.",
          ],
          prompt:
            "Write a LinkedIn recommendation request message to my former [manager/colleague/client] [name] at [company]. We worked together on [project/period]. I'd like them to highlight [skill 1], [skill 2], and [achievement]. Make it friendly, specific, and easy to act on.",
          tip: "Provide bullet points so the recommender does not start from a blank page.",
        },
        {
          id: "linkedin-30",
          text: "Draft recommendation templates for recommenders.",
          priority: "High",
          details: [
            "Send an editable draft that the recommender can personalise.",
            "Minor personalisation අවශ්‍ය draft එකක් completion rate වැඩි කරයි.",
          ],
          prompt:
            "Write a LinkedIn recommendation I can send as a draft for [recommender name] to personalise. Highlight my role as [title], key contributions to [project/outcome], and my standout quality of [trait]. Make it authentic, specific, and 100-150 words.",
          tip: "Make the draft honest and easy to edit, not exaggerated.",
        },
        {
          id: "linkedin-31",
          text: "Give recommendations proactively to receive them.",
          priority: "Medium",
          details: [
            "Write genuine recommendations before you urgently need them back.",
            "Reciprocity නිසා proactive recommendations ඉතා ප්‍රයෝජනවත් වේ.",
          ],
          prompt:
            "Write a genuine LinkedIn recommendation for my former [colleague/manager] [name], who is a [their role]. Highlight [their strength 1], [their strength 2], and a specific example from our time at [company]. Keep it professional and 100-120 words.",
          tip: "Start giving before you need a job search boost.",
        },
        {
          id: "linkedin-32",
          text: "Make sure recommendations cover different skills and roles.",
          priority: "Medium",
          details: [
            "Aim for recommendations from managers, peers, clients, and direct reports if possible.",
            "Recommendations එකම skill එක repeat කිරීම වෙනුවට leadership, technical skill, communication, and delivery වගේ areas cover කළ යුතුය.",
          ],
          prompt:
            "Here are my existing LinkedIn recommendations: [paste text]. Identify key skills, roles, or traits not covered. Suggest who from my network I should approach and what aspect of my work they should speak to.",
          tip: "Balanced recommendations create stronger social proof than one type of praise.",
        },
      ],
    },
    {
      id: 9,
      title: "Content Strategy & Creator Mode",
      description: "Creator settings, hashtags, articles, content calendar, and strategic commenting.",
      free: false,
      items: [
        {
          id: "linkedin-33",
          text: "Activate Creator Mode if it supports your positioning.",
          priority: "High",
          details: [
            "Use Creator Mode when you plan to publish consistently or build thought leadership.",
            "Creator Mode follow button, content distribution, newsletter, and live features වලට support කරයි.",
          ],
          prompt:
            "I am a [role] in [industry]. Write my LinkedIn Creator Mode profile tagline under 200 characters stating what topics I create content about and why visitors should follow me. Make it authoritative and specific.",
          tip: "Do not activate features you will not use. Consistency matters.",
        },
        {
          id: "linkedin-34",
          text: "Choose five strategic Creator Mode topic hashtags.",
          priority: "Medium",
          details: [
            "Mix broad hashtags with niche hashtags connected to your target audience.",
            "100K-1M follower hashtags reach broad audiences; 10K-100K niche hashtags can bring more relevant engagement.",
          ],
          prompt:
            "I am a [role] in [industry]. Suggest the 5 best LinkedIn hashtags to attach to my Creator Mode profile. Include approximate follower size categories and explain how they increase my content reach.",
          tip: "Hashtags should describe your expertise, not random trends.",
        },
        {
          id: "linkedin-35",
          text: "Publish your first LinkedIn article.",
          priority: "High",
          details: [
            "LinkedIn articles can be indexed by Google and can support credibility for months.",
            "A strong article should educate, show an opinion, and invite the reader to connect or act.",
          ],
          prompt:
            "Write a 600-word LinkedIn article for a [role] in [industry] on [topic]. Structure it with a compelling SEO headline, personal hook opening, 3 key insights with subheadings, and a CTA. Make it educational, opinionated, and shareable.",
          tip: "Start with a topic your ideal recruiter, client, or industry peer already cares about.",
        },
        {
          id: "linkedin-36",
          text: "Build a four-week content calendar and post consistently.",
          priority: "High",
          details: [
            "Plan text stories, polls, carousel concepts, short videos, lessons, and practical tips.",
            "Consistency always beats one viral post because profile views compound over time.",
          ],
          prompt:
            "Create a 4-week LinkedIn content calendar for a [role] in [industry] targeting [audience]. Include 3 posts per week, a mix of formats, topic ideas, and best posting days/times.",
          tip: "Posting 3-5 times per week can significantly increase profile views if the content is relevant.",
        },
        {
          id: "linkedin-37",
          text: "Comment strategically on industry thought leader posts.",
          priority: "Medium",
          details: [
            "Add insight, ask thoughtful questions, or share a short practical example.",
            "High-engagement posts වල meaningful comments දැමීමෙන් profile views වැඩි විය හැක.",
          ],
          prompt:
            "Write 5 high-value LinkedIn comment templates for posts in [industry]. Each must add a unique insight, ask a thoughtful question, or share a personal experience. Avoid simple agreement. Keep each under 3 sentences.",
          tip: "A smart comment can create more visibility than a weak standalone post.",
        },
      ],
    },
    {
      id: 10,
      title: "Network, URL & Settings",
      description: "Technical discoverability: URL, Open to Work, contact info, recruiter signals, services, SSI, privacy, and notifications.",
      free: false,
      items: [
        {
          id: "linkedin-38",
          text: "Customise your LinkedIn profile URL.",
          priority: "High",
          details: [
            "Use a clean format such as linkedin.com/in/firstname-lastname or a professional brand variation.",
            "Custom URL එක profile එක share කිරීමට සහ CV එකේ link කිරීමට වඩා professional වේ.",
          ],
          prompt:
            "My current LinkedIn URL is [paste URL]. Suggest 5 clean, professional custom URL options using my name [full name] and/or professional brand. What should I do if my preferred URL is already taken?",
          tip: "Go to Edit public profile & URL and choose the cleanest available option.",
        },
        {
          id: "linkedin-39",
          text: "Configure Open to Work signals correctly.",
          priority: "High",
          details: [
            "Choose between public green banner and private recruiter-only signal based on your employment situation.",
            "Private signal එක current employer ට නොපෙනී LinkedIn Recruiter users වෙත පමණක් පෙන්වයි.",
          ],
          prompt:
            "Should I use the public Open to Work green banner or the private recruiter-only signal? I am currently [employed/unemployed] and my goal is [goal]. Give me the pros, cons, and your recommendation.",
          tip: "Be careful with public job-search signals if you are currently employed.",
        },
        {
          id: "linkedin-40",
          text: "Complete contact information and add website links.",
          priority: "High",
          details: [
            "Add professional email, portfolio, booking page, newsletter, website, or service link where relevant.",
            "Website labels 'Portfolio', 'Book a Call', or 'My Newsletter' වගේ clear labels ලෙස තබන්න.",
          ],
          prompt:
            "What contact information should I include on my LinkedIn profile for maximum inbound opportunities? I am a [role] targeting [goal]. List what to include, what to avoid, and how to label website links creatively.",
          tip: "Do not expose private contact details that you are not comfortable making public.",
        },
        {
          id: "linkedin-41",
          text: "Configure Career Interests for recruiter targeting.",
          priority: "High",
          details: [
            "Set target roles, preferred locations, work type, industries, and start availability.",
            "This section is mainly visible to LinkedIn Recruiter users and supports targeted discovery.",
          ],
          prompt:
            "Write my LinkedIn Career Interests section. Target roles: [list 3 roles], preferred locations: [locations], work type: [remote/hybrid/on-site], industries: [industries], start availability: [timeframe].",
          tip: "Keep this aligned with the exact opportunities you want next.",
        },
        {
          id: "linkedin-42",
          text: "Grow your network to 500+ relevant connections.",
          priority: "High",
          details: [
            "Connect with recruiters, hiring managers, industry peers, alumni, clients, and thought leaders.",
            "500+ badge එක second-degree reach සහ professional credibility වැඩි කරයි.",
          ],
          prompt:
            "Write a personalised LinkedIn connection request for [person name], a [their role] at [company]. We [met at / share interest in / I admire their work on X]. Keep it under 300 characters, genuine, and not template-like.",
          tip: "Relevance matters more than random connection count.",
        },
        {
          id: "linkedin-43",
          text: "Join and actively engage in five LinkedIn Groups.",
          priority: "Medium",
          details: [
            "Pick active groups in your industry, location, profession, or target market.",
            "Group posts වලට සතියකට comments 2-3ක් දමා visibility වැඩි කරන්න.",
          ],
          prompt:
            "I am a [role] in [industry/location]. List the top 10 most active LinkedIn Groups I should join. Include approximate member size categories and the type of content that performs best in each.",
          tip: "A group is useful only if people are actively posting and responding.",
        },
        {
          id: "linkedin-44",
          text: "Complete the Services section if you are a freelancer or consultant.",
          priority: "High",
          details: [
            "List your services clearly and describe who you help, what you do, and what outcome clients get.",
            "Services section එක Service Provider searches තුළ පෙන්වීමට සහ Get a quote CTA එකට උපකාරී වේ.",
          ],
          prompt:
            "I offer [list services] as a freelance [role]. Write my LinkedIn Services section description under 500 characters communicating who I help, what I do, and what outcome clients achieve.",
          tip: "This is essential for freelancers, consultants, coaches, and service providers.",
        },
        {
          id: "linkedin-45",
          text: "Add volunteer experience and causes.",
          priority: "Low",
          details: [
            "Volunteer work can show character, leadership, community involvement, and transferable soft skills.",
            "Relevant volunteer work paid experience එකට support signal එකක් ලෙස ක්‍රියා කළ හැක.",
          ],
          prompt:
            "Write a LinkedIn volunteer experience entry for my role as [volunteer role] at [organisation]. Include what the organisation does, my responsibilities, skills developed, and measurable impact. Keep it under 200 words.",
          tip: "Add it when it strengthens your professional story.",
        },
        {
          id: "linkedin-46",
          text: "Add all relevant languages spoken.",
          priority: "Low",
          details: [
            "Language skills can help international, customer-facing, regional, or multilingual roles.",
            "Conversational languages can still be valuable if they match the target market.",
          ],
          prompt:
            "How does adding language proficiencies to my LinkedIn profile improve search visibility and recruiter attraction? I speak [list languages and levels]. Should I add all of them or only professional-level ones?",
          tip: "Represent language levels honestly.",
        },
        {
          id: "linkedin-47",
          text: "Check and improve your LinkedIn SSI Score with a target of 70+.",
          priority: "Medium",
          details: [
            "SSI measures brand, network, insights, and relationship-building activity.",
            "linkedin.com/sales/ssi වෙත ගොස් score එක බලන්න; 70+ target එකක් තබන්න.",
          ],
          prompt:
            "Explain how the LinkedIn SSI score works, what each of the 4 pillars measures, and give me 3 specific weekly actions for each pillar to increase my SSI from [current score] to 70+.",
          tip: "SSI should guide consistent behaviour, not become a vanity metric.",
        },
        {
          id: "linkedin-48",
          text: "Achieve LinkedIn All-Star profile status.",
          priority: "High",
          details: [
            "Complete missing profile sections until the profile completion bar reaches full strength.",
            "All-Star profiles incomplete profiles වලට වඩා opportunities ලබාගැනීමට වැඩි chance එකක් දිය හැක.",
          ],
          prompt:
            "My LinkedIn profile completion is at [X]%. LinkedIn says I am missing: [list missing sections]. For each missing section, write the exact content I should add based on my background: [brief background].",
          tip: "Check the completion bar and fix missing sections before deeper optimization.",
        },
        {
          id: "linkedin-49",
          text: "Configure privacy settings to maximise visibility.",
          priority: "Medium",
          details: [
            "Set profile visibility to public while protecting activity that should not notify your current employer.",
            "Bulk edits කිරීමට පෙර 'Share profile updates' off කර, අවසානයේ අවශ්‍ය නම් on කරන්න.",
          ],
          prompt:
            "Walk me through the exact LinkedIn privacy settings I should configure to be maximally visible to recruiters and connections, while protecting my activity from my current employer.",
          tip: "Visibility and privacy must be balanced. Do not accidentally hide the profile from recruiters.",
        },
        {
          id: "linkedin-50",
          text: "Set smart LinkedIn notification preferences.",
          priority: "Low",
          details: [
            "Enable alerts that support engagement, such as profile views, mentions, and connection requests.",
            "Marketing emails සහ promotional notifications වගේ noise අඩු කර focus එක රැකගන්න.",
          ],
          prompt:
            "What LinkedIn notification settings should I turn on vs. off to maximise engagement opportunities without notification fatigue? I want to stay active and visible but efficient.",
          tip: "Notifications should help you respond faster, not distract you all day.",
        },
      ],
    },
  ],
};
