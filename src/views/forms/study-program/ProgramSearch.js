import React, { useState, useEffect, useCallback } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableBody,
} from '@coreui/react'

const ProgramSearch = () => {
  const [major, setMajor] = useState(null)
  const [department, setDepartment] = useState(null)

  const handleMajor = (e) => {
    setMajor(e.target.value)
  }

  const handleDepartment = (e) => {
    setDepartment(e.target.value)
  }

  const handleSubmit = () => {
    // console.log(major, department)
  }

  const study = [
    {
      semester: 'Học kỳ 1',
      subject: 'Công nghệ phần mềm',
      note: 'asdfasdasdfasdff',
    },
    {
      semester: 'Học kỳ 1',
      subject: 'Công nghệ phần mềm',
      note: 'fffasdfasdfasf',
    },
  ]
  const [studyProgram, setStudyProgram] = useState(study)
  const handleDelete = (index, e) => {
    setStudyProgram(studyProgram.filter((v, i) => i !== index))
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Chọn thông tin tra cứu</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Ngành học:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập ngành học"
                    aria-label="majors"
                    onChange={handleMajor}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Khoa:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập khoa"
                    aria-label="department"
                    onChange={handleDepartment}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSubmit}>Tra cứu</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader className="text-center">
              <strong>Chương trình học</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Học kỳ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Môn học </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ghi chú</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {studyProgram &&
                    studyProgram.map((el, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{el.semester}</CTableDataCell>
                        <CTableDataCell>{el.subject}</CTableDataCell>
                        <CTableDataCell>{el.note}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={(e) => {
                              handleDelete(index, e)
                            }}
                          >
                            Xóa
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default ProgramSearch
