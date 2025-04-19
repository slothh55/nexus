export interface WorldBuilderScenario {
  id: number;
  title: string;
  description: string;
  scenario: string;
  choices: Record<string, Record<string, string | boolean>>;
  choiceTypes: Record<string, 'select' | 'slider' | 'toggle' | 'multiselect'>;
  categoryLabels: Record<string, string>;
  categoryDescriptions: Record<string, string>;
  categoryWeights: Record<string, number>;
  optimalChoices: Record<string, any>;
  feedback: {
    excellent: string;
    good: string;
    fair: string;
    poor: string;
  };
}

export const worldBuilderScenarios: WorldBuilderScenario[] = [
  {
    id: 1,
    title: "Designing an AI Learning Assistant",
    description: "Create an AI learning assistant that helps students with their homework and studies.",
    scenario: "You're designing an AI learning assistant for elementary school students. The assistant will help them with homework, answer questions, and provide educational resources. How would you design this AI to be helpful, ethical, and inclusive?",
    choices: {
      purpose: {
        "complete_work": "Complete assignments for students",
        "provide_answers": "Provide direct answers to questions",
        "guide_learning": "Guide students through learning process",
        "check_work": "Check completed work and provide feedback"
      },
      accessibility: {
        "text_only": "Text-only interface",
        "multi_modal": "Multiple interaction modes (text, voice, visual)",
        "advanced_only": "Advanced features for tech-savvy users",
        "simplified": "Simplified interface with limited options"
      },
      privacy: {
        "collect_all": "Collect all possible data to improve service",
        "minimal_data": "Collect minimal necessary data with permission",
        "no_data": "Collect no user data",
        "share_data": "Share anonymized data with educational partners"
      },
      inclusivity: {
        "standard_english": "Support standard English only",
        "multiple_languages": "Support multiple languages",
        "cultural_context": "Adapt to different cultural contexts",
        "learning_styles": "Accommodate different learning styles"
      }
    },
    choiceTypes: {
      purpose: "select",
      accessibility: "select",
      privacy: "select",
      inclusivity: "multiselect"
    },
    categoryLabels: {
      purpose: "Learning Approach",
      accessibility: "Interface Design",
      privacy: "Data Collection",
      inclusivity: "Inclusion Features"
    },
    categoryDescriptions: {
      purpose: "How should the AI help students with their learning?",
      accessibility: "How will students interact with the AI?",
      privacy: "What data should the AI collect from students?",
      inclusivity: "What features will make the AI inclusive for all students?"
    },
    categoryWeights: {
      purpose: 30,
      accessibility: 20,
      privacy: 25,
      inclusivity: 25
    },
    optimalChoices: {
      purpose: "guide_learning",
      accessibility: "multi_modal",
      privacy: "minimal_data",
      inclusivity: ["multiple_languages", "cultural_context", "learning_styles"]
    },
    feedback: {
      excellent: "Excellent choices! Your AI learning assistant is designed to guide students through the learning process rather than just giving answers. It's accessible through multiple interaction modes, respects privacy by collecting minimal data, and includes features that make it inclusive for students from diverse backgrounds and with different learning styles.",
      good: "Good design choices! Your AI learning assistant has several positive features, but there's room for improvement. Consider how your AI can better guide learning rather than just providing answers, and think about ways to make it more inclusive for all students.",
      fair: "Your AI learning assistant has some good elements, but needs significant improvements. An ethical learning assistant should guide students through learning rather than doing work for them, respect privacy, and be accessible to all students regardless of abilities or background.",
      poor: "Your design needs reconsideration. An AI that completes work for students or provides direct answers without explanation doesn't support real learning. Also, consider privacy concerns and how to make your AI accessible and inclusive for all students."
    }
  },
  {
    id: 2,
    title: "Creating an AI Health Companion",
    description: "Design an AI health companion app for teenagers that promotes wellbeing.",
    scenario: "You're designing an AI health companion app for teenagers. The app will provide health information, track activity, and offer wellbeing suggestions. How would you design this AI to be helpful, private, and appropriate for teens?",
    choices: {
      content: {
        "adult_medical": "Comprehensive medical information for all conditions",
        "age_appropriate": "Age-appropriate health information",
        "minimal_info": "Minimal health information to avoid concerns",
        "peer_advice": "Advice from other teenagers"
      },
      monitoring: {
        "constant": "Constant health monitoring",
        "opt_in": "Optional monitoring with clear consent",
        "minimal": "Minimal tracking of specific metrics",
        "no_tracking": "No health tracking features"
      },
      data_sharing: {
        "parents": "Share all data with parents automatically",
        "doctors": "Option to share data with healthcare providers",
        "researchers": "Share anonymized data with researchers",
        "none": "No data sharing with third parties"
      },
      mental_health: {
        true: "Include mental health support features",
        false: "Focus only on physical health"
      },
      emergency: {
        "alert_automatically": "Automatically alert emergency services for concerning data",
        "suggest_resources": "Suggest appropriate resources for concerning situations",
        "parent_alert": "Alert parents for any concerning data",
        "no_intervention": "Provide information only with no interventions"
      }
    },
    choiceTypes: {
      content: "select",
      monitoring: "select",
      data_sharing: "multiselect",
      mental_health: "toggle",
      emergency: "select"
    },
    categoryLabels: {
      content: "Health Information",
      monitoring: "Health Tracking",
      data_sharing: "Data Sharing Options",
      mental_health: "Mental Health Support",
      emergency: "Emergency Response"
    },
    categoryDescriptions: {
      content: "What kind of health information should the AI provide?",
      monitoring: "How should the AI track health metrics?",
      data_sharing: "Who should have access to the health data?",
      mental_health: "Should the AI address mental health alongside physical health?",
      emergency: "How should the AI respond to potential health emergencies?"
    },
    categoryWeights: {
      content: 20,
      monitoring: 20,
      data_sharing: 20,
      mental_health: 20,
      emergency: 20
    },
    optimalChoices: {
      content: "age_appropriate",
      monitoring: "opt_in",
      data_sharing: ["doctors", "none"],
      mental_health: true,
      emergency: "suggest_resources"
    },
    feedback: {
      excellent: "Excellent design! Your health companion respects teen privacy with opt-in monitoring and appropriate data sharing options. It provides age-appropriate information, includes crucial mental health support, and offers resources rather than automatic interventions for concerning situations, balancing safety with autonomy.",
      good: "Good design choices! Your health companion has several positive features, but there are areas for improvement. Consider the balance between privacy and safety, and how to provide appropriate support without overstepping boundaries.",
      fair: "Your health companion has some good elements but needs significant improvements. Consider teen privacy concerns, the importance of mental health support, and how to provide age-appropriate information and resources.",
      poor: "Your design needs reconsideration. A teen health companion should respect privacy, provide age-appropriate information, include mental health support, and balance safety with autonomy. Constant monitoring or sharing all data with parents without consent could discourage teens from using the app."
    }
  },
  {
    id: 3,
    title: "Designing an AI Creative Assistant",
    description: "Create an AI assistant that helps children express their creativity through art, music, and storytelling.",
    scenario: "You're designing an AI creative assistant for children ages 8-12. The assistant will help them create art, music, and stories. How would you design this AI to encourage creativity, be age-appropriate, and respect intellectual property?",
    choices: {
      creation_approach: {
        "ai_creates": "AI creates complete works based on simple prompts",
        "collaborative": "AI and child collaborate on creative works",
        "guided_creation": "AI provides guidance while child creates independently",
        "templates": "AI offers templates and examples to copy"
      },
      inspiration_sources: {
        "famous_works": "Famous copyrighted works",
        "public_domain": "Public domain and freely licensed works",
        "original_content": "Original content created for the app",
        "user_community": "Works shared by other users"
      },
      feedback_style: {
        "critical": "Critical feedback focusing on improvements",
        "positive_only": "Positive feedback only",
        "constructive": "Balanced, age-appropriate constructive feedback",
        "no_feedback": "No feedback on creative works"
      },
      sharing_options: {
        "automatic": "Automatically share all creations publicly",
        "private": "Keep all creations private by default",
        "controlled": "Child controls sharing with parent oversight",
        "educational": "Share only with teachers and classmates"
      },
      attribution: {
        true: "Clearly show AI's role in the creation process",
        false: "Present all work as entirely the child's creation"
      }
    },
    choiceTypes: {
      creation_approach: "select",
      inspiration_sources: "multiselect",
      feedback_style: "select",
      sharing_options: "select",
      attribution: "toggle"
    },
    categoryLabels: {
      creation_approach: "Creation Process",
      inspiration_sources: "Inspiration Sources",
      feedback_style: "Feedback Approach",
      sharing_options: "Sharing Settings",
      attribution: "AI Attribution"
    },
    categoryDescriptions: {
      creation_approach: "How should the AI and child work together to create?",
      inspiration_sources: "What sources should the AI use for inspiration?",
      feedback_style: "How should the AI provide feedback on creations?",
      sharing_options: "How should creations be shared?",
      attribution: "Should the AI's role in creation be acknowledged?"
    },
    categoryWeights: {
      creation_approach: 25,
      inspiration_sources: 20,
      feedback_style: 15,
      sharing_options: 20,
      attribution: 20
    },
    optimalChoices: {
      creation_approach: "collaborative",
      inspiration_sources: ["public_domain", "original_content", "user_community"],
      feedback_style: "constructive",
      sharing_options: "controlled",
      attribution: true
    },
    feedback: {
      excellent: "Excellent design! Your creative assistant collaborates with children rather than creating for them, uses appropriate inspiration sources, provides constructive feedback, gives children control over sharing (with parent oversight), and honestly attributes the AI's contributions. This approach encourages creativity while teaching important digital citizenship concepts.",
      good: "Good design choices! Your creative assistant has several positive features, but there's room for improvement. Consider how to better balance AI assistance with child creativity, and think about the importance of proper attribution and appropriate inspiration sources.",
      fair: "Your creative assistant has some good elements but needs significant improvements. A good creative assistant should encourage children's own creativity rather than doing the work for them, use appropriate inspiration sources, and be honest about the AI's role in creation.",
      poor: "Your design needs reconsideration. Having the AI create complete works for children or using copyrighted materials without permission doesn't encourage true creativity or respect intellectual property. Also consider the importance of constructive feedback and appropriate sharing options for children."
    }
  },
  {
    id: 4,
    title: "Building an AI Game Companion",
    description: "Design an AI companion for a multiplayer online game popular with children and teenagers.",
    scenario: "You're designing an AI companion for a popular multiplayer online game with players of all ages, including many children. The AI will help new players learn the game, suggest strategies, and interact with players during gameplay. How would you design this AI to be helpful, safe, and inclusive?",
    choices: {
      interaction_tone: {
        "competitive": "Highly competitive, focused on winning",
        "supportive": "Supportive and encouraging",
        "neutral": "Neutral and informational",
        "adaptive": "Adapts to match the player's style"
      },
      difficulty_adjustment: {
        "fixed": "Fixed difficulty levels",
        "automatic": "Automatically adjusts to player skill",
        "player_choice": "Player chooses difficulty with AI guidance",
        "always_challenging": "Always challenging to push player growth"
      },
      moderation: {
        "none": "No moderation of player-AI interaction",
        "filter_only": "Basic filter for inappropriate language",
        "active": "Active moderation for safety and positive interaction",
        "restrictive": "Highly restrictive with minimal interaction allowed"
      },
      representation: {
        "default_only": "Single default appearance and voice",
        "stereotypical": "Character options based on stereotypical traits",
        "diverse": "Diverse representation options",
        "customizable": "Fully customizable appearance and voice"
      },
      accessibility: {
        "standard": "Standard controls and interface",
        "settings": "Basic accessibility settings",
        "comprehensive": "Comprehensive accessibility features",
        "minimal": "Minimal features to keep gameplay challenging"
      }
    },
    choiceTypes: {
      interaction_tone: "select",
      difficulty_adjustment: "select",
      moderation: "select",
      representation: "select",
      accessibility: "select"
    },
    categoryLabels: {
      interaction_tone: "Interaction Style",
      difficulty_adjustment: "Difficulty Adaptation",
      moderation: "Safety Moderation",
      representation: "Character Representation",
      accessibility: "Accessibility Features"
    },
    categoryDescriptions: {
      interaction_tone: "How should the AI companion interact with players?",
      difficulty_adjustment: "How should the AI adjust to different player skill levels?",
      moderation: "How should player interactions with the AI be moderated?",
      representation: "How should the AI companion be represented visually and audibly?",
      accessibility: "What accessibility features should be included?"
    },
    categoryWeights: {
      interaction_tone: 20,
      difficulty_adjustment: 15,
      moderation: 25,
      representation: 20,
      accessibility: 20
    },
    optimalChoices: {
      interaction_tone: "supportive",
      difficulty_adjustment: "player_choice",
      moderation: "active",
      representation: "diverse",
      accessibility: "comprehensive"
    },
    feedback: {
      excellent: "Excellent design! Your game companion creates a supportive environment with player choice for difficulty, active safety moderation, diverse representation options, and comprehensive accessibility features. This design makes the game welcoming and enjoyable for players of all backgrounds and abilities.",
      good: "Good design choices! Your game companion has several positive features, but there's room for improvement. Consider how to make the game more inclusive through better moderation, representation, or accessibility features.",
      fair: "Your game companion has some good elements but needs significant improvements. A good game companion should create a safe, supportive environment with appropriate moderation, diverse representation, and accessibility features.",
      poor: "Your design needs reconsideration. A game with many young players needs active moderation, supportive interaction, appropriate difficulty options, diverse representation, and good accessibility features to be safe and inclusive for all players."
    }
  },
  {
    id: 5,
    title: "Creating an AI Social Media Filter",
    description: "Design an AI filter for a social media platform used by teenagers to promote positive interactions.",
    scenario: "You're designing an AI content filter for a social media platform popular with teenagers. The AI will help identify and manage potentially harmful content. How would you design this AI to protect users while respecting their autonomy and expression?",
    choices: {
      filter_strength: {
        "maximum": "Block all potentially problematic content",
        "high": "Block clearly harmful content, flag borderline content",
        "moderate": "Flag potentially harmful content but allow with warning",
        "minimal": "Minimal filtering to maximize free expression"
      },
      transparency: {
        "none": "No explanation when content is filtered",
        "basic": "Basic notification that content was filtered",
        "detailed": "Detailed explanation of why content was filtered",
        "educational": "Educational resources along with explanation"
      },
      age_appropriate: {
        "one_size": "Same filtering for all users",
        "binary": "Child mode vs. adult mode only",
        "graduated": "Age-appropriate filtering levels",
        "customizable": "Parent/guardian customizable filters"
      },
      false_positives: {
        "accept": "Accept false positives as necessary for safety",
        "minimize": "Actively work to minimize false positives",
        "appeal": "Strong appeal process for incorrectly filtered content",
        "human_review": "Human review of all filtered content"
      },
      cultural_context: {
        "western": "Based primarily on Western cultural standards",
        "localized": "Localized to different regional standards",
        "conservative": "Most conservative standards applied globally",
        "adaptive": "Adapts to community and cultural context"
      }
    },
    choiceTypes: {
      filter_strength: "select",
      transparency: "select",
      age_appropriate: "select",
      false_positives: "select",
      cultural_context: "select"
    },
    categoryLabels: {
      filter_strength: "Filtering Approach",
      transparency: "Filter Transparency",
      age_appropriate: "Age Considerations",
      false_positives: "Handling Mistakes",
      cultural_context: "Cultural Sensitivity"
    },
    categoryDescriptions: {
      filter_strength: "How aggressively should content be filtered?",
      transparency: "How should filtering be explained to users?",
      age_appropriate: "How should filtering adapt to user age?",
      false_positives: "How should incorrectly filtered content be handled?",
      cultural_context: "How should cultural differences be considered?"
    },
    categoryWeights: {
      filter_strength: 25,
      transparency: 20,
      age_appropriate: 20,
      false_positives: 15,
      cultural_context: 20
    },
    optimalChoices: {
      filter_strength: "high",
      transparency: "educational",
      age_appropriate: "graduated",
      false_positives: "appeal",
      cultural_context: "adaptive"
    },
    feedback: {
      excellent: "Excellent design! Your content filter balances safety and expression by blocking clearly harmful content while providing educational explanations, age-appropriate filtering, a strong appeal process, and cultural sensitivity. This approach protects users while respecting their autonomy and teaching digital citizenship.",
      good: "Good design choices! Your content filter has several positive features, but there's room for improvement. Consider how to better balance protection with education and expression, and think about cultural context and transparency.",
      fair: "Your content filter has some good elements but needs significant improvements. A good filter should balance protection with education and autonomy, provide clear explanations, consider age appropriateness, and be culturally sensitive.",
      poor: "Your design needs reconsideration. Either it's too restrictive (limiting expression and learning) or too permissive (endangering users). Consider how to better balance safety with autonomy, provide transparency, and respect cultural differences."
    }
  }
];
