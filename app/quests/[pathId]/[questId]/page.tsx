import QuestContent from './components/QuestContent'

// Quest content data for static params generation
const questContent = {
  "finding-digital-clues": {
    path: "digital-explorer"
  },
  "ai-robot-friends": {
    path: "ai-adventurer"
  },
  "password-power-up": {
    path: "safety-ranger"
  },
  "team-talk-champions": {
    path: "communication-hero"
  }
}

// Generate static params for all quest paths and IDs
export function generateStaticParams() {
  return Object.entries(questContent).map(([questId, data]) => ({
    pathId: data.path,
    questId: questId,
  }))
}

export default function QuestPage({ params }: { params: { pathId: string, questId: string } }) {
  return <QuestContent pathId={params.pathId} questId={params.questId} />
}
