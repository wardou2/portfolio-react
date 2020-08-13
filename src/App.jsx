/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import "./App.css";
import React from "react";
import {
    Icon,
    Menu,
    Segment,
    Sidebar,
    Sticky,
    Confirm,
    Button,
} from "semantic-ui-react";

import Content from "./components/Content";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";
import Editor from "./components/Editor";
import NavLinks from "./components/NavLinks";

const apiURL = "https://douglaswardportfolio-backend.herokuapp.com/api/v1/";
// const apiURL = 'http://localhost:3000/api/v1/'
const HEADERS_AUTH = {
    Authorization: `Bearer ${localStorage.jwt}`,
    "Content-Type": "application/json",
};
const HEADERS_NOAUTH = {
    "Content-Type": "application/json",
};

const DEFAULT_STATE = {
    jobs: [],
    githubs: [],
    interests: [],
    skills: [],
    honors: [],
    links: [],
    users: [],

    message: "",
    currentUser: {},
    sidebarVisible: false,
    loggedIn: false,
    editorDisabled: true,
    editing: {},
    editingType: "",
    creating: {},
    creatingType: "",
    isMobile: false,
};

const keys = Object.keys(DEFAULT_STATE);
const anchors = keys.slice(0, 7);
// used to automate fetch -- the first 7 entries in default state
// are the names of the resources we want to fetch.

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    componentDidMount() {
        // check for logged in user
        if (!!localStorage.jwt && !!localStorage.username) {
            this.setState({
                loggedIn: true,
                username: localStorage.username,
            });
        } else {
            this.setState({
                loggedIn: false,
            });
        }
        // automated fetch
        // special fetch for users
        fetch(`${apiURL}users`)
            .then((res) => res.json())
            .then((users) => {
                this.setState({
                    currentUser: users[0],
                });
            })
            .then((res) => {
                anchors.forEach((a) => {
                    fetch(apiURL + a)
                        .then((result) => result.json())
                        .then((json) => {
                            const relevantObjs = [];
                            json.forEach((ob) => {
                                if (ob.user_id === this.state.currentUser.id) {
                                    relevantObjs.push(ob);
                                }
                            });
                            this.setState({
                                [a]: relevantObjs,
                            });
                        });
                });
            });
        this.setState({
            isMobile: window.matchMedia("only screen and (max-width: 760px)")
                .matches,
        });
    }

    toggleSidebar = () => {
        // open or close sidebar & clear editingType
        this.setState({
            sidebarVisible: !this.state.sidebarVisible,
            editingType: "",
        });
    };

    login = (ev, username, password) => {
        ev.preventDefault();
        this.setState({
            message: "",
        });
        fetch(`${apiURL}login`, {
            method: "POST",
            headers: HEADERS_NOAUTH,
            body: JSON.stringify({
                user: {
                    username,
                    password,
                },
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json && json.jwt) {
                    localStorage.setItem("jwt", json.jwt);
                    localStorage.setItem("username", username);
                    this.setState({
                        username,
                        loggedIn: true,
                    });
                    this.setState({
                        sidebarVisible: false,
                    });
                } else {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("username");
                    this.setState({
                        username: "",
                        message: json.message,
                        loggedIn: false,
                    });
                }
            });
    };

    logOut = () => {
        this.setState({
            loggedIn: false,
            sidebarVisible: false,
        });
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
    };

    startEdit = (content, type) => {
        if (localStorage.getItem("jwt") !== "") {
            this.setState({
                editing: content,
                editingType: type,
                creatingType: "",
                sidebarVisible: true,
            });
        } else {
            alert("Please log in to edit");
        }
    };

    startNew = (type) => {
        if (localStorage.getItem("jwt") !== "") {
            this.setState({
                editing: {},
                editingType: "",
                creating: {
                    content: {
                        user_id: this.state.currentUser.id,
                    },
                },
                creatingType: type,
                sidebarVisible: true,
            });
        } else {
            alert(`Please log in to add ${this.state.creatingType}`);
        }
    };

    handleSubmit = (content) => {
        fetch(`${apiURL + this.state.editingType}/${content.id}`, {
            method: "PATCH",
            headers: HEADERS_AUTH,
            body: JSON.stringify({
                ...content,
            }),
        })
            .then((res) => res.json())
            .catch((error) => {
                throw Error(error);
            })
            .then((json) => {
                const editingTypeCopy = this.state.editingType;
                switch (editingTypeCopy) {
                    case "users": {
                        this.setState({
                            users: [json],
                            currentUser: json,
                        });
                        break;
                    }
                    case "skills": {
                        const skillsCopy = this.state.skills.map((skill) => {
                            return skill.id === content.id ? content : skill;
                        });
                        this.setState({
                            skills: skillsCopy,
                        });
                        break;
                    }
                    case "jobs": {
                        const jobsCopy = this.state.jobs.map((job) => {
                            return job.id === content.id ? content : job;
                        });
                        this.setState({
                            jobs: jobsCopy,
                        });
                        break;
                    }
                    case "githubs": {
                        const githubsCopy = this.state.githubs.map((github) => {
                            return github.id === content.id ? content : github;
                        });
                        this.setState({
                            githubs: githubsCopy,
                        });
                        break;
                    }
                    default:
                        return null;
                }
                this.setState({
                    sidebarVisible: false,
                    editingType: "",
                });
                return null;
            });
    };

    shiftOrder = (incomingGroup, item, next) => {
        const group = this.state[incomingGroup].sort(
            (a, b) => a.order_id - b.order_id
        );
        const orderIds = group.map((s) => s.order_id);
        const curIndex = orderIds.indexOf(item.order_id);
        const maxPos = orderIds.length - 1;
        const move = next ? 1 : -1; // if next is true, shift up; else shift down

        if (curIndex === maxPos && next) {
            const t = orderIds[maxPos];
            orderIds[maxPos] = orderIds[0];
            orderIds[0] = t;
        } else if (curIndex === 0 && !next) {
            const t = orderIds[0];
            orderIds[0] = orderIds[maxPos];
            orderIds[maxPos] = t;
        } else {
            const t = orderIds[curIndex];
            orderIds[curIndex] = orderIds[curIndex + move];
            orderIds[curIndex + move] = t;
        }

        group.forEach((groupItem, index) => {
            if (groupItem.order_id !== orderIds[index]) {
                groupItem.order_id = orderIds[index];
                fetch(`${apiURL}/${incomingGroup}/${groupItem.id}`, {
                    method: "PATCH",
                    headers: HEADERS_AUTH,
                    body: JSON.stringify({
                        ...groupItem,
                    }),
                }).then((res) => res.json());
            }
        });
        this.setState({
            [group]: group,
        });
    };

    handleCreate = (content) => {
        content.order_id = this.state[this.state.creatingType].length;
        fetch(apiURL + this.state.creatingType, {
            method: "POST",
            headers: HEADERS_AUTH,
            body: JSON.stringify({
                ...content,
                user_id: this.state.currentUser.id,
            }),
        })
            .then((res) => res.json())
            .catch((error) => {
                throw Error(error);
            })
            .then((json) => {
                const creatingTypeCopy = this.state.creatingType;
                this.setState({
                    [creatingTypeCopy]: [...this.state[creatingTypeCopy], json],
                    creatingType: "",
                    sidebarVisible: false,
                });
            });
    };

    handleDelete = (content) => {
        fetch(`${apiURL + this.state.editingType}/${content.id}`, {
            method: "DELETE",
            headers: HEADERS_AUTH,
        })
            .then((res) => res.json())
            .then((json) => {
                const copy = this.state[this.state.editingType];
                copy.splice(
                    copy.findIndex((el) => el.id === json.id),
                    1
                );
                this.setState({
                    [this.state.editingType]: copy,
                    editingType: "",
                    sidebarVisible: false,
                });
            });
    };

    render() {
        return (
            <Sidebar.Pushable as={Segment} className="fix-sidebar">
                <Sticky>
                    <Sidebar
                        animation="overlay"
                        as={Menu}
                        direction="right"
                        icon="labeled"
                        inverted
                        vertical
                        visible={this.state.sidebarVisible}
                        width="wide"
                    >
                        <Menu.Item as="a" onClick={this.toggleSidebar}>
                            <Icon name="bars" size="mini" />
                            Close
                        </Menu.Item>

                        <Menu.Item as="a">
                            {this.state.loggedIn &&
                            localStorage.getItem("jwt") ? (
                                <LoggedIn
                                    username={this.state.username}
                                    logOut={this.logOut}
                                />
                            ) : (
                                <Login
                                    login={this.login}
                                    message={this.state.message}
                                />
                            )}
                        </Menu.Item>

                        {this.state.editingType === "" &&
                        this.state.creatingType === "" ? (
                            this.state.isMobile && (
                                <NavLinks
                                    isMobile={this.state.isMobile}
                                    toggleSidebar={this.toggleSidebar}
                                />
                            )
                        ) : (
                            <Menu.Item>
                                <Editor
                                    creating={this.state.creating}
                                    creatingType={this.state.creatingType}
                                    editing={this.state.editing}
                                    editorDisabled={this.state.editorDisabled}
                                    editingType={this.state.editingType}
                                    handleCreate={this.handleCreate}
                                    handleDelete={this.handleDelete}
                                    handleSubmit={this.handleSubmit}
                                    shiftOrder={this.shiftOrder}
                                    startEdit={this.startEdit}
                                />
                            </Menu.Item>
                        )}
                    </Sidebar>
                </Sticky>
                <Sidebar.Pusher dimmed={false}>
                    <Segment
                        basic
                        className={this.state.currentUser.color_theme}
                    >
                        <Content
                            toggleSidebar={this.toggleSidebar}
                            startEdit={this.startEdit}
                            shiftOrder={this.shiftOrder}
                            startNew={this.startNew}
                            jobs={this.state.jobs}
                            githubs={this.state.githubs}
                            interests={this.state.interests}
                            skills={this.state.skills}
                            honors={this.state.honors}
                            links={this.state.links}
                            users={this.state.users}
                            currentUser={this.state.currentUser}
                            editing={this.state.editing}
                            loggedIn={this.state.loggedIn}
                            isMobile={this.state.isMobile}
                        />
                        <Confirm
                            cancelButton={<Button> Go Back </Button>}
                            confirmButton={<Button negative> Delete </Button>}
                            onCancel={(_) =>
                                this.setState({
                                    confirmOpen: false,
                                })
                            }
                            onConfirm={(_) =>
                                this.confirmDelete(this.state.contentToDelete)
                            }
                            open={this.state.confirmOpen}
                            size="mini"
                        />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default App;
