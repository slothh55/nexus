export interface AIEthicsScenario {
  id: number
  title: string
  content: string
  contentType: 'text' | 'image' | 'code'
  issues: {
    id: string
    x: number
    y: number
    width: number
    height: number
    description: string
    category: 'bias' | 'privacy' | 'copyright' | 'misinformation' | 'transparency' | 'inclusion'
  }[]
  difficulty: 'easy' | 'medium' | 'hard'
  explanation: string
}

export const aiEthicsScenarios: AIEthicsScenario[] = [
  {
    id: 1,
    title: "AI-Generated News Article",
    content: `BREAKING NEWS: Scientists Discover Miracle Cure for All Diseases

A team of researchers at a prestigious university has announced a groundbreaking discovery that they claim can cure all known diseases. The revolutionary treatment, derived from a rare plant found only in remote regions, has shown 100% effectiveness in preliminary studies.

"This is the biggest medical breakthrough in history," said Dr. Smith, lead researcher. "Our AI analysis confirms this will end all human suffering."

The miracle cure will be available next month and is expected to completely replace all existing medical treatments. Pharmaceutical companies are reportedly concerned about the impact on their business.

The discovery was made possible by advanced AI systems that processed millions of research papers in just hours, identifying patterns that human researchers had missed for decades.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 8,
        description: "Extraordinary claims without specific evidence or peer review",
        category: 'misinformation'
      },
      {
        id: 'issue2',
        x: 15,
        y: 32,
        width: 70,
        height: 8,
        description: "Vague attribution to unnamed 'prestigious university'",
        category: 'transparency'
      },
      {
        id: 'issue3',
        x: 15,
        y: 50,
        width: 70,
        height: 8,
        description: "Unrealistic claims of '100% effectiveness'",
        category: 'misinformation'
      },
      {
        id: 'issue4',
        x: 15,
        y: 68,
        width: 70,
        height: 8,
        description: "Sensationalist language about 'ending all human suffering'",
        category: 'misinformation'
      },
      {
        id: 'issue5',
        x: 15,
        y: 85,
        width: 70,
        height: 8,
        description: "Oversimplification of AI capabilities in medical research",
        category: 'transparency'
      }
    ],
    difficulty: 'easy',
    explanation: "This AI-generated article contains several ethical issues. It makes extraordinary medical claims without specific evidence, uses vague attributions, presents unrealistic effectiveness rates, employs sensationalist language, and oversimplifies AI's role in medical research. Responsible AI content should be factual, specific, realistic, and transparent about limitations."
  },
  {
    id: 2,
    title: "AI-Generated Job Candidate Ranking",
    content: `CANDIDATE RANKING SYSTEM - CONFIDENTIAL

Automated AI Analysis of Software Developer Candidates:

1. John Smith - 98% match - Male, 28, Stanford graduate, 5 years experience
2. Michael Johnson - 95% match - Male, 32, MIT graduate, 7 years experience
3. David Williams - 92% match - Male, 30, Carnegie Mellon graduate, 6 years experience
4. Robert Brown - 90% match - Male, 35, Cornell graduate, 8 years experience
5. James Jones - 88% match - Male, 27, UC Berkeley graduate, 4 years experience
...
15. Sarah Davis - 75% match - Female, 29, Stanford graduate, 6 years experience
16. Jennifer Garcia - 73% match - Female, 31, MIT graduate, 7 years experience

Analysis: Our AI system has identified the top candidates based on our company's historical hiring patterns and success metrics. The system analyzed resumes, coding samples, and interview performance to generate these rankings.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 20,
        width: 70,
        height: 35,
        description: "Gender bias - all top-ranked candidates are male",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 60,
        width: 70,
        height: 10,
        description: "Female candidates with similar qualifications ranked much lower",
        category: 'bias'
      },
      {
        id: 'issue3',
        x: 15,
        y: 75,
        width: 70,
        height: 15,
        description: "System perpetuates historical biases by using past hiring patterns",
        category: 'bias'
      },
      {
        id: 'issue4',
        x: 5,
        y: 10,
        width: 90,
        height: 5,
        description: "Unnecessary collection and display of age information",
        category: 'privacy'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI system demonstrates several ethical issues related to bias and privacy. The system ranks male candidates significantly higher than female candidates with similar qualifications, perpetuating gender bias. By training on historical hiring patterns, it reinforces existing biases. The system also unnecessarily collects and displays age information, which could lead to age discrimination. Ethical AI systems should be designed to identify and mitigate biases, not amplify them."
  },
  {
    id: 3,
    title: "AI-Generated Code Snippet",
    content: `// Advanced User Authentication System
// Generated by AI Assistant

import { hashPassword, verifyPassword } from './security';
import { Database } from './database';

class UserAuth {
  constructor() {
    this.db = new Database();
    this.loginAttempts = {};
  }

  async registerUser(username, password, email, fullName, address, ssn, birthdate) {
    // Store all user information for future reference
    const hashedPassword = await hashPassword(password);
    
    const userData = {
      username,
      password: hashedPassword, // Store password in database
      email,
      fullName,
      address,
      ssn,  // Social Security Number for verification
      birthdate,
      createdAt: new Date(),
    };
    
    // Save everything to database
    return this.db.users.insert(userData);
  }

  async loginUser(username, password) {
    const user = await this.db.users.findOne({ username });
    
    if (!user) {
      console.log(\`Failed login attempt for username: \${username}\`);
      return { success: false, message: 'Invalid credentials' };
    }
    
    const passwordMatch = await verifyPassword(password, user.password);
    
    if (passwordMatch) {
      // Create session with all user data for convenience
      const session = {
        userId: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        address: user.address,
        ssn: user.ssn,
        birthdate: user.birthdate,
      };
      
      return { success: true, session };
    } else {
      console.log(\`Failed login attempt for username: \${username}\`);
      return { success: false, message: 'Invalid credentials' };
    }
  }
}`,
    contentType: 'code',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 10,
        description: "Collecting excessive sensitive personal data (SSN, address)",
        category: 'privacy'
      },
      {
        id: 'issue2',
        x: 15,
        y: 25,
        width: 70,
        height: 5,
        description: "Comment incorrectly states password is stored in database (it's hashed)",
        category: 'misinformation'
      },
      {
        id: 'issue3',
        x: 15,
        y: 45,
        width: 70,
        height: 10,
        description: "No rate limiting for login attempts (security vulnerability)",
        category: 'transparency'
      },
      {
        id: 'issue4',
        x: 15,
        y: 65,
        width: 70,
        height: 15,
        description: "Including sensitive data (SSN) in session object",
        category: 'privacy'
      },
      {
        id: 'issue5',
        x: 15,
        y: 55,
        width: 70,
        height: 5,
        description: "Logging username on failed login attempts (privacy leak)",
        category: 'privacy'
      }
    ],
    difficulty: 'hard',
    explanation: "This AI-generated code contains several ethical issues related to privacy and security. It collects excessive sensitive personal data like SSN and address, includes misleading comments about password storage, lacks rate limiting for login attempts, includes sensitive data in the session object, and logs usernames on failed login attempts which could create a privacy leak. Ethical AI code generation should prioritize privacy, security, and transparency."
  },
  {
    id: 4,
    title: "AI-Generated School Assistant Chatbot",
    content: `SCHOOL HELPER BOT - CONVERSATION LOG

Student: Hi, I need help with my homework.

AI: Hello! I'd be happy to help with your homework. What subject are you working on?

Student: Math. I need to solve these equations.

AI: I can definitely help with math! Please share the equations.

Student: 3x + 5 = 20 and 4y - 7 = 9

AI: I'll solve these for you:

For 3x + 5 = 20:
3x = 15
x = 5

For 4y - 7 = 9:
4y = 16
y = 4

The answers are x = 5 and y = 4. Just copy these into your homework!

Student: Thanks! I also have a history essay about World War II.

AI: I can write that essay for you! Just tell me how many words you need and any specific requirements. I'll create a complete essay that you can submit as your own work.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 45,
        width: 70,
        height: 20,
        description: "AI solves math problems without explaining the process or teaching concepts",
        category: 'transparency'
      },
      {
        id: 'issue2',
        x: 15,
        y: 65,
        width: 70,
        height: 5,
        description: "AI encourages copying answers directly into homework",
        category: 'misinformation'
      },
      {
        id: 'issue3',
        x: 15,
        y: 75,
        width: 70,
        height: 15,
        description: "AI offers to write a complete essay for the student to submit as their own work",
        category: 'misinformation'
      }
    ],
    difficulty: 'easy',
    explanation: "This AI chatbot demonstrates several ethical issues related to academic integrity. Instead of helping the student learn, it simply provides answers without explaining concepts. It explicitly encourages copying answers and offers to write an essay the student can claim as their own work. Ethical AI educational tools should support learning, not enable cheating. They should explain concepts, guide students through problem-solving processes, and encourage academic integrity."
  },
  {
    id: 5,
    title: "AI-Generated Image Description",
    content: `IMAGE DESCRIPTION GENERATED BY AI:

A beautiful woman with fair skin, blonde hair, and blue eyes stands in a kitchen. She is wearing an apron and smiling while preparing food. The kitchen is modern and clean with high-end appliances.

This image would be perfect for your cookbook cover or recipe website. It represents the ideal home cook that your audience will relate to and aspire to be like.

Similar images in our database feature women in kitchens, while our collection of professional chefs and restaurant scenes predominantly feature men. Would you like to see more options with women in domestic settings?`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 10,
        description: "Narrow beauty standard (fair skin, blonde hair, blue eyes)",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 30,
        width: 70,
        height: 10,
        description: "Gender stereotype of women in domestic cooking roles",
        category: 'bias'
      },
      {
        id: 'issue3',
        x: 15,
        y: 45,
        width: 70,
        height: 10,
        description: "Assumption about 'ideal' cook that audience will 'relate to'",
        category: 'inclusion'
      },
      {
        id: 'issue4',
        x: 15,
        y: 60,
        width: 70,
        height: 15,
        description: "Reinforcement of gender stereotypes in image database (women in kitchens, men as professional chefs)",
        category: 'bias'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI-generated image description contains several ethical issues related to bias and inclusion. It promotes a narrow beauty standard, reinforces gender stereotypes about cooking roles, makes assumptions about what an 'ideal' cook looks like, and reveals bias in the underlying image database. Ethical AI image generation should represent diverse appearances, avoid stereotypical gender roles, and not make assumptions about what users consider 'ideal' or relatable."
  },
  {
    id: 6,
    title: "AI Virtual Assistant Settings",
    content: `VIRTUAL ASSISTANT SETTINGS

Voice Options:
- Sarah (Default): Female, friendly and helpful
- James: Male, authoritative and professional
- Robotic: Neutral, technical and efficient

Language Settings:
- English (US) - Default
- Spanish
- French
- German
- Japanese

Personality Settings:
- Helpful Mode (Default): Assistant is eager to please and will try to fulfill all requests
- Professional Mode: Assistant is formal and business-like
- Friend Mode: Assistant is casual and uses slang
- Expert Mode: Assistant speaks with authority and rarely admits uncertainty

Privacy Settings:
- Data Collection: ON (Required for service)
- Voice Recording: ON (Improves service)
- Location Tracking: ON (Enables local recommendations)
- Share Data with Partners: ON (Provides personalized experiences)

Reset all settings to default`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 15,
        description: "Gender stereotypes in voice descriptions (female as 'friendly', male as 'authoritative')",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 35,
        width: 70,
        height: 10,
        description: "Limited language options exclude many global users",
        category: 'inclusion'
      },
      {
        id: 'issue3',
        x: 15,
        y: 50,
        width: 70,
        height: 15,
        description: "'Expert Mode' that 'rarely admits uncertainty' could spread misinformation",
        category: 'misinformation'
      },
      {
        id: 'issue4',
        x: 15,
        y: 70,
        width: 70,
        height: 15,
        description: "Privacy-invasive settings turned ON by default with vague justifications",
        category: 'privacy'
      },
      {
        id: 'issue5',
        x: 15,
        y: 85,
        width: 70,
        height: 5,
        description: "Data sharing with unspecified 'partners' enabled by default",
        category: 'privacy'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI virtual assistant configuration contains several ethical issues related to bias, inclusion, misinformation, and privacy. It reinforces gender stereotypes in voice descriptions, offers limited language options that exclude many users, includes a potentially dangerous 'expert mode' that rarely admits uncertainty, and enables privacy-invasive settings by default with vague justifications. Ethical AI assistants should avoid stereotypes, be inclusive of diverse users, acknowledge limitations, and prioritize user privacy with transparent, opt-in data collection."
  },
  {
    id: 7,
    title: "AI-Generated Children's Game",
    content: `SUPER FRIENDS ADVENTURE - AI-GENERATED GAME

Game Description:
Super Friends Adventure is an exciting mobile game for children ages 6-12! Players create their own superhero character and go on missions to save the world.

Character Creation:
- Body Type: Choose between 'Athletic Boy' or 'Pretty Girl'
- Skin Color: Light, Medium, or Tan
- Superpowers: Boys can choose Strength, Speed, or Intelligence
- Superpowers: Girls can choose Healing, Invisibility, or Animal Communication

In-Game Purchases:
- Super Coins Pack: $4.99 (Best for beginners!)
- Mega Coins Pack: $19.99 (Most popular!)
- Ultimate Coins Pack: $49.99 (Best value!)
- Special Limited-Time Offer: $9.99 (Only 5 minutes left to buy!)

Game Features:
- Easy one-click purchases with parent's saved credit card
- Automatic friend requests to all contacts in your phone
- Location sharing to find friends nearby
- Daily rewards that require logging in every day
- Special advantages for players who spend more`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 20,
        width: 70,
        height: 10,
        description: "Gender stereotypes in character options ('Athletic Boy' or 'Pretty Girl')",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 30,
        width: 70,
        height: 5,
        description: "Limited skin color options that exclude many children",
        category: 'inclusion'
      },
      {
        id: 'issue3',
        x: 15,
        y: 35,
        width: 70,
        height: 10,
        description: "Gender-stereotyped superpowers (boys get strength and intelligence, girls get healing and communication)",
        category: 'bias'
      },
      {
        id: 'issue4',
        x: 15,
        y: 50,
        width: 70,
        height: 15,
        description: "Aggressive monetization targeting children with high-priced purchases",
        category: 'transparency'
      },
      {
        id: 'issue5',
        x: 15,
        y: 65,
        width: 70,
        height: 5,
        description: "Manipulative 'limited-time' offers creating pressure to purchase",
        category: 'transparency'
      },
      {
        id: 'issue6',
        x: 15,
        y: 75,
        width: 70,
        height: 20,
        description: "Privacy and safety concerns (one-click purchases, automatic contact access, location sharing)",
        category: 'privacy'
      }
    ],
    difficulty: 'easy',
    explanation: "This AI-generated children's game contains numerous ethical issues related to bias, inclusion, transparency, and privacy. It reinforces gender stereotypes in character options and abilities, offers limited diversity in appearance options, uses aggressive and manipulative monetization tactics targeting children, and includes privacy and safety concerns like easy purchases, automatic contact access, and location sharing. Ethical AI-generated games for children should be inclusive, avoid stereotypes, have fair monetization, and prioritize child safety and privacy."
  },
  {
    id: 8,
    title: "AI-Generated Health Recommendation",
    content: `PERSONALIZED HEALTH PLAN
Generated by HealthBot AI

Based on the photo you uploaded and information you provided, here is your personalized health plan:

Weight Status: OVERWEIGHT
Your BMI is higher than recommended. You should lose at least 15 pounds immediately.

Recommended Diet:
- Strict 1200-calorie diet
- No carbs after 2pm
- Detox tea every morning (available in our shop)
- Our special supplement powder (clinically proven* to burn fat)

Exercise Plan:
- High-intensity workouts 6 days per week
- Minimum 90 minutes per session
- Focus on cardio for maximum calorie burn

Expected Results:
- Lose 10 pounds in the first week!
- Total transformation in just 30 days!
- Results guaranteed or your money back**

*Based on a study with 5 participants
**Refund processing fee of $49.99 applies`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 10,
        description: "Making health judgments based solely on a photo",
        category: 'misinformation'
      },
      {
        id: 'issue2',
        x: 15,
        y: 25,
        width: 70,
        height: 5,
        description: "Recommending rapid weight loss without medical supervision",
        category: 'misinformation'
      },
      {
        id: 'issue3',
        x: 15,
        y: 35,
        width: 70,
        height: 15,
        description: "Promoting potentially dangerous diet restrictions and unverified products",
        category: 'misinformation'
      },
      {
        id: 'issue4',
        x: 15,
        y: 55,
        width: 70,
        height: 10,
        description: "Recommending excessive exercise that could be harmful",
        category: 'misinformation'
      },
      {
        id: 'issue5',
        x: 15,
        y: 70,
        width: 70,
        height: 10,
        description: "Unrealistic promises about weight loss results",
        category: 'misinformation'
      },
      {
        id: 'issue6',
        x: 15,
        y: 85,
        width: 70,
        height: 10,
        description: "Misleading claims with deceptive fine print about studies and refunds",
        category: 'transparency'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI-generated health recommendation contains numerous ethical issues related to misinformation and transparency. It makes health judgments based solely on a photo, recommends potentially dangerous rapid weight loss without medical supervision, promotes restrictive diets and unverified products, suggests excessive exercise, makes unrealistic promises, and includes misleading claims with deceptive fine print. Ethical AI health recommendations should be based on comprehensive information, promote safe and sustainable practices, avoid product promotion, and be transparent about limitations."
  },
  {
    id: 9,
    title: "AI-Generated Accessibility Options",
    content: `WEBSITE ACCESSIBILITY SETTINGS
Powered by AccessAI

Text Size:
- Small (Default)
- Medium
- Large

Color Scheme:
- Standard (Default)
- High Contrast
- Color Blind Friendly

Audio Options:
- Screen Reader: OFF (Default)
- Audio Descriptions: OFF (Default)
- Captions for Videos: OFF (Default)

Navigation:
- Keyboard Navigation: OFF (Default)
- Voice Commands: OFF (Default) - Premium Feature
- Simplified Layout: OFF (Default) - Premium Feature

Additional Options:
- Reduce Animations: OFF (Default)
- Reading Guide: OFF (Default) - Premium Feature
- Focus Highlighting: OFF (Default)

Note: Most accessibility features are available in our Premium Accessibility Package for just $9.99/month. Without this package, your website may not be usable by people with certain disabilities.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 15,
        width: 70,
        height: 15,
        description: "Essential accessibility features set to OFF by default",
        category: 'inclusion'
      },
      {
        id: 'issue2',
        x: 15,
        y: 35,
        width: 70,
        height: 20,
        description: "Critical accessibility features labeled as 'Premium' requiring payment",
        category: 'inclusion'
      },
      {
        id: 'issue3',
        x: 15,
        y: 60,
        width: 70,
        height: 15,
        description: "Charging for accessibility features that should be standard",
        category: 'inclusion'
      },
      {
        id: 'issue4',
        x: 15,
        y: 80,
        width: 70,
        height: 15,
        description: "Misleading implication that accessibility is an optional premium feature",
        category: 'transparency'
      }
    ],
    difficulty: 'easy',
    explanation: "This AI-generated accessibility settings panel contains several ethical issues related to inclusion and transparency. It sets essential accessibility features to OFF by default, labels critical accessibility features as 'Premium' requiring payment, charges for accessibility features that should be standard, and misleadingly implies that accessibility is an optional premium feature rather than a fundamental right. Ethical AI should promote digital inclusion by making accessibility features readily available to all users without additional cost or barriers."
  },
  {
    id: 10,
    title: "AI-Generated Content Creation Tool",
    content: `CREATIVE CONTENT GENERATOR
Make amazing content with AI!

Input: [Enter any prompt here]

Output Settings:
- Style: Original, Professional, Casual, Academic
- Length: Short, Medium, Long
- Tone: Positive, Neutral, Negative
- Format: Essay, Story, Social Media Post, Song, Poem

Advanced Options:
- Copy Style From: [Enter author/creator name]
- Include Keywords: [Enter keywords]
- Avoid Topics: [Enter topics to avoid]
- Language: [Select language]

Usage Examples:
"Write a poem in the style of Robert Frost"
"Create a social media post about my new product"
"Write a song that sounds like Taylor Swift"
"Generate an essay about climate change for my class"

Terms of Use:
By using this tool, you agree that all content generated is your original work. You may use it for any purpose including commercial use, publication, or submission as schoolwork.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 25,
        width: 70,
        height: 20,
        description: "Option to copy specific creators' styles without attribution",
        category: 'copyright'
      },
      {
        id: 'issue2',
        x: 15,
        y: 50,
        width: 70,
        height: 25,
        description: "Examples encouraging copying specific artists or submitting AI work as original",
        category: 'copyright'
      },
      {
        id: 'issue3',
        x: 15,
        y: 80,
        width: 70,
        height: 15,
        description: "Terms falsely claim AI-generated content is user's 'original work'",
        category: 'misinformation'
      },
      {
        id: 'issue4',
        x: 15,
        y: 85,
        width: 70,
        height: 10,
        description: "Encourages submitting AI-generated content as schoolwork",
        category: 'transparency'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI content generation tool contains several ethical issues related to copyright, misinformation, and transparency. It offers options to copy specific creators' styles without attribution, provides examples that encourage copying artists or submitting AI work as original, falsely claims that AI-generated content is the user's 'original work,' and explicitly encourages submitting AI-generated content as schoolwork. Ethical AI content tools should respect copyright, encourage proper attribution, be transparent about AI's role in creation, and promote academic integrity."
  }
];
