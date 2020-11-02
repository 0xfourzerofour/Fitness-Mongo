import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import {
  Calendar as Cal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'


export default class SessionAppend extends Component {
  render() {
    return (
      <div>
            <Table>

<TableBody>
 <TableRow>
     <TableCell scope="row">
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
          
        
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
       
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
  
         />
       </InputGroup>
     </TableCell>
     <TableCell>
       <InputGroup size="sm">
         <FormControl
           aria-label="Small"
           aria-describedby="inputGroup-sizing-sm"
    
         />
       </InputGroup>
     </TableCell>
   </TableRow>
   <TableRow>
     <TableCell scope="row">
       <Button variant="primary">
         Add to workout
       </Button>
     </TableCell>
   </TableRow>
   </TableBody>
   </Table>

        
      </div>
    )
  }
}
