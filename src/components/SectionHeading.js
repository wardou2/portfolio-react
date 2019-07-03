import React from 'react'
import {Grid, Icon, Button, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const SectionHeading = (props) => {

  return (
    <Grid columns={16}>
      <Grid.Column width={16}>{' '}</Grid.Column>
      <Grid.Column width={16} textAlign="center">
          <Link to="/#nav"><Icon name="triangle up"/></Link>
      </Grid.Column>

      <Grid.Row className={`${props.user.color_theme}-heading`}>
        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
          <Button.Group>
            {(props.sectionEdit && props.loggedIn && localStorage.getItem('jwt') !== '')
              ? <Button icon="edit" onClick={props.startEdit}/>
              : null}
            {(props.sectionNew && props.loggedIn && localStorage.getItem('jwt') !== '')
              ? <Button icon="add circle" onClick={props.startNew}/>
              : null}
          </Button.Group>
        </Grid.Column>

        <Grid.Column width={14} verticalAlign="middle">
          <div>
            <Header size='large'>{props.text}</Header>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Column width={16}>{' '}</Grid.Column>
      <Grid.Column width={16}>{' '}</Grid.Column>

    </Grid>
  )
  }

export default SectionHeading
