import React from 'react';
import {v4 as uuid} from "uuid";

export default function StocksList({stocks}) {
	return (
		<>
			<h3>Hi, There</h3>
			<div className="row">
				{stocks.map(x => {
					return <div className=" six" key={uuid()}>
                    <h5>{x.name}</h5>
					<h6>{x.short_code}</h6>
					
					<p>INR: {x.price}</p>
				</div>;})
				}
			</div>
		</>
	);
}