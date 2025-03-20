import AdviewPage from "@/components/AdviewPage";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <div>
    <AdviewPage id={id} />
  </div>
}