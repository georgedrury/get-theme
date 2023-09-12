import PageHeader from "@/components/page-header"
import Palette from "@/components/palette"
import { Card, CardContent } from "@/components/ui/card"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// do not cache
export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function Theme({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect("/login")
	}

	let { data: project, error } = await supabase
		.from("projects")
		.select(
			`
    *,
    themes (
    *
    ), primitives(*)
  `
		)
		.eq("id", `${params.id}`)
		.single()

	if (!project) {
		return <div className="max-w-2xl mx-auto mt-24">fuck</div>
	}

	console.log(project)

	const userIsCreator = session.user.id === project.created_by

	return (
		<div className="">
			<PageHeader title={project.id} />
			<div className="flex flex-col gap-12">
				<div className="flex flex-col gap-4">
					<p className="text-zinc-800 font-semibold">Primitives</p>
					<pre className="bg-zinc-50 px-4 py-6 rounded-lg">
						{JSON.stringify(project.primitives, null, 2)}
					</pre>
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-zinc-800 font-semibold">Theme</p>
					<pre className="bg-zinc-50 px-4 py-6 rounded-lg">
						{JSON.stringify(project.themes, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	)
}
