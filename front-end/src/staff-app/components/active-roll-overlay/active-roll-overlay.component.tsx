import React from "react"
import {  useContext,useState } from "react";
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors";

export type ActiveRollAction = "filter" | "exit"
interface Props {
  isActive: boolean
  attendanceDetails: any
  onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick, attendanceDetails } = props
  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    fontWeight: FontWeight.strong,
    color: "#fff",
    padding: "18px 20px 17px",
  
  })
  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: attendanceDetails.all },
              { type: "present", count: attendanceDetails.present },
              { type: "late", count: attendanceDetails.late },
              { type: "absent", count: attendanceDetails.absent },
            ]}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <NavLink  to="../activity"  style={activeStyle}> 
              <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("exit")}>
              Complete
              </Button>       
            </NavLink>
            
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
  
}
