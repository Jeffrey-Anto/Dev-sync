import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StudentProfile from "@/components/students/StudentProfile";
import { STUDENTS, getStudent } from "@/data/students";

export function generateStaticParams() {
  return STUDENTS.map((student) => ({ slug: student.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const student = getStudent(slug);

  if (!student) {
    return { title: "Student not found" };
  }

  return {
    title: `${student.name} — ${student.role}`,
    description: student.tagline,
    alternates: { canonical: `/students/${student.slug}` },
    openGraph: {
      title: `${student.name} — ${student.role} | GCES CSE 2027`,
      description: student.tagline,
      url: `/students/${student.slug}`,
    },
  };
}

export default async function StudentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const student = getStudent(slug);

  if (!student) notFound();

  return <StudentProfile student={student} />;
}
