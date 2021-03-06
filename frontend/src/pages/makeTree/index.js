import React, { useContext } from 'react'
import api from '../../services/api'
import { toastInfo } from "../../components/toast";
import { mountRobotFile } from '../../services/mountRobotFile'
import { JsonContext } from '../../context'
import { Container, Header, Wrapper, WrapperBody } from './styles'
import { GitBranch, GitMerge } from 'react-feather'

import NavDefault from '../../components/navDefault'
import FooterDefault from '../../components/footerDefault'
import Description from '../../components/description'
import ActionTree from '../../components/makeTreeAction'
import Node from '../../components/node'

const MakeTree = () => {
  const { tree, nodes } = useContext(JsonContext)

  const redirect = async () => {
    const response = await api.post('depthFirstSearch', tree)
    mountRobotFile({
      testSequences: response.data?.test_sequences,
      filename: 'teasy_generator_tests.tests.robot',
    })
    toastInfo("Your test file has been generated.")
  }

  return (
    <Container>
      <NavDefault />
      <WrapperBody>
        <Description
          icon={<GitBranch />}
          title={'INSERT A NEW PAGE MAKING A RELATIONSHIP WITH ACTIONS'}
        />
        <Wrapper>
          <Header>
            <GitMerge />
            <div>
              <h3>{tree.root.name}</h3>
              <small>Define the children of the routes to be applied</small>
            </div>
          </Header>
          {tree.root.actions?.map((action, i) => (
            <ActionTree
              key={i}
              treePath={[]}
              keyword={action.keyword}
              isRoot={true}
              actualNode={tree.root}
            />
          ))}
          {nodes.map((node, i) => (
            <Node page={node.page} key={i} treePath={node.treePath} />
          ))}
        </Wrapper>
      </WrapperBody>
      <FooterDefault title={'GENERATE'} action={redirect} />
    </Container>
  )
}

export default MakeTree
