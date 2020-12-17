import React, { useState } from 'react'
import {
  Grid,
  Card,
  Text,
  Stack,
  TabList,
  TabPanel,
  Tab,
  Heading,
  TextInput
} from '@sanity/ui'
import {PatchEvent, set} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import { TwitterTweetEmbed } from 'react-twitter-embed';


const StringButton = React.forwardRef((props, ref) => {
  const {value, type, onChange } = props
  const [id, setId] = useState('link')
  const [tweetId, setTweetId] = useState(value)
  return(
    <FormField label={type.title} description={type.description}>

        <TabList space={1}>
          <Tab
            aria-controls="link-panel"
            id="link-tab"
            label="Tweet Link"
            onClick={() => setId('link')}
            selected={id === 'link'}
            space={2}
          />
          <Tab
            aria-controls="preview-panel"
            id="preview-tab"
            label="Preview Tweet"
            onClick={() => setId('preview')}
            selected={id === 'preview'}
            space={2}
          />
        </TabList>

        <TabPanel
          aria-labelledby="link-tab"
          hidden={id !== 'link'}
          id="link-panel"
        >
          <Card marginTop={2} padding={4}>
            <Stack space={4}>
              <Heading>Content</Heading>
              {value}
              <FormField label={type.title} description={type.description}>
                <TextInput
                  type="text"
                  ref={ref}
                  placeholder={type.placeholder}
                  value={props.value}
                  onChange={event => {
                      onChange(PatchEvent.from(set(event.target.value)))
                      setTweetId(event.target.value)
                    }
                  }
                />  
              </FormField>
            </Stack>
          </Card>
        </TabPanel>

        <TabPanel
          aria-labelledby="preview-tab"
          hidden={id !== 'preview'}
          id="preview-panel"
        >
          <Card marginTop={2} padding={4}>
            <Heading>Twitter Preview</Heading>
            <TwitterTweetEmbed tweetId={value} />

          </Card>
        </TabPanel>               
    </FormField>

    
  )

})



export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'test',
      title: 'Testing input',
      type: 'string',
      inputComponent: StringButton
    }
  ]
}
