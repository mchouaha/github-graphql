
import Head from 'next/head'
import React, { Fragment, FunctionComponent } from 'react'
import CustomTable from '../components/CustomTable'
import AquaClient from './api/aquaClient'
import { REPOSITORIES } from './api/graphql/queries/repositories'
import Image from 'next/image'
import { Repository, User } from '../interfaces'
import { GITHUB } from '../public/environment'
import styled from 'styled-components'
import CustomSearch from '../components/CustomSearch'
import { useState } from 'react'

type PageProps = {
   data: User
}

const IndexPage: FunctionComponent<PageProps> = ({data}) => {

  const [repositories, setRepositories] = useState<Repository[]>(data.repositories.nodes)

  const handleSearch = (searchTerm: string) => {

    if (searchTerm.length) {  
      const listRepo = repositories.filter((repository) => { 
          return repository.name.toLowerCase().includes(searchTerm.toLowerCase())
      })

      setRepositories(listRepo)
      
    } else {
      setRepositories(data.repositories.nodes)
    }       
}

  return (
    <Fragment>

      <UserInfo>
        <span>{GITHUB.username}</span>
        <Thumbnail>
          <Image
              alt="avatar"
              src={data.avatarUrl} 
              layout="fixed"
              priority={true}
              width={50}
              height={50}/>
        </Thumbnail>
      </UserInfo>

      <CustomSearch onChange={handleSearch}/>
      
      <br/>

      <CustomTable data={repositories}/>

    </Fragment>
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0px;
  
  span {
    font-size: 18px;
    font-weight: bold;
    margin: auto 5px;
  }
`

const Thumbnail = styled.div`
  border-radius: 50%;
  overflow: hidden;
`

export async function getStaticProps() {
 
  const aquaClient = new AquaClient()
  
  const slotsRequest =  await aquaClient.query({ 
    query: REPOSITORIES
  })

  return {
    props: {
      data: slotsRequest.data.data.user
    }
  }
}

export default IndexPage
