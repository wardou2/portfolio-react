import React from "react";
import { Grid } from "semantic-ui-react";

import SectionHeading from "./SectionHeading";

const MUSIC_URLS = [
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/871499902&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
];

const Music = (props) => {
    const getEmbeds = () => {
        let i = 0;
        return MUSIC_URLS.map((url) => {
            i += 1;
            const width = props.isMobile ? 16 : 6;
            return (
                <Grid.Column width={width} key={i}>
                    <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={url}
                        title={i}
                    ></iframe>
                </Grid.Column>
            );
        });
    };

    return (
        <div>
            <SectionHeading
                text="Music"
                startEdit={(_) => props.startEdit(props.user, "users")}
                editing={props.editing}
                loggedIn={props.loggedIn}
                sectionEdit={true}
                user={props.user}
            />
            <Grid>
                <Grid.Row centered>{getEmbeds()}</Grid.Row>
            </Grid>
        </div>
    );
};

export default Music;
