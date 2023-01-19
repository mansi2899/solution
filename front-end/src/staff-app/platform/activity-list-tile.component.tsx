import React from "react"
import {  createContext,useState } from "react";
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Images } from "assets/images"
import { Colors } from "shared/styles/colors"
import { Person, PersonHelper } from "shared/models/person"
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"

interface Props {
  isRollMode?: boolean
  student: Person
  totalstudent :number
  status?: string
}


const ActivityListTile: React.FC<Props> = ({ isRollMode, student, totalstudent, status }) => {
  // const [allstudent, setallstudent] = useState(0);

//   const [RoleArray , setRollArray] = useState([
//     { type: "all", count: 0 },
//     { type: "present", count: 0 },
//     { type: "late", count: 0 },
//     { type: "absent", count: 0 },
//   ]);
//   const ChangeRollArray = (e :any) => {
//     setRollArray([
//       { type: "all", count: 1},
//       { type: "present", count: 0 },
//       { type: "late", count: 0 },
//       { type: "absent", count: 0 },
//     ]);
//   };
  
  
  
// // setallstudent(allstudent+1);
// console.log(totalstudent);

// const RoleContextValue = {RoleArray, ChangeRollArray}

 
  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content>
        <div>{PersonHelper.getFullName(student)}</div>
      </S.Content>
     
      <S.Roll>
         <S.Content>
        <div>{(status)?status :"unmark"}</div>
      </S.Content>
      </S.Roll>
      {/* //{isRollMode && (
        // <S.Roll>
        //   <RollStateSwitcher 
        //   onStateChange={(value: any)=>{
        //     if(onAttendanceStatusChange) 
        //       onAttendanceStatusChange({student: student, attendanceStatus: value});

        //     }}
        //    />
        // </S.Roll>
     // )} */}
    </S.Container>
  )
}

export {ActivityListTile}
const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    background-image: url(${({ url }) => url});
    border-top-left-radius: ${BorderRadius.default};
    border-bottom-left-radius: ${BorderRadius.default};
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
}
