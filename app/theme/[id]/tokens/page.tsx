import PageHeader from "@/components/page-header"
import TitleValue from "@/components/title-value"
import TokenInput from "@/components/token-input"
import { Card, CardContent } from "@/components/ui/card"
import { Database } from "@/lib/database"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Tokens({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect("/login")
	}

	let { data: themeData, error } = await supabase
		.from("themes")
		.select("name, token_collection, theme_id")
		.eq("theme_id", `${params.id}`)
		.single()

	console.log(themeData)

	if (!themeData) {
		return <div className="max-w-2xl mx-auto mt-24">fuck</div>
	}

	const { data: tokens_from_theme } = await supabase
		.from("tokens")
		.select(`name, primitive_id(value, type)`)
		.eq("collection_id", `${themeData.token_collection}`)

	console.log(tokens_from_theme)

	const transformedTokens = tokens_from_theme?.map((token: any) => ({
		name: token.name,
		value: token.primitive_id.value,
		type: token.primitive_id.type,
	}))

	console.log(transformedTokens)

	return (
		<div className="">
			<PageHeader title={themeData.name} />
			<div className="space-y-8">
				<div className="space-y-5">
					<Card className="flex-1">
						<CardContent className="space-y-8">
							<div className="mt-8 flex flex-col gap-4">
								<form>
									{transformedTokens!.map((token) => (
										<TokenInput
											key={token.name}
											tokenType={token.type}
											tokenName={token.name}
											tokenValue={token.value}
										/>
									))}
								</form>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="space-y-5">
					<Card className="flex-1">
						<CardContent className="space-y-8">
							{transformedTokens!.map((token) => (
								<TitleValue
									key={token.type}
									type={token.type}
									title={token.name}
									value={token.value}
								/>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
