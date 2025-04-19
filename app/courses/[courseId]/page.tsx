import { courses } from '@/data/courses'
import CourseContent from './components/CourseContent'

// Generate static params for all course IDs
export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }))
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  return <CourseContent courseId={params.courseId} />
}
