import React from 'react';
import logoImage from "../img/logo.svg";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const Logo = () => {

	return (
		<Div>
			<img style={{
				display: "block",
				width: "60vw",
				margin: "20px auto"
			}} src={logoImage} alt="Persik The Cat"/>
		</Div>
	);
};

export default Logo;