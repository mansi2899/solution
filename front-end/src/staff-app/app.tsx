import React from "react"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "staff-app/platform/activity.page"
import { SortStudentContext } from "./daily-care/sortStudentContext"
import { useContext ,useState} from "react"



function App() {
  const [studentDetailsC, setStudentDetailsC] = useState([]);
  

  // const value = {studentDetailsC, setStudentDetailsC}
  const setStudentValue = (value: any) =>{
    setStudentDetailsC(value)
  } 


  return (
    <>
    <SortStudentContext.Provider value={{studentDetailsC, setStudentValue} as any}>
      
      <Header />
      <Routes>
        
        <Route path="daily-care" element={<HomeBoardPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="*" element={<div>No Match</div>} />
      </Routes>

      </SortStudentContext.Provider>
    </>
  )
}

export default App
