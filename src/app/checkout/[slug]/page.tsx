import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CourseCheckoutClient } from "@/components/checkout/CourseCheckoutClient"
import { academyCourses, getAcademyCourse } from "@/data/academyCourses"

const CHECKOUT_COURSE_SLUGS = ["blueprint-bebas-utang"]

export function generateStaticParams() {
  return CHECKOUT_COURSE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const course = getAcademyCourse(slug)

  return {
    title: course ? `Pembayaran ${course.title}` : "Pembayaran Kelas",
    description: course?.shortDescription,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = academyCourses.find((item) => CHECKOUT_COURSE_SLUGS.includes(item.slug) && item.slug === slug)

  if (!course) {
    notFound()
  }

  return <CourseCheckoutClient course={course} />
}
