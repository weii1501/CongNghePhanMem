import React, { useState, useEffect, useCallback } from "react"
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
  CAlert,
} from "@coreui/react"
import axios from "axios"

const OpenSubject = () => {
  const [monhoc, setMonhoc] = useState(null)
  const [hocky, setHocky] = useState(null)
  const [namhoc, setNamhoc] = useState(null)
  const [timkiem, setTimkiem] = useState(null)
  const [danhsach, setDanhsach] = useState(undefined)
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/danhsachmonhocmo")
  //     .then((res) => {
  //       console.log(res.data)
  //       setDanhsach(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err.message)
  //     })
  // }, [])

  const handlehocky = (e) => {
    setHocky(e.target.value)
  }

  const handlenamhoc = (e) => {
    setNamhoc(e.target.value)
  }

  // const handleSubmit = () => {
  //   // // console.log(mssv, hoten, ngaysinh, gioitinh, quequan, doituong, nganhhoc)
  //   // setToggle(!toggle)
  //   const data = {
  //     monhoc: monhoc,
  //     namhoc: namhoc,
  //     hocky: hocky,
  //   }

  //   const config = {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     },
  //   }

  //   axios
  //     .post("http://localhost:8080/api/danhsachmonhocmo", data)
  //     .then((res) => {
  //       // console.log(res.data)
  //       setDanhsach((prev) => [...prev, res.data])
  //       setMessage("Tạo môn học thành công")
  //       setStatus("success")
  //       setAlert(true)
  //       setTimeout(() => {
  //         setAlert(false)
  //       }, 2000)
  //     })
  //     .catch((err) => {
  //       // console.log(err.message)
  //       setMessage(err.message)
  //       setStatus("danger")
  //       setAlert(true)
  //       setTimeout(() => {
  //         setAlert(false)
  //       }, 2000)
  //     })
  // }

  const temp = [
    {
      namhoc: "2022-2023",
      hocky: 1,
      monhoc: "Công nghệ phần mềm",
    },
    {
      namhoc: "2022-2023",
      hocky: 2,
      monhoc: "Mật mã học",
    },
    {
      namhoc: "2022-2023",
      hocky: 2,
      monhoc: "Hệ thống nhúng và mang không dây",
    },
    {
      namhoc: "2022-2023",
      hocky: 2,
      monhoc: "Đồ án chuyên ngành",
    },
  ]

  useEffect(() => {
    setDanhsach(temp)
  }, [])

  const handleDelete = (index, e) => {
    const data = e.target.parentNode.parentNode.getAttribute("dataId")
    // console.log(e.target.parentNode.parentNode.getAttribute("dataId"))
    axios
      .delete(`http://localhost:8080/api/danhsachmonhocmo/${data}`)
      .then((res) => {
        // console.log(res.message)
        setDanhsach(danhsach.filter((v, i) => i !== index))
        setMessage(`Xóa thành công môn học có Stt là ${data}`)
        setStatus("success")
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setStatus("danger")
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {alert && (
              <CAlert className="fixed-bottom text-center" color={status}>
                {message}
              </CAlert>
            )}
            <CCardHeader>
              <strong>Tạo môn học</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={8}>
                  <CFormLabel htmlFor="inputEmail4">Môn học</CFormLabel>
                  <CFormInput
                    placeholder="Nhập môn học"
                    aria-label="namhoc"
                    onChange={(e) => {
                      setMonhoc(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={2}>
                  <CFormLabel htmlFor="inputEmail4">Năm học</CFormLabel>
                  <CFormInput
                    placeholder="Nhập năm học"
                    aria-label="namhoc"
                    onChange={handlenamhoc}
                  />
                </CCol>
                <CCol xs={2}>
                  <CFormLabel htmlFor="inputEmail4">Học kì</CFormLabel>
                  <CFormSelect id="inputState" onChange={handlehocky}>
                    <option>Chọn</option>
                    <option value={1}>Học kỳ 1</option>
                    <option value={2}>Học kỳ 2</option>
                    <option value={3}>Học kỳ hè</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleDelete}>Tra cứu</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader className="text-center">
              <strong>DANH SÁCH MÔN HỌC</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Stt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Năm học</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Học kỳ</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {danhsach &&
                    danhsach.map((el, index) => (
                      <CTableRow key={index} dataId={el.stt}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{el.monhoc}</CTableDataCell>
                        <CTableDataCell>{el.namhoc}</CTableDataCell>
                        <CTableDataCell>{el.hocky}</CTableDataCell>
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

export default OpenSubject
