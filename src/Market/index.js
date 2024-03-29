import React from 'react';
import {Modal, Button} from 'semantic-ui-react';

const Market = (props) => {

	const potionStyle = {
	  	width: "100px",
	  	hight: "100px"
    };
    const marketGrid = {
    	display: "grid",
    	gridTemplateColumns: "1fr 1fr 1fr"
    };
    const imgStyle = {
    	width: "500px",
    	height: "300px"
    }

    const modalStyle = {
    	backgroundImage:'url(/images/market.jpg)',
    	backgroundSize: 'cover',
    	minHeight: '600px',
    	display: 'grid',
    	justifyItems: 'center',
    	alignItems: 'center'
    };



    return(

        <Modal style={modalStyle} open={props.open}>
        <div style={{margin: 'auto'}}>
        <div style={marketGrid}>
        <div>
        <img style={potionStyle} src={'/images/potions/potions(5).png'} /><br/>
        <Button type="button" onClick={() => props.createItem(1)}>Purchase Minor Potion</Button>
        </div>


        <div>
        <img style={potionStyle} src={'/images/potions/potions(4).png'} /><br/>
        <Button type="button" onClick={() => props.createItem(2)}>Purchase Potion</Button>
        </div>


        <div>
        <img style={potionStyle} src={'/images/potions/potions(3).png'} /> <br/>
        <Button type="button" onClick={() => props.createItem(3)}>Purchase Super Potion</Button>
        </div>
        </div>
        <br/>
        <br/>
        <Button onClick={props.closeModal}>Exit Market</Button>
        </div>
        </Modal>
    )
}


export default Market;
