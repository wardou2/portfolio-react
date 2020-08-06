import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavLinks = (props) => {
    return (
        <Menu borderless secondary stackable>
            <Menu.Item>
                <Link className="item font-heading" to="/#about">
                    ABOUT ME
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="item font-heading" to="/#skills">
                    SKILLS
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="item font-heading" to="/#jobs">
                    JOBS
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="item font-heading" to="/#github">
                    GITHUB
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link className="item font-heading" to="/#contact">
                    CONTACT
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default NavLinks;
