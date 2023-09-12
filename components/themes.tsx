import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent } from "./ui/card"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion"
import { Label } from "./ui/label"
import Palette from "./palette"
import Link from "next/link"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function Themes() {
	const supabase = createServerComponentClient({ cookies })

	const { data: themes } = await supabase.from("themes").select(`*`)

	return (
		<div className="flex flex-col gap-4">
			<div className="">
				{themes?.map((theme, i) => (
					<Link key={i} href={`/theme/${theme.theme_id}`}>
						<div className="flex items-center justify-between px-12 py-8 bg-zinc-200/50 backdrop-blur-sm rounded-2xl hover:scale-105 transition cursor-pointer shadow-sm hover:shadow-2xl hover:-skew-y-2 hover:bg-zinc-200/20 ">
							<div>
								<h1 className="text-xl font-medium">{theme.name}</h1>
							</div>
							<Image
								src={
									"https://global-uploads.webflow.com/62f22a75df043850e3e9e22c/6304a0f7d396fd7083933443_Flecha.svg"
								}
								height="36"
								width="36"
								alt="view"
							/>
						</div>
					</Link>
				))}
			</div>

			{/* <pre>{JSON.stringify(themes, null, 2)}</pre> */}
		</div>
	)
}
