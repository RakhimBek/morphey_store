import React from 'react';
import Card from "@vkontakte/vkui/dist/components/Card/Card";


const PrizeItem = ({index, color, info}) => {

	return (
		<Card size="s" key={info.id} style={{
			backgroundColor: "#9B8868",
			textAlign: "center",
			padding: "24px",
			margin: "7px"
		}}>
			<p>{info.firstField}</p>
			<p style={{fontWeight: "bold"}}>{info.secondField}</p>
			<p>{info.thirdField}</p>
		</Card>
	);
}


export default PrizeItem;