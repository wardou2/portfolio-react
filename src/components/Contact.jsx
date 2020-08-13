import React, { useState } from "react";
import { Grid, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const parsePhoneNum = (num) => {
    if (num) {
        return `(${num.slice(0, 3)}) ${num.slice(3, 6)} ${num.slice(6)}`;
    }
    return "";
};

const Contact = (props) => {
    const [hideInfo, setHideInfo] = useState(true);
    const toggleContact = () => {
        setHideInfo(!hideInfo);
    };

    return (
        <Grid columns={16}>
            <Grid.Row />
            <Grid.Row centered>
                <Link to="/#nav">
                    <Icon name="triangle up" />
                </Link>
            </Grid.Row>
            <Grid.Row
                only="computer tablet"
                className={`${props.user.color_theme}-heading`}
                verticalAlign="middle"
            >
                <Grid.Column width={1} />
                <Grid.Column width={4} verticalAlign="middle">
                    <span className="font-size-large font-heading">
                        {props.text}
                    </span>
                </Grid.Column>
                {hideInfo ? (
                    <Grid.Column width={6} className="text" textAlign="center">
                        <Button secondary onClick={toggleContact}>
                            Show Contact Info
                        </Button>
                    </Grid.Column>
                ) : (
                    <>
                        <Grid.Column
                            width={3}
                            className="text"
                            textAlign="center"
                        >
                            <a href={`mailto:${props.user.email}`}>
                                {props.user.email}
                            </a>
                        </Grid.Column>
                        <Grid.Column
                            width={3}
                            className="text"
                            textAlign="center"
                        >
                            <a href={`tel: +1${props.user.phone}`}>
                                +1 {parsePhoneNum(props.user.phone)}
                            </a>
                        </Grid.Column>
                    </>
                )}
                <Grid.Column width={4} />
            </Grid.Row>
            <Grid.Row
                only="mobile"
                className={`${props.user.color_theme}-heading`}
                verticalAlign="middle"
            >
                <Grid.Column width={1} />
                <Grid.Column width={4} verticalAlign="middle">
                    <span className="font-size-large font-heading">
                        {props.text}
                    </span>
                </Grid.Column>
                {hideInfo ? (
                    <Grid.Column width={10} className="text" textAlign="center">
                        <Button secondary onClick={toggleContact}>
                            Show Contact Info
                        </Button>
                    </Grid.Column>
                ) : (
                    <Grid.Column width={10} className="text" textAlign="center">
                        <Grid.Row>
                            <a href={`mailto:${props.user.email}`}>
                                {props.user.email}
                            </a>
                        </Grid.Row>
                        <Grid.Row>
                            <a href={`tel: +1${props.user.phone}`}>
                                +1 {parsePhoneNum(props.user.phone)}
                            </a>
                        </Grid.Row>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Contact;
