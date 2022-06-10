import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useEffect, useState } from 'react'
import { load } from 'js-yaml'

export function useDereference(apiDescriptionDocument: string): string {
  const [schemaValue, setSchemaValue] = useState<string>(apiDescriptionDocument)

  useEffect(
    () => {
      $RefParser.dereference(
        toJsonSchema(apiDescriptionDocument) as JSONSchema,
        (err, newSchema) => {
          if (!err) {
            setSchemaValue(JSON.stringify(newSchema))
          }
        },
      )
    },
    [apiDescriptionDocument],
  )
  return schemaValue
}

function toJsonSchema(value: string): JSONSchema | null {
  let schema: JSONSchema | null
  try {
    schema = load(value) as JSONSchema
  } catch (e) {
    schema = null
  }
  return schema
}
