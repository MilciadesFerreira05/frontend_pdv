import React from 'react'

const TableData = ({ data = [], columns = [] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{column?.map((c) => (
						<TableHead>{c.label}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((d, index) => (
					<TableRow key={index}>
						{Object.keys(d).map((key) => (
							<TableCell>{d[key]}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

const Table = ({ children, className = '' }) => {
	return <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
}

const TableHeader = ({ children, className = '' }) => {
	return <thead className={` ${className}`}>{children}</thead>
}

const TableRow = ({ children, className = '' }) => {
	return <tr className={`bg-white divide-x divide-gray-200 ${className}`}>{children}</tr>
}

const TableHead = ({ children, className = '' }) => {
	return (
		<th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
			{children}
		</th>
	)
}

const TableBody = ({ children, className = '' }) => {
	return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
}

const TableCell = ({ children, className = '' }) => {
	return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>{children}</td>
}

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell }
