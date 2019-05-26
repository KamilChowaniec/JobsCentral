import React, { Component } from 'react';
import { Row} from 'antd';
import Job from '../Job/Job';
import './JobList.css'
import AnimateHeight from 'react-animate-height';



class JobList extends Component {
    state = {
        jobs: [
            {
                info: {
                    id: 0,
                    logo: 'https://www.galeriatwierdza.pl/_cache/shops/510-255/fill/biedronka.png',
                    title: 'Kierownik Sklepu',
                    firm: 'Biedronka S.A.',
                    city: 'Kraków',
                    position: 'Kierownik',
                    dimensions: 'Pełny Etat',
                    description: 'Praca w biedronie przyjdz nie czekaj'
                },
                state: {
                    clicked: false,
                    collapsed: false
                }
            },
            {
                info:
                {
                    id: 1,
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/LogoL.png/800px-LogoL.png',
                    title: 'Sprzedawca',
                    firm: 'Lacoste Polska Sp. z o.o.',
                    city: 'Wrocław',
                    position: 'Specjalista',
                    dimensions: 'Pełny Etat',
                    description: 'Panie sprzedawaj u nas'
                },
                state: {
                    clicked: false,
                    collapsed: false
                }
            },
            {
                info: {
                    id: 2,
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Adecco_Logo.svg/1280px-Adecco_Logo.svg.png',
                    title: 'Kierowca Street View',
                    firm: 'Adecco Poland Sp. z o.o.',
                    city: 'Kraków',
                    position: 'Specjalista',
                    dimensions: 'Pełny Etat',
                    description: 'No kieruj no'
                },
                state: {
                    clicked: false,
                    collapsed: false
                }
            },
            {
                info: {
                    id: 3,
                    logo: 'https://static.wirtualnemedia.pl/media/top/allianz-logo655.png',
                    title: 'Doradca ds. ubezpieczeń',
                    firm: 'Allianz',
                    city: 'Kraków',
                    position: 'Specjalista',
                    dimensions: 'Pełny Etat',
                    description: 'Oferujemy: wsparcie finansowe od pierwszego dnia współpracy przez okres 26 miesiecy atrakcyjne wynagrodzenie prowyzyjne + bonusy system profesjonalnych szkoleń umożliwiających rozwój osobisty i realizację celów atrakcyjne konkursy lokalne i wiele więcej. Dołącz do dynamicznego zespoły największego ubezpieczyciela w polsce!'
                },
                state: {
                    clicked: false,
                    collapsed: false
                }
            },
        ],
        lastClicked: 0,
        items: ['hello', 'world', 'click', 'me']
    }

    handleJobClick = (ind) => {
        let jobs = [...this.state.jobs];
        let tmp = !jobs[ind].state.clicked;
        if (this.state.lastClicked !== -1) {
            jobs[this.state.lastClicked].state.clicked = false;
            jobs[this.state.lastClicked].state.leaving = true;
        }
        if (tmp) jobs[ind].state.leaving = true;
        jobs[ind].state.clicked = tmp;
        this.setState({ jobs: jobs, lastClicked: ind });
    };

    handleRemove = (i) => {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }

    handleAdd = () => {
        const newItems = [...this.state.items, "Newitem" + Math.random()];
        this.setState({ items: newItems });
    }

    componentWillReceiveProps(nextProps) {
        let jobs = [...this.state.jobs];
        for (let j of jobs) {
            if (!j.info.city.toLowerCase().includes(nextProps.query.city.toLowerCase())) {
                j.state.collapsed = true;
                j.state.clicked = false;
            }
            else j.state.collapsed = false;
        }
        console.log(jobs);
        this.setState({ jobs });
    }

    render() {
        let jobs = [];
        let j = 0;
        for (let i = 0; i < this.state.jobs.length; i++) {
            let el = this.state.jobs[i];
            if (!el.state.collapsed) j++;
            jobs.push(<div key={el.info.id} className={el.state.clicked ? 'JobListJob Clicked' : 'JobListJob'}>
                <AnimateHeight height={el.state.collapsed ? 0 : 'auto'} duration={500} easing='ease-in-out'>
                    <Job bg={j % 2 ? '#36393E' : '#303136'} {...el.info} clicked={el.state.clicked} onClick={() => this.handleJobClick(i)} />
                </AnimateHeight>
            </div>);
        }
        return (
            <Row type='flex' justify='center'>
                <div className='JobList'>
                    {jobs}
                </div>
            </Row>
        );
    }
}

export default JobList;
