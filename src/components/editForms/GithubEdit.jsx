import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class GithubEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: {
                id: -1,
            },
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.content.id !== state.content.id) {
            return { content: props.content };
        }
        return null;
    }

    handleChange = (ev) => {
        this.setState({
            content: {
                ...this.state.content,
                [ev.target.name]: ev.target.value,
            },
        });
    };

    handleNestedChange = (ev, i) => {
        const copy = this.state.content[ev.target.name];
        copy[i] = ev.target.value;
        this.setState({
            content: {
                ...this.state.content,
                [ev.target.name]: copy,
            },
        });
    };

    handleAddContribution = () => {
        const contributionCopy = this.state.content.contribution;
        contributionCopy.push('');
        this.setState({
            content: {
                ...this.state.content,
                contribution: contributionCopy,
            },
        });
    };

    handleRemoveContribution = (i) => {
        const contributionCopy = this.state.content.contribution;
        contributionCopy.splice(i, 1);
        this.setState({
            content: {
                ...this.state.content,
                contribution: contributionCopy,
            },
        });
    };

    render() {
        return (
            <Form
                inverted
                onSubmit={() => this.props.handleSubmit(this.state.content)}
            >
                <Form.Field>
                    <label>Name</label>
                    <input
                        name="name"
                        value={this.state.content.name}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Front End Repo URL</label>
                    <input
                        name="repo_url_front"
                        value={this.state.content.repo_url_front}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Back End Repo URL</label>
                    <input
                        name="repo_url_back"
                        value={this.state.content.repo_url_back}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Demo URL</label>
                    <input
                        name="demo_url"
                        value={this.state.content.demo_url}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Summary</label>
                    <input
                        name="summary"
                        value={this.state.content.summary}
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <label>Contributions</label>
                {this.state.content.contribution.map((res, i) => {
                    return (
                        <Form.Group key={i}>
                            <input
                                name="contribution"
                                value={this.state.content.contribution[i]}
                                onChange={(ev) =>
                                    this.handleNestedChange(ev, i)
                                }
                            />
                            <Button
                                negative
                                type="button"
                                onClick={() => this.handleRemoveContribution(i)}
                            >
                                {' '}
                                -{' '}
                            </Button>
                        </Form.Group>
                    );
                })}
                <Button type="button" onClick={this.handleAddContribution}>
                    Add New Contribution
                </Button>

                <Form.Field>
                    <label>Image URL</label>
                    <input
                        name="img_url"
                        value={this.state.content.img_url}
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Button type="submit">Submit</Button>
                <Button
                    negative
                    type="button"
                    onClick={() => this.props.handleDelete(this.state.content)}
                >
                    Delete
                </Button>
            </Form>
        );
    }
}
