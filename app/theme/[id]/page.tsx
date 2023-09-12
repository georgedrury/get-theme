import PageHeader from "@/components/page-header"
import TitleValue from "@/components/title-value"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

// do not cache
export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function Theme({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect("/login")
	}

	let { data: theme, error } = await supabase
		.from("themes")
		.select("name, token_collection, theme_id")
		.eq("theme_id", `${params.id}`)
		.single()

	if (!theme) {
		return <div className="max-w-2xl mx-auto mt-24">fuck</div>
	}

	const { data: tokens_from_theme } = await supabase
		.from("tokens")
		.select(`name, primitive_id(value, type)`)
		.eq("collection_id", `${theme.token_collection}`)

	const transformedTokens = tokens_from_theme?.map((token: any) => ({
		name: token.name,
		value: token.primitive_id.value,
		type: token.primitive_id.type,
	}))

	const cssVariables = tokens_from_theme!
		.map((token: any) => `--${token.name}: ${token.primitive_id.value};`)
		.join("\n")

	const cssString = `:root {\n${cssVariables}\n}`

	return (
		<div className="">
			<PageHeader title={theme.name} />

			<nav className="flex gap-3">
				<Link
					className="px-2 py-1 bg-zinc-100"
					href={`${theme.theme_id}/tokens`}
				>
					Tokens
				</Link>
				<Link
					className="px-2 py-1 bg-zinc-100"
					href={`${theme.theme_id}/primitives`}
				>
					Primitives
				</Link>
			</nav>

			<div className="space-y-5">
				<Card>
					<CardContent>
						<pre className="bg-zinc-50 px-4 py-4 rounded-md text-sm ">
							{cssString}
						</pre>
					</CardContent>
				</Card>

				<Card className="flex-1">
					<CardContent className="space-y-8 sm:p-2 md:p-5">
						{transformedTokens!.map((token) => (
							<TitleValue
								key={token.name}
								type={token.type}
								title={token.name}
								value={token.value}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
