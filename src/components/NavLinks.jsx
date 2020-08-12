import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LINK_DETAILS = [
    {
        name: "ABOUT ME",
        link: "/#about",
    },
    {
        name: "SKILLS",
        link: "/#skills",
    },
    {
        name: "JOBS",
        link: "/#jobs",
    },
    {
        name: "GITHUB",
        link: "/#github",
    },
    {
        name: "MUSIC",
        link: "/#music",
    },
    {
        name: "CONTACT",
        link: "/#contact",
    },
];

const getLinks = () =>
    LINK_DETAILS.map((entry) => (
        <Menu.Item key={entry.name}>
            <Link className="item font-heading" to={entry.link}>
                {entry.name}
            </Link>
        </Menu.Item>
    ));
const getLinksMobile = (toggleSidebar) =>
    LINK_DETAILS.map((entry) => (
        <Menu.Item key={entry.name}>
            <Link
                className="item font-heading"
                to={entry.link}
                onClick={toggleSidebar}
            >
                {entry.name}
            </Link>
        </Menu.Item>
    ));

const NavLinks = ({ isMobile, toggleSidebar }) => {
    return isMobile ? (
        <Menu borderless secondary vertical fluid>
            {getLinksMobile(toggleSidebar)}
        </Menu>
    ) : (
        <Menu borderless secondary stackable>
            {getLinks()}
        </Menu>
    );
};

export default NavLinks;
