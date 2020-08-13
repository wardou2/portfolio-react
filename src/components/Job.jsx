import React from 'react';
import { Card, List, Button, Image, Icon } from 'semantic-ui-react';

import { sanitizeArray} from '../util/String'

const Job = (props) => {
    
    const skillsUsed = sanitizeArray(props.job.skills_used)
    const responsibilities = sanitizeArray(props.job.responsibilities)

    return (
        <Card raised className="corner-sharp text font-size-medium">
            {props.loggedIn && (
                <Card.Content>
                    <Button
                        onClick={(_) =>
                            props.shiftOrder('jobs', props.job, false)
                        }
                        icon={<Icon name="up arrow" />}
                        size="large"
                    />
                    <Button
                        onClick={(_) =>
                            props.shiftOrder('jobs', props.job, true)
                        }
                        icon={<Icon name="down arrow" />}
                        size="large"
                    />
                    <Button
                        onClick={(_) => props.startEdit(props.job, 'jobs')}
                        floated="right"
                        color="linkedin"
                        icon={<Icon name="edit" />}
                        size="large"
                    />
                </Card.Content>
            )}
            <Card.Content>
                <Image
                    spaced
                    floated="left"
                    size="tiny"
                    src={props.job.img_url}
                    alt={props.job.company}
                />
                <Card.Header> {props.job.title} </Card.Header>
                <Card.Meta> {props.job.company} </Card.Meta>
                <Card.Meta>
                    {' '}
                    {props.job.start_month} {props.job.start_year} -{' '}
                    {props.job.end_month}{' '}
                    {props.job.end_year ? props.job.end_year : 'Present'}
                </Card.Meta>
            </Card.Content>
            {props.job.summary && (
                <Card.Content>
                    <Card.Meta> SUMMARY </Card.Meta>
                    <Card.Description>{props.job.summary} </Card.Description>
                </Card.Content>
            )}

            {responsibilities.length > 0 && (
                <Card.Content>
                    <Card.Meta> RESPONSIBILITIES </Card.Meta>
                    <Card.Description>
                        <List bulleted>
                            {responsibilities.map((res, index) => {
                                return (
                                    <List.Item
                                        key={res + index}
                                        className="font_size_small"
                                    >
                                        {res}
                                    </List.Item>
                                );
                            })}
                        </List>
                    </Card.Description>
                </Card.Content>
            )}
            {skillsUsed.length > 0 && (
                <Card.Content>
                    <Card.Meta> SKILLS USED </Card.Meta>
                    <Card.Description>
                        <List bulleted>
                            {skillsUsed.map((skill) => {
                                return (
                                    <List.Item
                                        key={skill}
                                        className="font_size_small"
                                    >
                                        {skill}
                                    </List.Item>
                                );
                            })}
                        </List>
                    </Card.Description>
                </Card.Content>
            )}
        </Card>
    );
};

export default Job;
