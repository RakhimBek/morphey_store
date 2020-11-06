import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CardScroll from "@vkontakte/vkui/dist/components/CardScroll/CardScroll";
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import './Home.css'

import Card from "@vkontakte/vkui/dist/components/Card/Card";
import Logo from "./Logo";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";

const path = path => {
    return `https://randee.store/morphey${path}`;
}

const Home = ({id, go, fetchedUser, setPopout, setActivePanel}) => {
    const [prizeList, setPrizeList] = useState([]);

    function Prizes({list}) {
        return list.map((el, id) => {
            console.log(el.path);
            return (
                <Card className="Home__prize-image" size="s" key={id}>
                    <img style={{
                        marginTop: (id % 2) === 0 ? "25px" : "0px"
                    }} src={path(el.path)} alt="product"/>
                </Card>
            );
        });
    }

    useEffect(() => {
        fetch(path('/api/vk/prize'), {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => data.data)
            .then(data => {
                setPrizeList(data);
            })
            .catch(data => {
                console.log(data);
            });
    }, []);

    function play(e) {
        let to = e.currentTarget.dataset.to;
        setPopout(<ScreenSpinner size='large'/>);
        setTimeout(function () {
            setPopout(null);
            setActivePanel(to);
        }, 5000);
    }

    return (
        <Panel id={id}>
            <PanelHeader>Морфей</PanelHeader>
            <Group separator="hide" className="Home__logo">
                <Logo/>
            </Group>
            <Group separator="hide">
                <Cell multiline={true} style={{textAlign: "center", fontFamily: "sans-serif, sans-serif"}}>
                    Учавствуй в аттракционе подарков от компании Морфей!
                </Cell>
            </Group>
            <Group separator="hide">
                <CardScroll onScroll={(e) => {
                    e.persist();
                    console.log(e.target)
                }}>
                    <Prizes list={prizeList}/>
                </CardScroll>
            </Group>
            <FixedLayout vertical="bottom">
                <Button size="xl" level="2" onClick={play} data-to="persik" className="try-fortune-btn">
                    Испытать удачу
                </Button>
            </FixedLayout>
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;
