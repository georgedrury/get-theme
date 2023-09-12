import PageHeader from "@/components/page-header"
import TitleValue from "@/components/title-value"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// do not cache
export const revalidate = 0

export default async function Primitives({
	params,
}: {
	params: { id: string }
}) {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect("login")
	}

	let { data: themeData, error } = await supabase
		.from("themes")
		.select("name, primitive_collection")
		.eq("theme_id", `${params.id}`)
		.single()

	console.log(themeData)

	if (!themeData) {
		console.log("Uh oh")
		redirect("login")
	}

	const { data: primitives_from_theme } = await supabase
		.from("primitives")
		.select(`name, value, type`)
		.eq("collection_id", `${themeData.primitive_collection}`)

	console.log(primitives_from_theme)

	const transformedPrimitives = primitives_from_theme?.map((prim: any) => ({
		name: prim.name,
		value: prim.value,
		type: prim.type,
	}))

	return (
		<div className="">
			<PageHeader title={themeData.name} />
			<div className="space-y-5">
				<Card className="flex-1">
					<CardContent className="space-y-8">
						{transformedPrimitives!.map((token) => (
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
