import React from 'react'
import {Stack, Box, Card, Text, Flex, Grid, Spinner, Label, Switch} from '@sanity/ui'
import QueryContainer from 'part:@sanity/base/query-container'

import client from 'part:@sanity/base/client'

export default function CommentList({ approvalStatus }) {

    const query = `*[_type == "comment" && ${(approvalStatus == undefined) ? `!defined(approved)` : `approved == ${approvalStatus}`}]`
    const projection = `{
        ...,
        post->{
            title
        }
     }[0...5]`

    function updateApproval(documentId, newStatus) {
        return client.patch(documentId)
                .set({"approved": newStatus})
                .commit()
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
    }

    async function handleToggle(id, approved) {
        return await updateApproval(id, !approved)
    }
    

    

    return(
<QueryContainer query={`${query}${projection}`}>
    {({result, loading, error, onRetry}) => {
      if (error) {        
        return console.log('There has been an error', error.message)
      }

      if (loading) {
        return (
          <div>
            <Flex align="center" justify="center">
                <Spinner muted />
            </Flex>
          </div>
        )
      }

      if (!result) {
        return null
      }
 
      const documents = result?.documents
      return (
        <Stack as={'ul'}>
        {documents.map(doc => (
          <Card radius={2} key={doc._id} borderBottom as={'li'} padding={4}>
            <Grid columns={5} justify={'space-between'} align={'center'}>
              <Box column={4}>
                <Stack flex={1} space={3}>
                  <Text size={2}>{doc.comment}</Text>
                  <Text muted size={1}>By: {doc.name} - Post: {doc.post?.title}</Text> 
                </Stack>
              </Box>
              <Flex justify={'center'} align={'center'}>
                <Stack space={3}>
                  <Label>Approved?</Label>
                  <Switch 
                    name={doc._id}
                    onChange={() => handleToggle(doc._id, doc.approved)}
                    checked={doc.approved} 
                    indeterminate={(doc.approved === undefined) ? true : false} 
                  />
                </Stack>
              </Flex>
            </Grid>
          </Card>
        ))}
      </Stack>
      )
    }}
  </QueryContainer>
    )
  }
  