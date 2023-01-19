import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { SortStudentContext } from "./sortStudentContext"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  const [sort, setSort] = useState(" ");
  const [sortRoll, setSortRoll] = React.useState("")
  const [searchvalue, setSearchvalue] = useState('');

  const [attendanceDetails, setAttendanceDetails] = useState({
    late: 0,
    present: 0,
    absent: 0,
    all: 0,
  });

  const [studentDetails, setStudentDetails] = useState(data?.students);
  useEffect(() => {
    setStudentDetails(data?.students)

  }, [data])


  const { studentDetailsC, setStudentValue } = useContext<any>(SortStudentContext)

  useEffect(() => {
    setStudentValue(studentDetails)
  }, [studentDetails])


  function sortJSON(arr: any, key: any, asc = true) {
    return arr.sort((a: any, b: any) => {
      let x = a[key];
      let y = b[key];
      if (asc) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
      else { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
  }



  useEffect(() => {
    void getStudents()
  }, [getStudents])



  const onToolbarAction = (action: ToolbarAction, value: string) => {
    console.log("Actiopn : ", action, value)
    if (action === "sortroll") {
      if (sortRoll == value) {
        setSortRoll('')

      } else {
        setSortRoll(value)
      }
      const newstudentDetails: Person[] = [];
      let newstudentDetails2: Person[] = [];
      const newstudentDetails3: Person[] = [];
      studentDetails && studentDetails.sort((a, b) => {
        let fa = a.status ? a.status.toLowerCase() : '',
          fb = b.status ? b.status.toLowerCase() : '';

        let retvalue = 0;
        if (fa < fb) {
          retvalue = -1;
        }
        if (fa > fb) {
          retvalue = 1;
        }
        retvalue = 0;
        return retvalue;
      }).map((s) => (newstudentDetails.push(s)))

      // console.log("filter studentDetails" ,studentDetails , sortRoll)
      newstudentDetails.map((s) => {
        if (s.status === value) {
          newstudentDetails2.push(s)
        } else {
          newstudentDetails3.push(s)
        }
      })
      newstudentDetails2 = newstudentDetails2.concat(newstudentDetails3);



      setStudentDetails(newstudentDetails2)
    }
    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "sort" && value === "asc") {
      setSort("asc")
    } else if (action === "sort" && value === "desc") {
      setSort("desc")
    }
    if (action === "search") {
      setSearchvalue(value)
    }



  }
  //  console.log('studentDetails',studentDetails)

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }
  useEffect(() => {
    changeAttendance()
  }, [studentDetails])

  const onAttendanceChange = (details: any) => {
    // debugger
    // attendance[type] = 
    console.log("Student: ", studentDetails, details);
    let studentData: any = JSON.parse(JSON.stringify(studentDetails));
    let studentIndex = -1;
    studentData?.findIndex((student: any, index: number) => {
      if (student.id === details.student.id) {
        studentIndex = index
      }
    })
    console.log("studentIndex: ", studentIndex);

    if (studentIndex !== -1) {
      studentData[studentIndex]["status"] = details.attendanceStatus
    }
    // console.log("studentData: ", studentData);
    setStudentDetails(studentData)
  }

  const changeAttendance = () => {
    // debugger;
    let attendance: any =
    {
      late: 0,
      present: 0,
      absent: 0,
      all: 0,
    };
    studentDetails?.map((student: any) => {
      if (student.status) {
        attendance[student.status] += 1
      }
    })
    attendance["all"] = studentDetails?.length
    setAttendanceDetails(attendance);
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction as any} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && studentDetails && (
          <>

            {(sort == "asc" || sort == "desc") && sortJSON(studentDetails, "first_name", (sort == "asc") ? true : ((sort == "desc") ? false : true)).map((s: Person) => (

              ((s.first_name.toLowerCase().includes(searchvalue.toLowerCase()) || s.last_name.toLowerCase().includes(searchvalue.toLowerCase()))

                && (s.status === sortRoll || sortRoll === '')) ?
                  <StudentListTile key={s.first_name + s.id} isRollMode={isRollMode} student={s} totalstudent={studentDetails.length} onAttendanceStatusChange={(value) => {
                    onAttendanceChange(value);
                  }} />
                : ''
            ))

            }

            {sort != "desc" && sort != "asc" && studentDetails.map((s) => (

              ((s.first_name.toLowerCase().includes(searchvalue.toLowerCase()) || s.last_name.toLowerCase().includes(searchvalue.toLowerCase()))
                && (s.status === sortRoll || sortRoll === '')
              )

                ?
                  <StudentListTile key={s.first_name + s.id} isRollMode={isRollMode} student={s} totalstudent={studentDetails.length} onAttendanceStatusChange={(value) => { onAttendanceChange(value); }} />
                : ''
            ))}

            {studentDetails?.length > 0 ? 
            <> 
            {sortRoll.length > 0 ? <h1>No rolls added!</h1>:null}
            {searchvalue.length > 0 ? <h1>No Records Found!</h1>:null}
          
            </> : null}
           
          </>

        )}
        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} attendanceDetails={attendanceDetails} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" | "search" | "sortroll"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}


const Toolbar: React.FC<ToolbarProps> = (props) => {
  const [sortType, setSorted] = useState('');
  const [sortRoll, setSortRoll] = useState("unmark");
  const [searchvalue, setSearchvalue] = useState('');


  const { onItemClick } = props

  return (
    <S.ToolbarContainer>
      <S.Button onClick={() => {
        onItemClick("sort", (sortType === 'asc') ? 'desc' : 'asc')
        setSorted((sortType === 'asc') ? 'desc' : 'asc');
      }}>
        Name
        {(sortType === 'asc') && (
          <FontAwesomeIcon icon={faAngleUp} />

        )}
        {(sortType === 'desc') && (
          <FontAwesomeIcon icon={faAngleDown} />

        )}

      </S.Button>

      <S.Input type="text" onChange={(e) => { setSearchvalue(e.target.value); onItemClick("search", e.target.value); }} name="text" value={searchvalue} placeholder="search" />
      <div>
        <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
        <Button1 onClick={() => { onItemClick("sortroll", "present"); (sortRoll !== "present") ? setSortRoll("present") : setSortRoll("") }} color="#13943b" border-color={(sortRoll === "present") ? "#fff" : "#13943b"} theme={{ main: (sortRoll === "present") ? "#fff" : "#13943b" }}></Button1>
        <Button1 onClick={() => { onItemClick("sortroll", "absent"); (sortRoll !== "absent") ? setSortRoll("absent") : setSortRoll("") }} color="#9b9b9b" border-color={(sortRoll === "absent") ? "#fff" : "#9b9b9b"} theme={{ main: (sortRoll === "absent") ? "#fff" : "#9b9b9b" }}></Button1>
        <Button1 onClick={() => { onItemClick("sortroll", "late"); (sortRoll !== "late") ? setSortRoll("late") : setSortRoll("") }} color="#f5a623" border-color={(sortRoll === "late") ? "#fff" : "#f5a623"} theme={{ main: (sortRoll === "late") ? "#fff" : "#f5a623" }}></Button1>
      </div>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
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
  `
  ,
  Input: styled.input`
    
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};

    FontAwesomeIcon: 
  color: #fff;
  font-weight: ${FontWeight.strong};
  `
  ,


  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}

const Button1 = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props: any) => props.color ? props.color : "white"};
  color: ${(props: any) => props.color ? "white" : "black"};
  cursor: pointer;
  font-size: 0.8em;
  margin-left: 10px;
  margin-top: 10px;
  height:25px;
  weight:4px;
  padding: 0.25em 1em;
  border: 2px solid  ${props => props.theme.main};
  border-radius:50%;
`;