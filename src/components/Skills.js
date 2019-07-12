import React from 'react'
import { Grid, Popup, Image, Button } from 'semantic-ui-react'

import Skill from './Skill'
import SectionHeading from './SectionHeading'

class Skills extends React.Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false
    }
  }

  render() {
    if (!this.props.skills) {
      return <span className="font-heading font-size-large">Loading...</span>
    } else {
      let skills = this.props.skills.sort( (a,b) => a.order_id - b.order_id )
      return (
      <div>
        <SectionHeading text="Primary Skillsets"
          editing={this.props.editing}
          loggedIn={this.props.loggedIn}
          sectionEdit={false}
          sectionNew={true}
          startEdit={_ => this.props.startEdit(skills, 'skills')}
          startNew={_ => this.props.startNew('skills')}
          user={this.props.user}
        />

        <Grid columns={16} stackable centered>
          <Grid.Column />
          <Grid columns={'equal'} textAlign="center" stackable centered>
            {skills.map( (skill, index) => {
              return(
                <Skill skill={skill}
                  index={index}
                  key={skill.name+index}
                  loggedIn={this.props.loggedIn}
                  startEdit={this.props.startEdit}
                />)
            })}
          </Grid>
          <Grid.Column />
        </Grid>
        <br />
      </div>
      )
    }
  }
}


export default Skills
