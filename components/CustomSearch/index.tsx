import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type PageProps = {
    onChange: Function
}

const CustomSearch: FunctionComponent<PageProps> = ({onChange}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    
    onChange(event.target.value)
  }

  return (
    <Fragment>
        <form>
        <LabelContainer>
          <span>Search By Name:</span>
          <InputContainer 
            type="text" 
            name="search"
            onChange={handleChange} />
        </LabelContainer>
        </form>
    </Fragment>
  )
}

const LabelContainer = styled.label`
  span {
    font-weight: bold;
    font-size: 15px;
    color: #000;
  }
`

const InputContainer = styled.input`
  margin-left: 10px;
`

export default CustomSearch
