import React from 'react';

function StocksList({stocks}) {
	return (
		<>
			<h3>Hi, There</h3>
			<div className="row">
				{stocks.map((x) => {
					return (
						<div
							style={{
								marginBottom: '3px',
								padding: '3px',
								border: "1px solid black"
							}}
							className="six"
							key={x._id}
						>
							<div
								style={{width: '80%', display: 'inline-block'}}
							>
								<h5 style={{marginBottom: '2px'}} key={x.name}>{x.name}</h5>
								<h6
									style={{
										background: 'blue',
										color: 'white',
										padding: '3px',
										textTransform: 'uppercase',
										display: 'inline-block',
									}}
									key={x.short_code}
								>
									{x.short_code}
								</h6>
							</div>
							<div
								style={{width: '20%', display: 'inline-block'}}
							>
								<span
									style={{
										background: 'green',
										color: 'white',
										padding: '3px',
									}}
									key={x.price}
								>
									INR: {x.price}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default React.memo(StocksList);