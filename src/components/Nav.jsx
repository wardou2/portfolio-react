import React from "react";
import { Link } from "react-router-dom";
import { Icon, Grid } from "semantic-ui-react";
import NavLinks from "./NavLinks";

const Nav = (props) => {
    return (
        <Grid>
            <Grid.Column width={15} stretched>
                <NavLinks toggleSidebar={props.toggleSidebar} />
            </Grid.Column>
            <Grid.Column width={1} verticalAlign="middle">
                <Link className="item" onClick={props.toggleSidebar} to="">
                    <Icon color="black" name="bars" size="large" />
                </Link>
            </Grid.Column>
        </Grid>
    );
};

export default Nav;
