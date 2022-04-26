import { Container, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react'

export default function SectionText(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { title, data } = props

  const head = data.rows[0].cells ?? null
  const body = data.rows.length > 1 ? data.rows.slice(1) : null

  return (
    <Container maxW={['lg', null, '3xl', null]} my="10" overflowX="scroll" centerContent>
      <Table>
        {title && <TableCaption>{title}</TableCaption>}

        {head && (
          <Thead fontWeight="bold">
            <Tr>
              {head.map((cell, index) => (
                <Th key={index}>{cell}</Th>
              ))}
            </Tr>
          </Thead>
        )}
        <Tbody>
          {body.length > 1 &&
            body.map((row) => (
              <Tr key={row._key}>
                {row.cells.map((cell, index) => (
                  <Td key={index}>{cell}</Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Container>
  )
}
