import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import EditProjectForm from "./edit-form"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  // Await the params to resolve Next.js 15+ constraints if needed, but in 14 it's fine.
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id }
  })

  if (!project) {
    notFound()
  }

  return <EditProjectForm project={project} />
}
