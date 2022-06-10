import type { FC } from 'react'
import { useDereference } from './useDereference'

export const App: FC = () => {
  const dereferencedDocument = useDereference(document)

  return (
    <div>
      {dereferencedDocument}
    </div>
  )
}

const document = `
openapi: '3.0.1'
info:
  title: Address API
  version: '1.0.0'
  contact: { }
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0
servers:
  - url: https://test-gateway-{environment}.apps.cloud
    variables:
      environment:
        default: test
        description:  internal instance
        enum:
          - rwar-1
          - rwar-1-ci-dev
          - rwar-1-ci-poc
tags:
  - name: Address API
paths:
  /api/v1/testAddress/address:
    $ref: './external/external-path-1.yaml#/~1api~1v1~1testAddress~1address'
`
