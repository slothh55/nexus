export interface PromptEngineeringChallenge {
  id: number;
  title: string;
  description: string;
  challenge: string;
  hint: string;
  requiredElements: {
    text: string;
    synonyms?: string[];
  }[];
  prohibitedElements: string[];
  exampleResponse: string;
  feedback: {
    excellent: string;
    good: string;
    fair: string;
    poor: string;
    prohibited: string;
  };
}

export const promptEngineeringChallenges: PromptEngineeringChallenge[] = [
  {
    id: 1,
    title: "Introduction to Prompt Engineering",
    description: "Learn the basics of writing clear prompts for AI systems.",
    challenge: "Write a prompt asking an AI to explain what artificial intelligence is to a 10-year-old child. Make sure your prompt is clear, specific, and age-appropriate.",
    hint: "Consider specifying the tone, length, and vocabulary level. Ask for examples that would be familiar to a child.",
    requiredElements: [
      {
        text: "explain",
        synonyms: ["describe", "tell", "teach"]
      },
      {
        text: "artificial intelligence",
        synonyms: ["AI"]
      },
      {
        text: "10-year-old",
        synonyms: ["child", "kid", "elementary student", "young person"]
      },
      {
        text: "simple",
        synonyms: ["easy", "basic", "clear", "straightforward"]
      },
      {
        text: "examples",
        synonyms: ["instances", "cases"]
      }
    ],
    prohibitedElements: [
      "complex", "technical", "advanced", "neural network", "algorithm"
    ],
    exampleResponse: "Artificial Intelligence (or AI) is like a super-smart computer brain that can learn and figure things out on its own. Imagine if your toys could learn what games you like to play, or if your video game could create new levels just for you. AI is used in lots of things you might know - like when your tablet suggests videos you might like, or when a video game character makes decisions. It's a bit like teaching a robot to think, but it can only think about specific things it's been trained to understand. AI is getting smarter all the time, but it still needs humans to create it and tell it what's important!",
    feedback: {
      excellent: "Excellent prompt! You've clearly specified that the explanation should be for a 10-year-old, asked for simple language, and requested examples that would make sense to a child. This will help the AI generate an age-appropriate explanation that a child can understand and relate to.",
      good: "Good prompt! You've included most of the important elements, like mentioning the audience is a child and asking for a simple explanation. To make it even better, you could be more specific about the types of examples that would resonate with a 10-year-old.",
      fair: "Your prompt includes some good elements, but could be more specific. Remember to clearly state that the explanation should be for a child, use simple language, and include relatable examples. Being specific helps the AI generate more appropriate responses.",
      poor: "Your prompt needs more detail and direction. When asking an AI to explain something to children, it's important to specify the age group, request simple language, and ask for age-appropriate examples. This helps ensure the explanation will be understandable and engaging for young audiences.",
      prohibited: "Your prompt contains technical terms that wouldn't be appropriate for a child's explanation. Terms like 'neural network' and 'algorithm' are too complex for most 10-year-olds. Try focusing on simple concepts and everyday examples instead."
    }
  },
  {
    id: 2,
    title: "Being Specific and Clear",
    description: "Learn how to write prompts that get the results you want by being specific.",
    challenge: "Write a prompt asking an AI to create a short story about friendship. Be specific about the length, audience, theme, and elements you want included.",
    hint: "Specify word count, age group, type of friendship, setting, and any specific values or lessons you want the story to include.",
    requiredElements: [
      {
        text: "short story",
        synonyms: ["story", "tale"]
      },
      {
        text: "friendship",
        synonyms: ["friends", "being a good friend"]
      },
      {
        text: "length",
        synonyms: ["word count", "paragraphs", "sentences"]
      },
      {
        text: "audience",
        synonyms: ["age group", "readers", "grade level"]
      },
      {
        text: "setting",
        synonyms: ["place", "location", "world"]
      },
      {
        text: "characters",
        synonyms: ["people", "individuals", "main character"]
      }
    ],
    prohibitedElements: [
      "violent", "scary", "inappropriate", "romantic"
    ],
    exampleResponse: "THE TREEHOUSE CLUB\n\nSam was the new kid in town, nervously walking into class on the first day of 5th grade. During lunch, Sam sat alone until Jordan, the class soccer star, came over. \"Want to see something cool after school?\" Jordan asked.\n\nAfter the bell rang, Jordan led Sam to an enormous oak tree with a wooden ladder. \"Our treehouse club meets here,\" Jordan explained as they climbed up.\n\nInside the treehouse, Sam met Lin and Abby, who were arranging colorful rocks in a display. \"We collect interesting things from around the neighborhood,\" Lin explained.\n\n\"I don't have anything interesting,\" Sam said quietly.\n\n\"That's okay!\" Abby smiled. \"We can help you find something.\"\n\nOver the next weeks, the friends explored creeks, fields, and even the old recycling center. Sam discovered a talent for spotting unusual bottle caps, starting a collection that soon filled a corner of the treehouse.\n\nWhen a storm damaged part of their treehouse, Sam used knowledge from a previous school's woodworking class to help repair it.\n\n\"See?\" Jordan said as they admired their fixed clubhouse. \"Everyone has something special to share. That's why we're better together.\"\n\nSam smiled, no longer feeling like the new kid, but like an important part of the Treehouse Club.",
    feedback: {
      excellent: "Excellent prompt! You've specified all the important elements: the type of story (about friendship), length, target audience, setting, and character details. This level of specificity gives the AI clear direction while still allowing creativity, resulting in a story that matches exactly what you're looking for.",
      good: "Good prompt! You've included most of the important elements like the friendship theme and some specifics. To make it even better, you could add more details about the length, specific age group, and particular values or lessons you want the story to convey.",
      fair: "Your prompt has the basic idea but lacks specificity. When requesting creative content, it helps to specify details like length, audience age, setting, and character information. The more specific you are, the more likely the AI will create content that matches your expectations.",
      poor: "Your prompt is too vague. Simply asking for 'a story about friendship' could result in content that's too long, too short, too simple, too complex, or inappropriate for your intended audience. Always specify details like length, audience age, and key elements you want included.",
      prohibited: "Your prompt contains elements that could lead to inappropriate content for children. When requesting stories for young audiences, avoid mentioning themes like violence or romantic relationships, as these might result in content that isn't age-appropriate."
    }
  },
  {
    id: 3,
    title: "Providing Context",
    description: "Learn how context helps AI understand what you're asking for.",
    challenge: "Write a prompt asking an AI to help with a math problem about percentages. Provide context about why you need help and your current understanding level.",
    hint: "Mention your grade level, what you already know about percentages, what specific aspect you're struggling with, and why you want to understand it better.",
    requiredElements: [
      {
        text: "help",
        synonyms: ["assist", "explain", "guide"]
      },
      {
        text: "math",
        synonyms: ["mathematics", "calculation"]
      },
      {
        text: "percentages",
        synonyms: ["percent", "%"]
      },
      {
        text: "grade level",
        synonyms: ["class", "year", "age"]
      },
      {
        text: "understand",
        synonyms: ["comprehend", "learn", "know"]
      },
      {
        text: "struggling with",
        synonyms: ["confused about", "having trouble with", "difficulty with"]
      }
    ],
    prohibitedElements: [
      "do my homework", "solve this for me", "give me the answer", "cheat"
    ],
    exampleResponse: "I'd be happy to help you understand percentages! Since you're in 6th grade and already know how to convert between fractions and decimals, let's focus on calculating percentage increases, which can be tricky at first.\n\nWhen we talk about a percentage increase, we're finding out how much something has grown compared to its original value.\n\nHere's a step-by-step approach:\n\n1. Find the amount of increase: New Value - Original Value\n2. Divide that increase by the Original Value\n3. Multiply by 100 to get the percentage\n\nLet's use your example about saving money:\n\nIf you had $50 last month and now have $65:\n1. Increase = $65 - $50 = $15\n2. $15 ÷ $50 = 0.3\n3. 0.3 × 100 = 30%\n\nSo your savings increased by 30%!\n\nThis is useful for understanding growth in many real-life situations, like population changes, price increases, or tracking improvements in test scores.\n\nWould you like to try a practice problem to make sure you understand?",
    feedback: {
      excellent: "Excellent prompt! You've provided comprehensive context by mentioning your grade level, what you already understand about percentages, the specific aspect you're struggling with, and why you want to learn it. This context helps the AI tailor its explanation to your exact needs and knowledge level.",
      good: "Good prompt! You've included important context like the math topic and some information about your understanding. To make it even better, you could be more specific about your grade level and exactly which aspect of percentages is giving you trouble.",
      fair: "Your prompt includes the basic request but could use more context. When asking for help with a math concept, it's helpful to share your grade level, what you already know, and specifically what you're finding difficult. This helps the AI provide an explanation at the right level for you.",
      poor: "Your prompt lacks important context. Without knowing your grade level, current understanding, or specific difficulties with percentages, the AI can only provide a generic explanation that might be too simple or too complex for your needs. Always provide context for educational help.",
      prohibited: "Your prompt suggests you're looking for someone to do your work for you rather than help you learn. Phrases like 'give me the answer' or 'do my homework' encourage academic dishonesty. Instead, ask for explanations and guidance that will help you understand how to solve problems yourself."
    }
  },
  {
    id: 4,
    title: "Ethical Prompt Writing",
    description: "Learn how to write prompts that encourage responsible AI use.",
    challenge: "Write a prompt asking an AI to help you research information about climate change for a school project. Make sure your prompt encourages finding reliable sources and balanced viewpoints.",
    hint: "Ask for credible sources, multiple perspectives, age-appropriate explanations, and guidance on how to verify information.",
    requiredElements: [
      {
        text: "research",
        synonyms: ["find information", "learn about", "gather facts"]
      },
      {
        text: "climate change",
        synonyms: ["global warming", "environmental change"]
      },
      {
        text: "school project",
        synonyms: ["assignment", "homework", "class work"]
      },
      {
        text: "reliable sources",
        synonyms: ["credible information", "trustworthy sources", "fact-checked"]
      },
      {
        text: "different perspectives",
        synonyms: ["various viewpoints", "multiple sides", "different opinions"]
      },
      {
        text: "age-appropriate",
        synonyms: ["grade-level", "suitable for students", "understandable"]
      }
    ],
    prohibitedElements: [
      "write my essay", "complete my project", "do my work", "copy"
    ],
    exampleResponse: "I'd be happy to help you research climate change for your school project! Here are some reliable, age-appropriate sources and information to get you started:\n\nReliable Sources for Students:\n1. NASA Climate Kids (https://climatekids.nasa.gov) - Scientific information explained for young students\n2. National Geographic Kids (https://kids.nationalgeographic.com/environment/article/climate-change) - Engaging articles with great visuals\n3. CLEAN (Climate Literacy and Energy Awareness Network) - Educational resources reviewed by scientists and educators\n\nKey Facts (From Scientific Consensus):\n• Climate change refers to long-term shifts in temperatures and weather patterns\n• Human activities, particularly burning fossil fuels, are the main driver of current climate change\n• Effects include rising temperatures, changing precipitation patterns, and more extreme weather events\n\nDifferent Perspectives to Consider:\n• Scientific perspective: What does research tell us about causes and effects?\n• Economic perspective: How might addressing climate change affect jobs and industries?\n• Social perspective: How do climate changes impact different communities?\n• Technological perspective: What innovations might help address climate challenges?\n\nTips for Your Research:\n• Check when information was published (climate science is constantly updating)\n• Look for sources that cite specific studies or data\n• Be wary of extreme claims without evidence\n• Consider who created the information and their expertise\n\nWould you like more specific information about any particular aspect of climate change for your project?",
    feedback: {
      excellent: "Excellent prompt! You've asked for reliable sources, balanced perspectives, and age-appropriate information for your school project. This ethical approach encourages the AI to provide well-rounded, factual information that will help you learn about climate change from multiple viewpoints while ensuring the content is suitable for your educational level.",
      good: "Good prompt! You've mentioned the need for research help and reliable sources. To make it even better, you could specifically ask for multiple perspectives on climate change and clarify that you need age-appropriate information for your grade level.",
      fair: "Your prompt has the basic request but could be more ethically framed. When researching controversial topics, it's important to specifically ask for reliable sources, different perspectives, and age-appropriate content. This ensures you get balanced, trustworthy information.",
      poor: "Your prompt doesn't emphasize the need for reliable sources or balanced viewpoints. When researching topics like climate change, it's important to specifically request credible information and different perspectives to avoid getting biased or potentially misleading content.",
      prohibited: "Your prompt suggests you're looking for the AI to do your project for you rather than help you research. Phrases like 'write my essay' or 'complete my project' encourage academic dishonesty. Instead, ask for research guidance and information that will help you complete the work yourself."
    }
  },
  {
    id: 5,
    title: "Iterative Prompting",
    description: "Learn how to improve your results by refining your prompts based on initial responses.",
    challenge: "Write a follow-up prompt that refines a previous request. Imagine you asked an AI to suggest healthy snacks, but the suggestions were too complicated. Write a prompt that clarifies what you need.",
    hint: "Reference your previous request, explain what wasn't right about the response, and provide more specific details about what you're looking for (simplicity, ingredients, preparation time, etc.).",
    requiredElements: [
      {
        text: "previous request",
        synonyms: ["earlier prompt", "last question", "first response"]
      },
      {
        text: "too complicated",
        synonyms: ["too complex", "too difficult", "not simple enough"]
      },
      {
        text: "healthy snacks",
        synonyms: ["nutritious snacks", "healthy foods", "healthy treats"]
      },
      {
        text: "simpler",
        synonyms: ["easier", "more basic", "less complex"]
      },
      {
        text: "preparation time",
        synonyms: ["prep time", "how long it takes", "time to make"]
      },
      {
        text: "ingredients",
        synonyms: ["items needed", "components", "what I need"]
      }
    ],
    prohibitedElements: [
      "useless", "stupid", "terrible", "awful"
    ],
    exampleResponse: "Thanks for clarifying what you need! Here are 5 super simple healthy snacks that can be prepared in under 5 minutes with 3 or fewer ingredients that most people have at home:\n\n1. Apple slices with peanut butter\n   • Ingredients: 1 apple, 1-2 tablespoons peanut butter\n   • Prep: Slice apple, spread or dip in peanut butter\n   • Time: 2 minutes\n\n2. Greek yogurt with honey and berries\n   • Ingredients: ½ cup Greek yogurt, 1 teaspoon honey, handful of berries (fresh or frozen)\n   • Prep: Mix together in a bowl\n   • Time: 1 minute\n\n3. Banana and nut butter roll-up\n   • Ingredients: 1 whole grain tortilla, 1 banana, 1 tablespoon nut butter\n   • Prep: Spread nut butter on tortilla, add banana, roll up\n   • Time: 3 minutes\n\n4. Veggies and hummus\n   • Ingredients: Baby carrots or cucumber slices, 2-3 tablespoons hummus\n   • Prep: Open container of hummus, use as dip\n   • Time: 1 minute\n\n5. Cheese and whole grain crackers\n   • Ingredients: Whole grain crackers, cheese slices\n   • Prep: Place cheese on crackers\n   • Time: 1 minute\n\nAll of these snacks provide a good balance of nutrients and will help keep you energized between meals!",
    feedback: {
      excellent: "Excellent follow-up prompt! You've clearly referenced your previous request, explained exactly what wasn't working (too complicated recipes), and provided specific details about what you need (simpler options with few ingredients and quick preparation time). This kind of iterative prompting helps the AI understand exactly how to improve its response.",
      good: "Good follow-up prompt! You've mentioned your previous request and that you need simpler options. To make it even better, you could provide more specific details about exactly what 'simpler' means to you - like maximum preparation time or number of ingredients.",
      fair: "Your prompt mentions the previous request but could be more specific about what you need. When refining a prompt, clearly explain what wasn't working in the previous response and provide specific details about what would make the new response better.",
      poor: "Your prompt doesn't effectively build on the previous interaction. When refining a request, it's important to specifically reference what wasn't working (the complicated recipes) and provide clear parameters for what you need instead (simpler recipes with specific constraints).",
      prohibited: "Your prompt contains negative or disrespectful language. Using words like 'stupid' or 'terrible' to describe previous responses isn't constructive and doesn't help the AI understand how to better meet your needs. Instead, politely explain what wasn't working and what you'd prefer."
    }
  },
  {
    id: 6,
    title: "Creative Prompting",
    description: "Learn how to write prompts that encourage creative and imaginative AI responses.",
    challenge: "Write a prompt asking an AI to create a unique superhero character for a comic book that a middle school student could draw. Include details about the type of powers and personality you want the character to have.",
    hint: "Specify the target age group, the type of superpowers (avoiding overpowered abilities), personality traits, potential backstory elements, and visual characteristics that would be easy to draw.",
    requiredElements: [
      {
        text: "superhero",
        synonyms: ["hero", "super character", "powered character"]
      },
      {
        text: "middle school",
        synonyms: ["kids", "children", "young artists", "students"]
      },
      {
        text: "easy to draw",
        synonyms: ["simple design", "not too complex", "drawable"]
      },
      {
        text: "powers",
        synonyms: ["abilities", "superpowers", "special skills"]
      },
      {
        text: "personality",
        synonyms: ["character traits", "behavior", "attitude"]
      },
      {
        text: "unique",
        synonyms: ["original", "creative", "different", "new"]
      }
    ],
    prohibitedElements: [
      "violent", "scary", "weapon", "gun", "kill", "adult"
    ],
    exampleResponse: "# ECHO: THE SOUND SHAPER\n\n## Character Concept\nEcho is a 13-year-old who discovered their sound-manipulation powers during a school music concert when they accidentally amplified the entire orchestra to window-shaking levels! Now they're learning to control these acoustic abilities while navigating middle school life.\n\n## Powers (Sound Manipulation)\n- **Sound Projection**: Can amplify or diminish sounds\n- **Voice Mimicry**: Can perfectly copy any voice or sound they've heard\n- **Sound Barriers**: Can create protective shields made of solidified sound waves\n- **Sonic Movement**: Can ride sound waves for quick (but not super-fast) movement\n\n## Personality\n- Creative and musical\n- Sometimes shy but brave when friends need help\n- Struggles with focus (often gets distracted by all the sounds they can hear)\n- Has a good sense of humor and loves puns\n\n## Simple Visual Design Elements\n- Wears headphones that glow when powers are in use\n- Simple costume with sound wave patterns (easy to draw as curved lines)\n- Hair that seems to float slightly when using powers\n- Fingerless gloves that emit colored rings when projecting sound\n\n## Potential Story Ideas\n- Using powers to help the school band win a competition\n- Creating a sound barrier to protect classmates during a storm\n- Learning to filter out background noise to focus on important sounds\n- Using voice mimicry to help a friend overcome stage fright\n\nThis character has interesting but limited powers (no world-destroying abilities!), relatable challenges, and visual elements that would be fun but not too difficult for a middle school artist to draw.",
    feedback: {
      excellent: "Excellent prompt! You've specified all the key elements: the type of character (superhero), the target audience (middle school students), the need for a design that's easy to draw, and details about desired powers and personality traits. This gives the AI clear direction while still allowing for creativity in generating a unique character.",
      good: "Good prompt! You've included the main requirements for a superhero character. To make it even better, you could be more specific about what makes a character design easy for middle school students to draw and what types of powers would be appropriate (not too complex or overpowered).",
      fair: "Your prompt has the basic idea but lacks some important details. When requesting creative content for students, it helps to specify what makes a design appropriate for their skill level and interests. Consider adding more details about the type of powers, personality traits, and visual elements you're looking for.",
      poor: "Your prompt is too vague. Simply asking for 'a superhero character' without specifying the age-appropriateness, drawing complexity, or character details could result in a concept that's too complex, inappropriate, or generic. Always provide specific guidance for creative requests.",
      prohibited: "Your prompt contains elements that could lead to inappropriate content for middle school students. When requesting character ideas for children, avoid mentioning violent themes, weapons, or adult content, as these might result in a character that isn't suitable for young artists."
    }
  },
  {
    id: 7,
    title: "Inclusive Prompting",
    description: "Learn how to write prompts that encourage diverse and inclusive AI responses.",
    challenge: "Write a prompt asking an AI to suggest role models in STEM (Science, Technology, Engineering, and Math) fields for a diverse classroom of elementary students. Ensure your prompt encourages representation of different backgrounds.",
    hint: "Specifically request diversity in gender, ethnicity, ability status, and background. Ask for role models from different time periods, countries, and STEM disciplines who overcame various challenges.",
    requiredElements: [
      {
        text: "role models",
        synonyms: ["inspirational figures", "heroes", "leaders"]
      },
      {
        text: "STEM",
        synonyms: ["Science, Technology, Engineering, and Math", "science and technology"]
      },
      {
        text: "diverse",
        synonyms: ["varied", "different backgrounds", "multicultural"]
      },
      {
        text: "elementary students",
        synonyms: ["young students", "children", "kids", "primary school"]
      },
      {
        text: "different backgrounds",
        synonyms: ["various cultures", "different ethnicities", "different genders"]
      },
      {
        text: "inspiring stories",
        synonyms: ["motivational journeys", "overcoming challenges", "achievements"]
      }
    ],
    prohibitedElements: [
      "only women", "only men", "only American", "white", "normal"
    ],
    exampleResponse: "# Diverse STEM Role Models for Elementary Students\n\nHere are 10 inspiring STEM role models from diverse backgrounds, with age-appropriate information and fascinating facts that elementary students might connect with:\n\n## 1. Katherine Johnson (Mathematician, 1918-2020)\n- Calculated flight paths for NASA missions, including the first American in space\n- As an African American woman, she overcame both racial and gender barriers\n- Loved counting and patterns from a very young age\n- Fun fact: She skipped several grades because she was so good at math!\n\n## 2. Temple Grandin (Animal Scientist, 1947-present)\n- Designs humane animal handling systems used worldwide\n- Has autism and sees it as a different way of thinking that helps her understand animals\n- Created a \"hug machine\" to help herself and others with sensory sensitivities\n- Fun fact: She thinks in pictures instead of words!\n\n## 3. Guillermo González Camarena (Engineer, 1917-1965)\n- Mexican engineer who invented an early color television system at age 23\n- Built his first radio transmitter when he was just a teenager\n- Fun fact: He hosted a children's TV program about science and technology!\n\n## 4. Wanda Díaz-Merced (Astronomer, 1977-present)\n- Puerto Rican astronomer who lost her sight and developed a way to \"hear\" stars and space data\n- Converts star data into sound patterns to make discoveries\n- Fun fact: She helps create technology so other blind scientists can study space!\n\n## 5. Gitanjali Rao (Inventor, 2005-present)\n- Young Indian-American inventor who created a device to detect lead in water\n- Was named Time Magazine's first \"Kid of the Year\" in 2020\n- Started inventing at age 10\n- Fun fact: She runs workshops to teach other kids how to solve problems with science!\n\n## 6. Tu Youyou (Pharmaceutical Chemist, 1930-present)\n- Chinese scientist who discovered a treatment for malaria that has saved millions of lives\n- Used ancient Chinese medicine books to find her breakthrough\n- Fun fact: She volunteered to be the first human to test her medicine!\n\n## 7. William Kamkwamba (Inventor, 1987-present)\n- Built a windmill to generate electricity for his village in Malawi when he was just 14\n- Created it using scrap materials and a library book after dropping out of school\n- Fun fact: He later built a solar-powered water pump that supplied drinking water to his village!\n\n## 8. Hayat Sindi (Biotechnologist, 1967-present)\n- Saudi Arabian scientist who invented a machine that combines the power of light and sound for medical testing\n- First Saudi woman to be accepted at Cambridge University in the UK\n- Fun fact: Her inventions help people in remote villages get medical tests without electricity!\n\n## 9. Luis Von Ahn (Computer Scientist, 1979-present)\n- Guatemalan inventor who created CAPTCHA and reCAPTCHA (those puzzles that prove you're human online)\n- Co-founded Duolingo to help people around the world learn languages for free\n- Fun fact: When you solve a CAPTCHA, you're helping digitize books!\n\n## 10. Flossie Wong-Staal (Virologist, 1947-2020)\n- Chinese-American scientist who was the first person to clone HIV, helping develop tests and treatments\n- Moved to the United States when she was 18 to study\n- Fun fact: She was named one of the top 50 women scientists in the world!\n\nEach of these role models shows that STEM is for everyone, regardless of background, and that curiosity and persistence can lead to amazing discoveries!",
    feedback: {
      excellent: "Excellent prompt! You've specifically requested diverse role models across multiple dimensions (gender, ethnicity, ability, etc.) for elementary students. Your prompt encourages the AI to provide examples from different backgrounds, time periods, and STEM disciplines, ensuring students from all backgrounds can see themselves represented in STEM fields.",
      good: "Good prompt! You've asked for diverse STEM role models for elementary students. To make it even better, you could specifically mention the types of diversity you're looking for (such as gender, ethnicity, disability, country of origin) to ensure truly inclusive representation.",
      fair: "Your prompt mentions diversity but could be more specific. When requesting inclusive content, it helps to explicitly ask for representation across multiple dimensions (gender, ethnicity, ability status, etc.) and from different time periods and regions to ensure truly diverse examples.",
      poor: "Your prompt doesn't effectively emphasize the importance of diversity and inclusion. When asking for role models for students, it's important to specifically request diverse representation so that all students can see people like themselves in STEM fields.",
      prohibited: "Your prompt contains language that limits diversity rather than encourages it. Phrases like 'only women' or 'normal scientists' create exclusionary boundaries. Instead, ask for diverse representation across all dimensions to ensure all students can see themselves reflected in STEM."
    }
  },
  {
    id: 8,
    title: "Responsible AI Use",
    description: "Learn how to write prompts that promote responsible and ethical AI use.",
    challenge: "Write a prompt asking an AI to help you understand both sides of a debate topic for a class assignment on whether social media is good or bad for teenagers.",
    hint: "Ask for balanced perspectives, evidence-based information, age-appropriate explanations, and guidance on forming your own opinion based on the facts.",
    requiredElements: [
      {
        text: "both sides",
        synonyms: ["different perspectives", "pros and cons", "arguments for and against"]
      },
      {
        text: "debate",
        synonyms: ["discussion", "argument", "controversy"]
      },
      {
        text: "social media",
        synonyms: ["online platforms", "digital social networks"]
      },
      {
        text: "teenagers",
        synonyms: ["teens", "adolescents", "young people"]
      },
      {
        text: "evidence",
        synonyms: ["research", "studies", "facts", "data"]
      },
      {
        text: "form my own opinion",
        synonyms: ["make my own decision", "draw my own conclusion", "think critically"]
      }
    ],
    prohibitedElements: [
      "write my essay", "do my homework", "which side is right", "tell me what to think"
    ],
    exampleResponse: "# Understanding Both Sides: Social Media and Teenagers\n\n## Arguments That Social Media Benefits Teenagers\n\n**1. Social Connection and Support**\n- Research shows social media helps teens maintain friendships, especially during periods when they can't meet in person\n- Provides support communities for teens with specific interests or challenges\n- Allows shy or socially anxious teens to connect in more comfortable ways\n- Evidence: A Pew Research study found 81% of teens say social media makes them feel more connected to friends\n\n**2. Identity Exploration and Self-Expression**\n- Offers spaces for creative expression and developing personal identity\n- Allows teens to find communities with shared interests or experiences\n- Can boost confidence when receiving positive feedback\n- Evidence: Research in the Journal of Adolescent Health found positive self-presentation online can improve self-esteem\n\n**3. Information Access and Learning**\n- Exposes teens to diverse perspectives and global events\n- Provides educational content in engaging formats\n- Teaches digital literacy skills needed for future careers\n- Evidence: Common Sense Media research shows many teens use social media for homework help and learning new skills\n\n## Arguments That Social Media Harms Teenagers\n\n**1. Mental Health Concerns**\n- Associated with increased anxiety, depression, and poor body image in some studies\n- Can create unhealthy comparison with curated, unrealistic portrayals of others' lives\n- May contribute to sleep disruption when used at night\n- Evidence: A study in JAMA Psychiatry found teens who use social media more than 3 hours daily may have higher risk of mental health problems\n\n**2. Social Pressures and Cyberbullying**\n- Creates new avenues for bullying that can feel inescapable\n- May increase social pressure and fear of missing out (FOMO)\n- Can lead to unhealthy validation-seeking behaviors\n- Evidence: About 59% of teens have experienced cyberbullying according to the Cyberbullying Research Center\n\n**3. Privacy and Safety Concerns**\n- Teens may not fully understand the permanence of digital footprints\n- Data collection practices raise privacy concerns\n- Potential exposure to inappropriate content or predatory behavior\n- Evidence: Studies show many teens share personal information without understanding potential consequences\n\n## Balanced Perspective\n\nMost research suggests that social media itself isn't inherently good or bad - its impact depends on:\n- How it's used (passive scrolling vs. active engagement)\n- How much it's used (moderate vs. excessive use)\n- Individual factors (personality, mental health, social support)\n- Platform design and features\n\n## Forming Your Own Opinion\n\nWhen developing your position, consider:\n1. Looking at quality research rather than anecdotes\n2. Considering how different teens might be affected differently\n3. Thinking about potential solutions that maximize benefits while reducing harms\n4. Reflecting on your own experiences and observations\n\nRemember that nuanced positions that acknowledge both benefits and drawbacks are often more accurate than all-or-nothing views.",
    feedback: {
      excellent: "Excellent prompt! You've asked for balanced perspectives on both sides of the social media debate, specifically requested evidence-based information, and emphasized that you want to form your own opinion based on the facts. This approach encourages critical thinking and helps you understand complex issues from multiple angles.",
      good: "Good prompt! You've asked for both sides of the debate about social media for teenagers. To make it even better, you could specifically request evidence-based information and emphasize that you want to understand the nuances rather than just getting a simple answer.",
      fair: "Your prompt asks for information about the debate, but could be more specific about wanting balanced perspectives. When researching controversial topics, it's important to explicitly request evidence from both sides and clarify that you want to form your own opinion rather than being told what to think.",
      poor: "Your prompt doesn't effectively emphasize the need for balanced perspectives. When asking about debate topics, it's important to specifically request both sides of the argument, evidence-based information, and clarify that you want to understand the issue rather than being given a one-sided view.",
      prohibited: "Your prompt suggests you're looking for the AI to complete your assignment rather than help you understand the topic. Phrases like 'write my essay' or 'do my homework' encourage academic dishonesty. Instead, ask for information and perspectives that will help you form your own opinion and complete the work yourself."
    }
  }
];
