import React, { useState, useEffect } from 'react';

const App = () => {
	const [data, setData] = useState([]);
	const [tempData, setTempData] = useState([]);
	useEffect(() => {
		function fetchData() {
			fetch('https://api.publicapis.org/categories')
				.then((res) => res.json())
				.then((response) => {
					setData(response);
					setTempData(response);
				});
		}
		fetchData();
	}, []);
	function filterData(wordsearch) {
		const result = tempData.filter(function (el) {
			return el.toLowerCase().indexOf(wordsearch.toLowerCase()) !== -1;
		});
		if (result.length < 0) {
			setData(tempData);
		} else {
			setData(result);
		}
	}
	return (
		<div className='App'>
			<div>
				<input
					type='text'
					style={{ width: '25%' }}
					onChange={(e) => {
						filterData(e.target.value);
					}}
				></input>
			</div>
			<br></br>
			<div>
				<table style={{ border: 'solid black 1px', width: '100%' }}>
					<tbody>
						<tr>
							<th style={{ border: 'solid black 1px', width: '100%' }}>Categories</th>
						</tr>

						{data.map((data, key) => {
							return (
								<tr key={key + 1}>
									<td style={{ border: 'solid black 1px', width: '100%' }}>{data}</td>
								</tr>
							);
						})}
					</tbody>
				</table>{' '}
			</div>
		</div>
	);
};

export default App;
