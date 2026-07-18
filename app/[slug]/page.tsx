import { notFound, redirect } from "next/navigation";
import { getOriginalUrlData } from "@/app/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getOriginalUrlData(slug);
  const url = data?.original_url;

  if (url) redirect(url);
  notFound();
}
