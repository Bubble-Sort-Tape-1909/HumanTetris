import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Grid, Image} from 'semantic-ui-react'
class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{height: '50vh'}}
          verticalAlign="middle"
        >
          <Grid.Row style={{maxWidth: 600}}>
            <Grid.Column width={3}>
              <Image
                size="small"
                src="https://react.semantic-ui.com/images/wireframe/image.png"
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Image src="https://react.semantic-ui.com/images/wireframe/centered-paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button as={Link} to="/profile/edit">
          Edit Profile
        </Button>
      </div>
    )
  }
}
export default ProfilePage
