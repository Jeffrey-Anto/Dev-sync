import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StudentProfile from "@/components/students/StudentProfile";
import { STUDENTS, getStudent, getStudentDomain } from "@/data/students";
import { getStudentStats } from "@/lib/student-stats";

export const revalidate = 86400;

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

  const subtitle = student.role ?? getStudentDomain(student)?.shortName ?? "CSE 2027";
  const description =
    student.tagline ?? `${student.name} — ${subtitle}, GCE Srirangam, Batch 2027.`;

  return {
    title: `${student.name} — ${subtitle}`,
    description,
    alternates: { canonical: `/students/${student.slug}` },
    openGraph: {
      title: `${student.name} — ${subtitle} | GCES CSE 2027`,
      description,
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

  const stats = await getStudentStats();

  return <StudentProfile student={student} stats={stats[slug]} />;
}
