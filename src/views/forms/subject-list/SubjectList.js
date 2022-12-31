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
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const SubjectList = () => {
  const [timkiem, setTimkiem] = useState('')
  const [mamonhoc, setMamonhoc] = useState('')
  const [tenmonhoc, setTenmonhoc] = useState('')
  const [loaimonhoc, setLoaimonhoc] = useState('')
  const [sotiet, setSotiet] = useState('')
  const [danhsach, setDanhsach] = useState(undefined)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [alert, setAlert] = useState(false)
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/danhsachmonhoc')
      .then((res) => {
        console.log(res.data)
        setDanhsach(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const handleMamonhoc = (e) => {
    setMamonhoc(e.target.value)
    // console.log(mamonhoc)
  }

  const handletenmonhoc = (e) => {
    setTenmonhoc(e.target.value)
    // console.log(tenmonhoc)
  }

  const handleloaimonhoc = (e) => {
    setLoaimonhoc(e.target.value)
    // console.log(loaimonhoc)
  }

  const handlesotiet = (e) => {
    setSotiet(e.target.value)
    // console.log(sotiet)
  }

  const handleSubmit = (e) => {
    // console.log(mamonhoc, tenmonhoc, loaimonhoc, sotiet)
    const data = {
      mamonhoc: mamonhoc,
      tenmonhoc: tenmonhoc,
      loaimonhoc: loaimonhoc,
      sotiet: sotiet,
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }
    axios
      .post('http://localhost:8080/api/danhsachmonhoc', data, config)
      .then((res) => {
        console.log(res.data)
        setDanhsach((prev) => [...prev, res.data])
        setMessage('Tạo thành công môn học')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        axios
          .get('http://localhost:8080/api/danhsachmonhoc')
          .then((res) => {
            console.log(res.data)
            setDanhsach(res.data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
      .catch((err) => {
        console.log(err.message)
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleDelete = (index, e) => {
    const data = e.target.parentNode.parentNode.getAttribute('dataId')
    // console.log(e.target.parentNode.parentNode.getAttribute('dataId'))
    axios
      .delete(`http://localhost:8080/api/danhsachmonhoc/${data}`)
      .then((res) => {
        // console.log(res.message)
        setDanhsach(danhsach.filter((v, i) => i !== index))
        setMessage(`Xóa thành công môn học có Mã môn là ${data}`)
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleUpdate = (e) => {
    // console.log(mamonhoc, tenmonhoc, loaimonhoc, sotiet)
    const data = {
      tenmonhoc: tenmonhoc,
      loaimonhoc: loaimonhoc,
      sotiet: sotiet,
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }
    axios
      .put(`http://localhost:8080/api/danhsachmonhoc/${mamonhoc}`, data, config)
      .then((res) => {
        console.log(res.data)
        setMessage('Cập nhật công môn học')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        axios
          .get('http://localhost:8080/api/danhsachmonhoc')
          .then((res) => {
            console.log(res.data)
            setDanhsach(res.data)
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
      .catch((err) => {
        console.log(err.message)
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleDisplay = () => {
    axios
      .get('http://localhost:8080/api/danhsachmonhoc')
      .then((res) => {
        console.log(res.data)
        setDanhsach(res.data)
      })
      .catch((err) => {
        console.log(err.message)
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/danhsachmonhoc/${timkiem}`)
      .then((res) => {
        console.log(res.data)
        setDanhsach((prev) => [res.data])
        setMessage('Tìm kiếm thành công môn học')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tìm kiếm môn học</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormInput
                    placeholder="Nhập mã môn học"
                    aria-label="Full name"
                    onChange={(e) => {
                      setTimkiem(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleSearch}>Tìm kiếm</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            {alert && (
              <CAlert className="fixed-bottom text-center" color={status}>
                {message}
              </CAlert>
            )}
            <CCardHeader>
              <strong>Nhập danh sách môn học</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Mã môn học:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập mã môn học"
                    aria-label="Full name"
                    onChange={handleMamonhoc}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Tên môn học</CFormLabel>
                  <CFormInput
                    placeholder="Nhập tên môn học"
                    aria-label="Date of birth"
                    onChange={handletenmonhoc}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputState">Loại môn</CFormLabel>
                  <CFormSelect id="inputState" onChange={handleloaimonhoc}>
                    <option>Chọn</option>
                    <option>Lý thuyết (LT)</option>
                    <option>Thực hành (TH)</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputAddress2">Số tiết</CFormLabel>
                  <CFormInput id="inputAddress2" placeholder="2" onChange={handlesotiet} />
                </CCol>
                <CCol xs={4}></CCol>
                <CCol xs={3}>
                  <CButton onClick={handleSubmit}>Tạo môn học mới</CButton>
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleUpdate}>Cập nhật môn học</CButton>
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleDisplay}>Tất cả các môn</CButton>
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
                    <CTableHeaderCell scope="col">Mã môn học</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên môn học</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Loại môn</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số tiết</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {danhsach &&
                    danhsach.map((el, index) => (
                      <CTableRow key={index} dataId={el.mamonhoc}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{el.mamonhoc}</CTableDataCell>
                        <CTableDataCell>{el.tenmonhoc}</CTableDataCell>
                        <CTableDataCell>{el.loaimonhoc}</CTableDataCell>
                        <CTableDataCell>{el.sotiet}</CTableDataCell>
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

export default SubjectList
