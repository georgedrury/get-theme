import { Card, CardContent } from "./ui/card"

interface PaletteProps {
	title: string
	value?: string
}

export default function Palette({ title, value }: PaletteProps) {
	return (
		<Card>
			<CardContent>
				<div className="flex gap-8 items-center">
					<div
						className="h-3 w-3 rounded-full"
						style={{ background: value }}
					></div>
					<div>{title}</div>
					<div>{value}</div>
				</div>
			</CardContent>
		</Card>
	)
}
