import { Card, CardContent } from "./ui/card"

interface PaletteProps {
	title: string
	value: string
	type: string
}

export default function Palette({ title, value, type }: PaletteProps) {
	return (
		<Card>
			<CardContent className="p-2 lg:p-5">
				<div className="flex gap-4 items-start">
					{type === "color" && (
						<div
							className="h-4 w-4 rounded-full mt-1"
							style={{ background: value }}
						></div>
					)}
					{type === "spacing" && (
						<div className="h-3 w-4  border border-white border-t-zinc-400 border-b-zinc-400 mt-1"></div>
					)}
					{type === "radius" && (
						<div className="h-4 w-4  rounded-full border border-white border-t-zinc-300 border-l-zinc-300 mt-1"></div>
					)}
					<div className="flex flex-wrap justify-between w-full">
						<div className="flex justify-between gap-2">
							<div className="text-sm ">{title}</div>
							<div className="text-sm text-zinc-500">{value}</div>
						</div>
						<pre className="bg-zinc-100 px-2 py-1 rounded-md text-xs ">
							--{type}-{title}: {value};
						</pre>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
