import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './sections/Layout'
import DashboardSection from './sections/DashboardSection'
import ScheduleSection from './sections/ScheduleSection'
import FacultySection from './sections/FacultySection'
import StudentSection from './sections/StudentSection'
import NoPage from './sections/NoPage'
import ScheduleForm from './forms/schedule/ScheduleForm'
import SeatingArrangementForm from './forms/seating-arrangement/SeatingArrangementForm'
import UtilitySection from './sections/UtilitySection'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardSection />} />
          <Route path="schedule" element={<ScheduleSection />} />
          <Route path="schedule/create" element={<ScheduleForm />} />
          <Route path="faculty" element={<FacultySection />} />

          <Route path="seating-arrangement" element={<StudentSection />} />
          <Route path="seating-arrangement/add" element={<SeatingArrangementForm />} /> 
          <Route path="utility-section" element={<UtilitySection />} /> 

        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
