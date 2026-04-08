import React from "react"
import styled from "styled-components"


const PreviewRow = styled.div`
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 30px;
`

export default ({ children }) => (
  <PreviewRow>
    {children}
  </PreviewRow>
)
