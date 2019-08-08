import React from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon, Grid} from "semantic-ui-react"

const Nav = (props) => {
    return (
        <Grid>
            <Grid.Column textAlign='right'>
                <Link className='item'onClick={props.toggleSidebar}>
                    <Icon color='black' name='bars' size='large'/>
                </Link>
            </Grid.Column>
        </Grid>
    )
}

export default Nav
