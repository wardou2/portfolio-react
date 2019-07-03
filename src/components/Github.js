import React from 'react'
import {Card, Image, Button, Divider, List} from 'semantic-ui-react'


// const fancyName = (url) => {
//   let lastIndex = url.lastIndexOf('/')
//   let name = url.slice(lastIndex+1)
//   return name.split('-').map( word => word[0].toUpperCase() + word.slice(1)).join(" ")
//   }

const displayLinks = (github) => {
  if (github.repo_url_back && github.demo_url) {
    return <div style={{textAlign: 'center'}}><a href={github.repo_url_front} target="_blank">Front End Repo</a> | <a href={github.repo_url_back} target="_blank">Back End Repo</a> | <a href={github.demo_url} target="_blank">Demo</a></div>
  } else if (github.repo_url_back) {
    return <div style={{textAlign: 'center'}}><a href={github.repo_url_front} target="_blank">Front End Repo</a> | <a href={github.repo_url_back} target="_blank">Back End Repo</a></div>
  } else if (github.demo_url) {
    return <div style={{textAlign: 'center'}}><a href={github.repo_url_front} target="_blank">Github Repo</a> | <a href={github.demo_url} target="_blank">Demo</a></div>
  } else {
    return <div style={{textAlign: 'center'}}><a href={github.repo_url_front} target="_blank">Github Repo</a></div>
  }
}

const Github = (props) => {
  let github = props.github
  return (
  <Card raised className="corner-sharp" textAlign='left'>
    <Card.Content
        target="_blank" className="card-height">

        <Card.Header style={{marginBottom: '10px'}} size="medium" textAlign="center">{github.name}</Card.Header>
        <Image size="medium" style={{display: 'block', margin: 'auto', marginBottom: '10px'}} rounded
        src={github.img_url}
        />
        <Card.Meta>
          <div>{displayLinks(github)}</div>
        </Card.Meta>
        <Divider />
        <Card.Meta>         {github.summary}        </Card.Meta>
        <Divider />
        <Card.Description> <List relaxed bulleted>
          {github.contribution.map(con => {
            return <List.Item>{con}</List.Item>
          })}
          </List>
        </Card.Description>

    </Card.Content>
      {props.loggedIn
        ? <Card.Content>
          <Button type="button" onClick={_ => props.shiftOrder('githubs', github, false)} icon="left arrow"/>
          <Button type="button" onClick={_ => props.shiftOrder('githubs', github, true)} icon="right arrow"/>
          <Button floated='right' size="small" onClick={_ => props.startEdit(github, 'githubs')} icon="edit"/>
        </Card.Content>
        : null
      }
  </Card>
  )
}

export default Github
