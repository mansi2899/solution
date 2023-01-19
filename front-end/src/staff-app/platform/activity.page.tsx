import React from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"

import { Colors } from "shared/styles/colors"

import { useContext ,useState} from "react"
import { SortStudentContext } from "staff-app/daily-care/sortStudentContext"
import { Person } from "shared/models/person"
import { ActivityListTile } from "./activity-list-tile.component"
import { ToolbarProps } from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

export const ActivityPage: React.FC = () => {

  const {studentDetailsC,setStudentDetailsC} = useContext<any>(SortStudentContext)
console.log(studentDetailsC)
  return (<S.Container>
      {/* Activity Page: {JSON.stringify(studentDetailsC)}  */}
      <Toolbar />
      {studentDetailsC && studentDetailsC.map((s:Person) => (
              

               <ActivityListTile key={s.id} isRollMode={false} student={s} totalstudent={studentDetailsC.length} status={s.status}  />
            ))
            
            }

     </S.Container>)
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const  [sortType,setSorted] = useState('asc');
  const  [searchvalue,setSearchvalue] = useState('');
  


  return (
    <S.ToolbarContainer>
      <div><S.Button >
         Name
      </S.Button></div>
     
      <div>
        Roll
        <Button1 color="#13943b"></Button1>
        <Button1  color="#9b9b9b"></Button1>
        <Button1  color="#f5a623"></Button1>
      </div>
    </S.ToolbarContainer>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};

    FontAwesomeIcon: 
  color: #000;
  font-weight: ${FontWeight.strong};
  `,
  Button: styled(Button)`
    && {
      color: #fff;
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
const Button1 = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props:any) => props.color ? props.color : "white"};
  color: ${(props:any) => props.color ? "white" : "black"};
  cursor: pointer;
  font-size: 1em;
  margin-left: 10px;
  margin-top: 10px;
  height:25px;
  weight:4px;
  padding: 0.25em 1em;
  border: 1px solid white;
  border-radius:50%;
`;
