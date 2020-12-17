import React from 'react'

import { Container, Card, Grid, Heading, Stack, Box, Flex,Text, Label, Switch } from '@sanity/ui'
import styles from './MyTool.css'


function CommentCard(props) {
  const { title, description, approvalStatus, fullWidth } = props
  return (
    <Card column={fullWidth ? 'full' : ''} margin={3}>
      <Card marginBottom={1} paddingX={4} paddingTop={4} borderBottom={1} paddingBottom={0}>
          <Heading size={3} as={"h2"}>{title}</Heading>
          <p>{description}</p>
        </Card>
        <Stack as={'ul'}>
          <Card radius={2} borderBottom as={'li'} padding={4}>
            <Grid columns={5} justify={'space-between'} align={'center'}>
              <Box column={4}>
                <Stack flex={1} space={3}>
                  <Text size={2}>This is a super amazing comment, please approve it</Text>
                  <Text muted size={1}>By: Sanity - A post to be named later</Text> 
                </Stack>
              </Box>
              <Flex justify={'center'} align={'center'}>
                <Stack space={3}>
                  <Label>Approved?</Label>
                  <Switch 
                    checked={approvalStatus} 
                    indeterminate={(approvalStatus === undefined) ? true : false} 
                  />
                </Stack>
              </Flex>
            </Grid>
          </Card>
        </Stack>
      </Card>
  )
}


export default function MyTool() {
  // Where our UI will render
  return (
    <Container width={3}> 
      <Card margin={3} padding={5} className={styles.container}>
        <Heading marginBottom={1} size={5} as={"h1"}>Comment Moderation Dashboard</Heading>
        <p>Moderate your comments here. Each box shows the latest 5 from each group.</p>
      </Card>

      <Grid columns={2}>
        <CommentCard fullWidth title="To Be Moderated" description="Moderate these please" approvalStatus={undefined} />
        <CommentCard title="Approved" description="These are the good ones" approvalStatus={true} />
        <CommentCard title="Unapproved" description="These are the bad ones" approvalStatus={false} />  

      </Grid>

    </Container>
  )
}