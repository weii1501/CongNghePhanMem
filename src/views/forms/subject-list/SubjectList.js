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
        setMessage('T???o th??nh c??ng m??n h???c')
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
        setMessage(`X??a th??nh c??ng m??n h???c c?? M?? m??n l?? ${data}`)
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
        setMessage('C???p nh???t c??ng m??n h???c')
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
        setMessage('T??m ki???m th??nh c??ng m??n h???c')
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
              <strong>T??m ki???m m??n h???c</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormInput
                    placeholder="Nh???p m?? m??n h???c"
                    aria-label="Full name"
                    onChange={(e) => {
                      setTimkiem(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleSearch}>T??m ki???m</CButton>
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
              <strong>Nh???p danh s??ch m??n h???c</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">M?? m??n h???c:</CFormLabel>
                  <CFormInput
                    placeholder="Nh???p m?? m??n h???c"
                    aria-label="Full name"
                    onChange={handleMamonhoc}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">T??n m??n h???c</CFormLabel>
                  <CFormInput
                    placeholder="Nh???p t??n m??n h???c"
                    aria-label="Date of birth"
                    onChange={handletenmonhoc}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputState">Lo???i m??n</CFormLabel>
                  <CFormSelect id="inputState" onChange={handleloaimonhoc}>
                    <option>Ch???n</option>
                    <option>L?? thuy???t (LT)</option>
                    <option>Th???c h??nh (TH)</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputAddress2">S??? ti???t</CFormLabel>
                  <CFormInput id="inputAddress2" placeholder="2" onChange={handlesotiet} />
                </CCol>
                <CCol xs={4}></CCol>
                <CCol xs={3}>
                  <CButton onClick={handleSubmit}>T???o m??n h???c m???i</CButton>
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleUpdate}>C???p nh???t m??n h???c</CButton>
                </CCol>
                <CCol xs={3}>
                  <CButton onClick={handleDisplay}>T???t c??? c??c m??n</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader className="text-center">
              <strong>DANH S??CH M??N H???C</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Stt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">M?? m??n h???c</CTableHeaderCell>
                    <CTableHeaderCell scope="col">T??n m??n h???c</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Lo???i m??n</CTableHeaderCell>
                    <CTableHeaderCell scope="col">S??? ti???t</CTableHeaderCell>
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
                            X??a
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
