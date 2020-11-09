import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Cell, IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import prizeImage from '../img/prize.svg';
import './Victory.css';
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import bridge from "@vkontakte/vk-bridge";
import Logo from "./Logo";

const osName = platform();

const path = path => {
	return `https://randee.store/morphey${path}`;
}

const Victory = ({id, fetchedUser, go}) => {
	const [prize, setPrize] = useState({});

	function share() {
		bridge
			.send("VKWebAppShowWallPostBox", {
				"message": `Я выйграл "${prize.title}" от Компании Морфей @morphey_nsk`,
			})
			.then((data) => {
				console.log('data then');
			}, (data) => {
				console.log(data);
			})
			.finally(() => {
				console.log('finally data');
			});
	}

	useEffect(() => {
		fetch(path('/api/vk/prize/random?vk_user_id=' + fetchedUser.id), {
			method: 'POST',
			body: JSON.stringify({})
		})
			.then(data => data.json())
			.then(data => data.data)
			.then(data => {
				setPrize(data);
			})
			.catch(data => {
				console.log(data);
			});
	}, [])

	return (
		<Panel id={id} separator={true}>
			<PanelHeader transparent={true}
						 separator={true}
						 visor={true}
						 left={
							 <PanelHeaderButton onClick={go} data-to="home">
								 {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
							 </PanelHeaderButton>
						 }
			>
				Морфей
			</PanelHeader>

			<Group separator="hide">
				<Logo/>
			</Group>
			<Group separator="hide">
				<Cell className="won-txt">
					Поздравляем!
				</Cell>
			</Group>
			<Group separator="hide">
				<img className="Prize" src={prizeImage} alt="celebration"/>
			</Group>
			<Group separator="hide">
				<Cell className="won-txt">
					Вы выиграли!
				</Cell>
			</Group>
			<Group separator="hide">
				<img src={path(prize.path)} className="Prize" alt="product"/>
			</Group>
			<Group separator="hide">
				<Cell className="won-condition" multiline={true}>
					Чтобы получить выигрыш сделайте репост записи на стену или <a href="https://vk.com/im?media=&sel=-167434289">напишите в сообщество</a>
				</Cell>
			</Group>
			<Group separator="hide">
				<Button size="l" level="2" onClick={share} data-to="persik" className="get-fortune-btn">
					Забрать приз
				</Button>
			</Group>
			<Group separator="hide">
				<Cell></Cell>
			</Group>
		</Panel>
	)
};

Victory.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Victory;
