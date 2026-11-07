import { getStudentStats } from "@/lib/student-stats";
import StudentsClient from "./students-client";

export const revalidate = 86400;

export default async function StudentsPage() {
  const stats = await getStudentStats();
  return <StudentsClient stats={stats} />;
}
