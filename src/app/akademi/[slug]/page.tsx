import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AcademyCoursePage } from "@/components/academy/AcademyCoursePage"
import { academyCourses, formatCoursePrice, getAcademyCourse } from "@/data/academyCourses"

export function generateStaticParams() {
  return academyCourses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getAcademyCourse(slug)

  if (!course) {
    return {
      title: "Kursus Tidak Ditemukan",
    }
  }

  return {
    title: course.title,
    description: `${course.shortDescription} Investasi belajar ${formatCoursePrice(course.price)}.`,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getAcademyCourse(slug)

  if (!course) {
    notFound()
  }

  return <AcademyCoursePage course={course} />
}
