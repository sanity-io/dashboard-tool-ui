import React from 'react'

import { Container, Card, Grid, Heading } from '@sanity/ui'
import styles from './CommentTool.css'
import CommentCard from './CommentCard'


export default function CommentTool() {

  return (
    
    <Container width={3}>
      <Card margin={3} padding={5}>
        <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
        <p>Moderate your comments here. Each box shows the latest 5 from each group.</p>
      </Card>

      <Grid autoCols={"auto"} columns={[1, 1, 1, 2]}>
        <CommentCard fullWidth={true} title="To Be Moderated" description="Moderate these please" approvalStatus={undefined} />
        <CommentCard title="Approved" description="These are the good ones" approvalStatus={true} />
        <CommentCard title="Unapproved" description="These are the bad ones" approvalStatus={false} />  
      </Grid>

    </Container>
  )
}