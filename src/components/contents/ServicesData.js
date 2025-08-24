// src/data/servicesDetails.js
const servicesDetails = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "bx bx-devices",
    shortDesc: "Designs and builds the user-facing layout, style, and interactivity of websites.",
    description:
      "Frontend development focuses on creating visually appealing, responsive, and user-friendly interfaces. Developers use HTML, CSS, JavaScript, and modern frameworks like React, Vue, or Angular to build web applications that work seamlessly across devices.",
    features: [
      "Responsive website design",
      "UI/UX improvements",
      "Cross-browser compatibility",
      "Performance optimization",
      "Interactive components"
    ],
    price: "₹10,000 - ₹50,000 (project-based)",
    link: "/booknow",
    cta: "Book Frontend Service"
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "bx bx-server",
    shortDesc: "Handles server-side logic, database management, and APIs for web applications.",
    description:
      "Backend development ensures smooth functioning of applications by managing data, authentication, APIs, and server-side logic. Popular technologies include Node.js, Express, Django, Flask, and databases like MongoDB, MySQL, and PostgreSQL.",
    features: [
      "API development",
      "Database integration",
      "Authentication & authorization",
      "Cloud deployment",
      "Server-side logic"
    ],
    price: "₹15,000 - ₹70,000 (project-based)",
    link: "/booknow",
    cta: "Book Backend Service"
  },
  {
    id: "accounts",
    title: "Accounts Management",
    icon: "fas fa-file-invoice-dollar",
    shortDesc: "Maintains financial records, invoicing, payroll, and tax-related data for organizations.",
    description:
      "Accounts management involves handling financial transactions, bookkeeping, invoicing, tax filing, and payroll management. Professionals use tools like Tally, QuickBooks, or Zoho Books to ensure financial accuracy and compliance.",
    features: [
      "Bookkeeping",
      "Invoice & billing",
      "Payroll management",
      "Tax filing support",
      "Financial reporting"
    ],
    price: "₹8,000 - ₹30,000 (monthly retainer)",
    link: "/booknow",
    cta: "Book Accounting Service"
  },
  {
    id: "digital-card",
    title: "Digital Business Card",
    icon: "fas fa-id-badge",
    shortDesc: "A digital card securely stores personal or business information for easy sharing.",
    description:
      "Digital business cards allow professionals and businesses to share contact information instantly. They are eco-friendly and customizable with QR codes and branding options.",
    features: [
      "Custom design",
      "QR code integration",
      "Contactless sharing",
      "Social media links",
      "Secure storage"
    ],
    price: "₹2,000 - ₹10,000 (one-time setup)",
    link: "/booknow",
    cta: "Create My Digital Card"
  },
  {
    id: "content-writing",
    title: "Content Writing / Copywriting",
    icon: "fas fa-pen-nib",
    shortDesc: "Crafts engaging text for blogs, ads, websites, and social media marketing.",
    description:
      "Content writing helps businesses attract and engage audiences through well-written articles, ads, website content, and SEO blogs. Copywriters also create compelling content for sales and marketing campaigns.",
    features: [
      "SEO-friendly blogs",
      "Website copy",
      "Ad campaigns",
      "Social media captions",
      "Product descriptions"
    ],
    price: "₹500 - ₹2,000 per article",
    link: "/booknow",
    cta: "Hire a Writer"
  },
  {
    id: "social-media",
    title: "Social Media Management",
    icon: "bx bx-share-alt",
    shortDesc: "Plans, creates, and schedules content across social platforms to grow presence.",
    description:
      "Social media management builds brand presence by creating engaging posts, scheduling content, and analyzing performance across platforms like Instagram, Facebook, and Twitter.",
    features: [
      "Content calendar",
      "Post scheduling",
      "Analytics & insights",
      "Engagement tracking",
      "Ad campaign management"
    ],
    price: "₹12,000 - ₹50,000 (monthly)",
    link: "/booknow",
    cta: "Boost My Social Media"
  },
  {
    id: "transcription",
    title: "Transcription / Captioning",
    icon: "fas fa-keyboard",
    shortDesc: "Converts audio or video content into written text for accessibility or clarity.",
    description:
      "Transcription and captioning services convert audio/video into accurate text for accessibility, legal, or business needs. Captions are also essential for YouTube and e-learning platforms.",
    features: [
      "Audio-to-text",
      "Video subtitles",
      "Timestamping",
      "Multi-language support",
      "Closed captioning"
    ],
    price: "₹50 - ₹200 per audio minute",
    link: "/booknow",
    cta: "Get Transcription Service"
  },
  {
    id: "virtual-assistant",
    title: "Virtual Assistance",
    icon: "fas fa-headset",
    shortDesc: "Provides remote support like scheduling, emails, and administrative tasks online.",
    description:
      "Virtual assistants support entrepreneurs and businesses by handling emails, scheduling, customer support, and administrative tasks remotely.",
    features: [
      "Email handling",
      "Calendar management",
      "Data entry",
      "Customer support",
      "Task automation"
    ],
    price: "₹10,000 - ₹40,000 (monthly)",
    link: "/booknow",
    cta: "Hire a Virtual Assistant"
  },
  {
    id: "language",
    title: "Language Tutoring or Translation",
    icon: "fas fa-language",
    shortDesc: "Teaches languages or translates text/audio across different languages with fluency.",
    description:
      "Language tutors teach new languages online, while translators convert text/audio between different languages for business and personal use.",
    features: [
      "Online tutoring",
      "Document translation",
      "Audio translation",
      "Multi-language support",
      "Live conversation practice"
    ],
    price: "₹500 - ₹2,000 per session",
    link: "/booknow",
    cta: "Book Language Service"
  },
  {
    id: "graphic-design",
    title: "Graphic Design (Using Free Tools)",
    icon: "bx bx-paint",
    shortDesc: "Creates visual content using tools like Canva for brands and marketing projects.",
    description:
      "Graphic design services provide logos, social media graphics, posters, and marketing visuals using affordable/free tools like Canva and Figma.",
    features: [
      "Social media graphics",
      "Logo design",
      "Posters & flyers",
      "Brand kits",
      "Infographics"
    ],
    price: "₹1,000 - ₹15,000",
    link: "/booknow",
    cta: "Get My Design"
  },
  {
    id: "blogging",
    title: "Blogging / Affiliate Marketing",
    icon: "fas fa-blog",
    shortDesc: "Writes posts and promotes products to earn commission through affiliate links.",
    description:
      "Blogging involves writing engaging content while monetizing through ads or affiliate marketing. Affiliate marketers earn a commission by promoting products via their blogs or websites.",
    features: [
      "SEO blog writing",
      "Affiliate integration",
      "Content monetization",
      "Audience building",
      "Product reviews"
    ],
    price: "₹500 - ₹5,000 per blog",
    link: "/booknow",
    cta: "Start Blogging"
  },
  {
    id: "data-entry",
    title: "Data Entry / Typing Jobs",
    icon: "fas fa-keyboard",
    shortDesc: "Inputs data accurately into digital systems for administrative or research purposes.",
    description:
      "Data entry services include typing, organizing, and entering data into systems with accuracy and efficiency for business operations.",
    features: [
      "Fast & accurate typing",
      "Spreadsheet management",
      "Database entry",
      "Data cleanup",
      "Admin support"
    ],
    price: "₹5 - ₹15 per entry",
    link: "/booknow",
    cta: "Book Data Entry Service"
  },
  {
    id: "open-source",
    title: "Open Source Contribution",
    icon: "fas fa-code-branch",
    shortDesc: "Collaborates on free software projects to gain experience and build portfolios.",
    description:
      "Open source contribution involves improving or adding features to publicly available software, gaining real-world experience, and building strong portfolios.",
    features: [
      "Bug fixing",
      "Feature development",
      "Documentation writing",
      "Community support",
      "Code review"
    ],
    price: "Free (community-based)",
    link: "/booknow",
    cta: "Start Contributing"
  },
  {
    id: "youtube",
    title: "YouTube or Podcast Creation",
    icon: "fas fa-podcast",
    shortDesc: "Creates and shares video or audio content to educate, entertain, or inspire audiences.",
    description:
      "Creators share videos on YouTube or audio podcasts to reach and engage audiences worldwide. Includes editing, branding, and monetization strategies.",
    features: [
      "Video editing",
      "Audio production",
      "Branding & thumbnails",
      "SEO for videos",
      "Monetization setup"
    ],
    price: "₹5,000 - ₹50,000 (setup)",
    link: "/booknow",
    cta: "Launch My Channel"
  },
  {
    id: "voice-acting",
    title: "Voice Acting / Voiceover Work",
    icon: "fas fa-microphone",
    shortDesc: "Lends voice to narrations, animations, ads, or audiobooks professionally.",
    description:
      "Voice acting services provide narration for commercials, audiobooks, animations, and online content. High-quality microphones and editing tools are used for professional delivery.",
    features: [
      "Narration",
      "Character voices",
      "Commercial voiceovers",
      "Audiobooks",
      "Script reading"
    ],
    price: "₹500 - ₹5,000 per project",
    link: "/booknow",
    cta: "Hire Voice Talent"
  },
  {
    id: "proofreading",
    title: "Proofreading & Editing",
    icon: "fas fa-spell-check",
    shortDesc: "Reviews text to correct grammar, punctuation, and ensure clarity and consistency.",
    description:
      "Proofreading services ensure that text is error-free, grammatically correct, and consistent in tone. Editing goes deeper to improve readability and structure.",
    features: [
      "Grammar correction",
      "Punctuation fixes",
      "Clarity improvement",
      "Style consistency",
      "Plagiarism check"
    ],
    price: "₹1 - ₹2 per word",
    link: "/booknow",
    cta: "Get My Text Edited"
  },
  {
    id: "surveys",
    title: "Online Surveys & Microtasks",
    icon: "fas fa-tasks",
    shortDesc: "Completes small online tasks or surveys to earn income passively.",
    description:
      "Online surveys and microtasks involve completing questionnaires, clicking ads, or doing small online jobs for rewards or income.",
    features: [
      "Survey participation",
      "Ad watching",
      "Small online jobs",
      "Passive income",
      "Flexible work"
    ],
    price: "₹50 - ₹500 per task",
    link: "/booknow",
    cta: "Start Earning Online"
  },
  {
    id: "search-engine",
    title: "Search Engine Evaluation",
    icon: "fas fa-search",
    shortDesc: "Assesses search engine results for relevance, accuracy, and user experience.",
    description:
      "Search engine evaluators rate search results, ads, and AI responses for accuracy and relevance to improve algorithms.",
    features: [
      "Query analysis",
      "Ad evaluation",
      "Content quality rating",
      "Relevance testing",
      "User experience review"
    ],
    price: "₹10,000 - ₹30,000 (monthly)",
    link: "/booknow",
    cta: "Apply as Evaluator"
  },
  {
    id: "courses",
    title: "Online Course Creation",
    icon: "fas fa-chalkboard-teacher",
    shortDesc: "Builds and publishes educational content online to teach skills and earn.",
    description:
      "Course creators design and record structured lessons, quizzes, and video lectures to sell or share knowledge on platforms like Udemy or Teachable.",
    features: [
      "Course planning",
      "Video recording",
      "Quiz creation",
      "Marketing & promotion",
      "E-learning platforms"
    ],
    price: "₹20,000 - ₹1,00,000",
    link: "/booknow",
    cta: "Start My Course"
  },
  {
    id: "counseling",
    title: "Online Counseling",
    icon: "fas fa-user-md",
    shortDesc: "Offers emotional guidance or career advice through virtual sessions and platforms.",
    description:
      "Online counselors provide mental health support, career advice, or life coaching through virtual sessions for individuals or groups.",
    features: [
      "1-on-1 counseling",
      "Career coaching",
      "Mental health guidance",
      "Video & chat sessions",
      "Confidential support"
    ],
    price: "₹500 - ₹2,000 per session",
    link: "/booknow",
    cta: "Book a Counseling Session"
  },
  {
    id: "resume",
    title: "Resume Writing & LinkedIn Optimization",
    icon: "fas fa-id-card",
    shortDesc: "Crafts professional resumes and profiles to boost job search success.",
    description:
      "Resume writers create polished resumes and optimize LinkedIn profiles for better visibility, ATS compliance, and recruiter attention.",
    features: [
      "ATS-friendly resume",
      "LinkedIn optimization",
      "Cover letter writing",
      "Career branding",
      "Keyword optimization"
    ],
    price: "₹1,000 - ₹5,000",
    link: "/booknow",
    cta: "Upgrade My Resume"
  },
  {
    id: "ebook",
    title: "Ebook Writing",
    icon: "fas fa-book",
    shortDesc: "Authors digital books to inform, entertain, or market products and services.",
    description:
      "Ebook writing services include ghostwriting, formatting, and publishing ebooks for Amazon Kindle, blogs, or businesses.",
    features: [
      "Ghostwriting",
      "Editing & proofreading",
      "Ebook formatting",
      "Cover design",
      "Publishing support"
    ],
    price: "₹5,000 - ₹50,000",
    link: "/booknow",
    cta: "Get My Ebook Written"
  }
];

export default servicesDetails;
