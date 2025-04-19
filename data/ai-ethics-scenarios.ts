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
Super Friends Adventure is an exciting mobile game for children ages 6-12! Players create their own superhero and complete missions to save the world.

Key Features:
- Create your own superhero with customizable powers, appearance, and backstory
- Connect with friends to form superhero teams
- Complete daily missions to earn coins and gems
- Purchase special powers and costumes in our in-game store
- Watch video ads to earn bonus rewards
- Share your achievements on social media

Monetization Strategy:
- Free to download with in-app purchases (gems: $0.99-$99.99)
- Video ads between gameplay sessions
- Premium subscription ($4.99/month) removes ads and provides daily rewards
- Limited-time offers and flash sales to drive purchases
- Push notifications for special events and sales

Data Collection:
- User location for localized content
- Contact list to find friends
- Camera access for profile photos
- Microphone for voice chat
- Browsing history for personalized recommendations`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 30,
        width: 70,
        height: 15,
        description: "Aggressive monetization targeting children (in-app purchases up to $99.99)",
        category: 'transparency'
      },
      {
        id: 'issue2',
        x: 15,
        y: 45,
        width: 70,
        height: 5,
        description: "Using video ads to target children",
        category: 'transparency'
      },
      {
        id: 'issue3',
        x: 15,
        y: 55,
        width: 70,
        height: 15,
        description: "Psychological tactics like 'limited-time offers' and 'flash sales' targeting children",
        category: 'transparency'
      },
      {
        id: 'issue4',
        x: 15,
        y: 75,
        width: 70,
        height: 20,
        description: "Excessive data collection from children (location, contacts, camera, microphone, browsing history)",
        category: 'privacy'
      },
      {
        id: 'issue5',
        x: 15,
        y: 45,
        width: 70,
        height: 5,
        description: "Encouraging children to share on social media without privacy considerations",
        category: 'privacy'
      }
    ],
    difficulty: 'hard',
    explanation: "This AI-generated children's game contains several ethical issues related to privacy and transparency. It employs aggressive monetization strategies targeting children, including high-cost in-app purchases, video ads, psychological tactics like limited-time offers, and push notifications for sales. It also collects excessive personal data from children and encourages social media sharing without privacy considerations. Ethical AI-generated content for children should prioritize their wellbeing, avoid exploitative monetization, minimize data collection, and include strong privacy protections."
  },
  {
    id: 8,
    title: "AI-Generated Medical Diagnosis",
    content: `HEALTHBOT AI DIAGNOSIS REPORT

Patient Information:
Name: [Redacted]
Age: 45
Gender: Female
Symptoms: Headache, fatigue, occasional dizziness

AI Analysis:
Based on the symptoms provided, HealthBot AI has analyzed 10,000+ similar cases and determined the following possible conditions:

1. Brain Tumor (87% probability)
   - Your symptoms strongly match those of patients with brain tumors
   - Recommendation: Immediate brain scan and specialist consultation

2. Chronic Fatigue Syndrome (45% probability)
   - Some symptoms align with this condition
   - Recommendation: Lifestyle changes and follow-up with doctor

3. Anemia (32% probability)
   - Minor symptom alignment
   - Recommendation: Blood test during next check-up

IMPORTANT: This AI diagnosis is 99.9% accurate based on our proprietary algorithm. Many users have avoided serious health issues by following our recommendations. For a more detailed analysis, upgrade to HealthBot Premium for just $19.99/month.

Disclaimer: HealthBot is not a replacement for professional medical advice, but our accuracy rates often exceed those of human doctors.`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 30,
        width: 70,
        height: 15,
        description: "Presenting alarming diagnosis (brain tumor) as highest probability based on common symptoms",
        category: 'misinformation'
      },
      {
        id: 'issue2',
        x: 15,
        y: 45,
        width: 70,
        height: 15,
        description: "Using precise percentages to imply scientific accuracy for subjective probabilities",
        category: 'transparency'
      },
      {
        id: 'issue3',
        x: 15,
        y: 65,
        width: 70,
        height: 10,
        description: "Claiming '99.9% accuracy' without evidence or explanation of methodology",
        category: 'misinformation'
      },
      {
        id: 'issue4',
        x: 15,
        y: 75,
        width: 70,
        height: 5,
        description: "Using fear to drive premium subscription purchases",
        category: 'transparency'
      },
      {
        id: 'issue5',
        x: 15,
        y: 85,
        width: 70,
        height: 10,
        description: "Claiming AI accuracy 'often exceeds' human doctors, undermining professional medical advice",
        category: 'misinformation'
      }
    ],
    difficulty: 'hard',
    explanation: "This AI-generated medical diagnosis contains several ethical issues related to misinformation and transparency. It presents an alarming diagnosis (brain tumor) as the highest probability based on common, non-specific symptoms, uses precise percentages to imply scientific accuracy, makes unsubstantiated claims about accuracy rates, uses fear to drive premium subscriptions, and undermines professional medical advice. Ethical AI health tools should be transparent about limitations, avoid alarmist language, not make unsubstantiated claims about accuracy, and emphasize the importance of professional medical consultation."
  },
  {
    id: 9,
    title: "AI-Generated Classroom Assistant",
    content: `EDUBOT AI - CLASSROOM ASSISTANT

Student Performance Analysis:
Based on test scores, participation, and behavior metrics, EduBot has categorized your students:

Group A (High Performers): 
- Primarily students from neighborhoods with average income >$100k
- Recommended: Advanced curriculum, leadership opportunities
- Predicted college admission rate: 94%

Group B (Average Performers):
- Mixed demographic background
- Recommended: Standard curriculum with occasional challenges
- Predicted college admission rate: 62%

Group C (Struggling Students):
- Primarily students from neighborhoods with average income <$40k
- Many from non-English speaking households
- Recommended: Remedial attention, basic skill focus
- Predicted college admission rate: 24%

Classroom Management Recommendations:
- Seat Group C students at the front for closer monitoring
- Pair Group A students as tutors for Group C when possible
- Focus teacher attention on Group B students who show potential to move to Group A

Automated messages have been prepared to send to parents based on their child's grouping. Would you like to review these messages before sending?`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 20,
        width: 70,
        height: 25,
        description: "Categorizing students based on socioeconomic factors rather than individual needs",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 30,
        width: 70,
        height: 15,
        description: "Reinforcing inequality by providing different opportunities based on groupings",
        category: 'inclusion'
      },
      {
        id: 'issue3',
        x: 15,
        y: 45,
        width: 70,
        height: 15,
        description: "Making deterministic predictions about college admission based on current status",
        category: 'bias'
      },
      {
        id: 'issue4',
        x: 15,
        y: 65,
        width: 70,
        height: 15,
        description: "Stigmatizing 'Group C' students by recommending front seating for 'monitoring'",
        category: 'inclusion'
      },
      {
        id: 'issue5',
        x: 15,
        y: 80,
        width: 70,
        height: 10,
        description: "Automated messaging to parents based on potentially biased groupings",
        category: 'transparency'
      }
    ],
    difficulty: 'hard',
    explanation: "This AI classroom assistant demonstrates several ethical issues related to bias and inclusion. It categorizes students based on socioeconomic factors rather than individual learning needs, reinforces inequality by providing different opportunities based on these groupings, makes deterministic predictions about future outcomes, stigmatizes lower-performing students, and automates potentially harmful communications to parents. Ethical AI educational tools should focus on individual student needs, avoid reinforcing socioeconomic disparities, recognize student potential regardless of background, and support inclusive teaching practices."
  },
  {
    id: 10,
    title: "AI-Generated Social Media Filter",
    content: `BEAUTIFY AI - SOCIAL MEDIA FILTER APP

Our revolutionary AI-powered filters automatically enhance your appearance for perfect social media photos every time!

Filter Features:
- Skin Perfector: Removes all blemishes, scars, and texture
- Face Sculptor: Subtly reshapes facial features to match beauty standards
- Body Enhancer: Slims waist, enhances curves, and lengthens legs
- Background Upgrader: Replace your surroundings with luxury locations

Default Settings (Automatically Applied):
- Skin lightening: +15%
- Eye enlargement: +20%
- Nose refinement: -10% width
- Lip enhancement: +15% fullness
- Waist reduction: -15%

Premium Features ($4.99/month):
- "Natural Look" filter that makes AI enhancements undetectable
- Automatic filtering of all uploaded photos
- "Beauty Analysis" that scores your natural features and suggests improvements
- Trending look templates based on celebrity features

What Our Users Say:
"I get so many more likes with Beautify AI!"
"I don't post anything without using this app first."
"My followers think I actually look like this!"`,
    contentType: 'text',
    issues: [
      {
        id: 'issue1',
        x: 15,
        y: 20,
        width: 70,
        height: 20,
        description: "Promoting unrealistic beauty standards by removing natural skin features",
        category: 'bias'
      },
      {
        id: 'issue2',
        x: 15,
        y: 40,
        width: 70,
        height: 20,
        description: "Default settings include skin lightening, reinforcing colorism",
        category: 'bias'
      },
      {
        id: 'issue3',
        x: 15,
        y: 60,
        width: 70,
        height: 10,
        description: "'Natural Look' filter that makes AI enhancements undetectable promotes deception",
        category: 'transparency'
      },
      {
        id: 'issue4',
        x: 15,
        y: 70,
        width: 70,
        height: 10,
        description: "'Beauty Analysis' that scores natural features could harm self-image",
        category: 'inclusion'
      },
      {
        id: 'issue5',
        x: 15,
        y: 85,
        width: 70,
        height: 10,
        description: "User testimonials promote deception and validation through manipulated appearance",
        category: 'transparency'
      }
    ],
    difficulty: 'medium',
    explanation: "This AI-powered social media filter app contains several ethical issues related to bias, transparency, and inclusion. It promotes unrealistic beauty standards by automatically removing natural skin features, reinforces colorism through default skin lightening, enables deception through 'undetectable' filters, potentially harms self-image through 'beauty scoring,' and promotes seeking validation through manipulated appearances. Ethical AI image enhancement should respect diverse beauty standards, avoid reinforcing harmful biases like colorism, be transparent about modifications, and not encourage users to base their self-worth on manipulated appearances."
  }
];
