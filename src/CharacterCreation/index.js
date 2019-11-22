import React, {Component} from 'react'
import { Form, Card, Label, Header, Button, Grid} from 'semantic-ui-react'
import RenderCompanionImage from '../RenderCompanionImage'

class CharacterCreation extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            race: "",
            char_class: "",
            health: '',
            damage: '',
            image: '/testImages/default.gif'
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(e.currentTarget.name)
    }
    handleRace = async (e) => {
        await this.setState({
            race: e.currentTarget.value
        })
        console.log("Race",this.state.race);
        switch(this.state.race){
            case 'Human':
                this.setState({
                    health: 14,
                    damage: 2,
                    image: '/testImages/human.png'
                })
                break;
            case 'Orc':
                this.setState({
                    health: 15,
                    damage: 3,
                    image: '/testImages/orc.png'
                })
                break;
            case 'Elf':
                this.setState({
                    health: 8,
                    damage: 1,
                    image:'/testImages/default.gif'
                })
                break;
            case 'Dwarf':
                this.setState({
                    health: 12,
                    damage: 2,
                    image: '/testImages/dwarf.png'
                })
                break;
            default:
                this.setState({
                    health: 10,
                    damage: 1
                })
                break;
        }
    }
    handleClass = async (e) => {
        await this.setState({
            char_class: e.target.value
        })
        console.log("Selected Class", this.state.char_class)
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const companionUrl = `${process.env.REACT_APP_API_URL}/api/v1/companions/`;
        const companionResponse = await fetch(companionUrl, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedResponse = await companionResponse.json()

        if(parsedResponse.status.code === 201){
            this.props.history.push('/home')
        } else{
            this.setState({
                errorMsg: parsedResponse.status.message
            })
        }
    }
    render(){
        return(
            <Grid>
                <Grid.Row>

                    <Grid.Column width={8}>
                        <Card centered>
                            <Card.Content>
                                <Header>Character Creation</Header>
                                <Form onSubmit={this.handleSubmit}>
                                    <Label>Name</Label>
                                    <Form.Input name="name" value={this.state.name} type="text" onChange={this.handleChange}/>
                                    <Label>Race</Label>
                                    <Card>
                                        <Card.Content>
                                            <Button type="button" onClick={this.handleRace} value="Human">Human</Button>
                                            <Button type="button" onClick={this.handleRace} value="Orc">Orc</Button>
                                            <Button type="button" onClick={this.handleRace} value="Elf">Elf</Button>
                                            <Button type="button" onClick={this.handleRace} value="Dwarf">Dwarf</Button>
                                        </Card.Content>
                                    </Card>
                                    <Label>Class</Label>
                                    <Card>
                                        <Card.Content>
                                            <Button type="button" onClick={this.handleClass} value="Warrior">Warrior</Button>
                                            <Button type="button" onClick={this.handleClass} value="Rogue">Rogue</Button>
                                            <Button type="button" onClick={this.handleClass} value="Mage">Mage</Button>
                                        </Card.Content>
                                    </Card>
                                    <Label>Health</Label>
                                    <Form.Input name="health" value={this.state.health} type="number" onChange={this.handleChange} disabled/>
                                    <Label>Damage</Label>
                                    <Form.Input name="damage" value={this.state.damage} type="number" onChange={this.handleChange} disabled/>
                                    <Button color="green" type='submit'>Create</Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <img src={this.state.image} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default CharacterCreation;