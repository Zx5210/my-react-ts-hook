export const Mark = ({ name, keyWord }: { name: string; keyWord: string }) => {
	if (!keyWord) {
		return <>{name}</>
	}
	const ary = name.split(keyWord)
	return (
		<>
			{ary.map((str: string, index: number) => (
				<span key={index}>
					{str}
					{index === ary.length - 1 ? null : (
						<span style={{ color: '#257AFD' }}>{keyWord}</span>
					)}
				</span>
			))}
		</>
	)
}
