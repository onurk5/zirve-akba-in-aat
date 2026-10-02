import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://zirveakbas.com.tr"
  
  const projects = await db.project.findMany({
    select: { slug: true, updatedAt: true },
    where: { status: "Tamamlandı" } // Optional filter if needed
  })

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projeler/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  })) as MetadataRoute.Sitemap

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectUrls
  ]
}
