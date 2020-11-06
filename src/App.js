import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Victory from './panels/Victory';

const path = path => {
	return `https://randee.store/morphey${path}`;
}

const App = () => {
	const [popout, setPopout] = useState();
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState({
		id: 12345
	});

	useEffect(() => {
		bridge
			.subscribe(({detail: {type, data}}) => {
				if (type === 'VKWebAppUpdateConfig') {
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
				}
			});

		bridge
			.send('VKWebAppGetUserInfo')
			.then(data => {
				setUser(data);
				registerUser(data.id);
			})
			.catch(error => {
				console.log(error);
			});

		bridge
			.send('VKWebAppStorageSet', {
				key: "one",
				value: "two"
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});

		bridge
			.send('VKWebAppStorageGet', {
				keys: ["one"]
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	function registerUser(userId) {
		fetch(path('/api/vk/register?vk_user_id=' + userId), {
			method: 'POST',
			body: JSON.stringify({})
		})
			.then(data => data.json())
			.then(data => data.data)
			.then(data => {
				console.log(data);
			})
			.catch(data => {
				console.log(data);
			});
	}

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} setPopout={setPopout} setActivePanel={setActivePanel} go={go}/>
			<Victory id='persik' fetchedUser={fetchedUser} go={go}/>
		</View>
	);
}

export default App;

