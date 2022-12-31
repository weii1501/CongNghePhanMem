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

const StudyProgram = () => {
  const [nganhhoc, setNganhhoc] = useState(null)
  const [khoa, setKhoa] = useState(null)
  const [monhoc, setMonhoc] = useState(null)
  const [hocky, setHocky] = useState(null)
  const [ghichu, setGhichu] = useState(null)
  const [timkiem, setTimkiem] = useState(null)
  const [danhsach, setDanhsach] = useState(undefined)
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/chuongtrinhhoc')
      .then((res) => {
        // console.log(res.data)
        setDanhsach(res.data)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }, [])

  const handlenganhhoc = (e) => {
    setNganhhoc(e.target.value)
  }

  const handlekhoa = (e) => {
    setKhoa(e.target.value)
  }

  const handleSubmit = () => {
    console.log(nganhhoc, khoa, hocky, monhoc, ghichu)
    const data = {
      nganhhoc: nganhhoc,
      khoa: khoa,
      hocky: hocky,
      monhoc: monhoc,
      ghichu: ghichu,
    }
    axios
      .post('http://localhost:8080/api/chuongtrinhhoc', data)
      .then((res) => {
        setDanhsach((prev) => [...prev, res.data])
        setMessage('Tào thành công môn học')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
      .catch((err) => {
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleDelete = (index, e) => {
    const data = e.target.parentNode.parentNode.getAttribute('data')
    // console.log(e.target.parentNode.parentNode.getAttribute('dataId'))
    axios
      .delete(`http://localhost:8080/api/chuongtrinhhoc/${data}`)
      .then((res) => {
        // console.log(res.message)
        setDanhsach(danhsach.filter((v, i) => i !== index))
        setMessage(`Xóa thành công môn học của ngành ${data}`)
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

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/chuongtrinhhoc/${timkiem}`)
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

  const handleDisplay = () => {
    axios
      .get('http://localhost:8080/api/chuongtrinhhoc')
      .then((res) => {
        // console.log(res.data)
        setDanhsach(res.data)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      })
  }

  const handleUpdate = () => {
    // // console.log(mssv, hoten, ngaysinh, gioitinh, quequan, doituong, nganhhoc)
    const data = {
      khoa: khoa,
      hocky: hocky,
      monhoc: monhoc,
      ghichu: ghichu,
    }

    axios
      .put(`http://localhost:8080/api/chuongtrinhhoc/${nganhhoc}`, data)
      .then((res) => {
        // console.log(res.data)
        setMessage('Cập nhật hồ sơ sinh viên thành công')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        axios
          .get('http://localhost:8080/api/chuongtrinhhoc')
          .then((res) => {
            // console.log(res.data)
            setDanhsach(res.data)
          })
          .catch((err) => {
            // console.log(err.message)
            setMessage(err.message)
            setAlert(true)
            setTimeout(() => {
              setAlert(false)
            }, 2000)
          })
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
              <strong>Chọn thông tin tra cứu</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputEmail4">Ngành học: </CFormLabel>
                  <CFormSelect
                    onChange={(e) => {
                      setTimkiem(e.target.value)
                    }}
                  >
                    <option>Chọn</option>
                    {danhsach &&
                      danhsach.map((el, index) => (
                        <option key={index} value={el.nganhhoc}>
                          {el.nganhhoc}
                        </option>
                      ))}
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSearch}>Tra cứu</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
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
                    aria-label="nganhhocs"
                    onChange={handlenganhhoc}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Khoa:</CFormLabel>
                  <CFormInput placeholder="Nhập khoa" aria-label="khoa" onChange={handlekhoa} />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Môn học:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập môn học"
                    aria-label="khoa"
                    onChange={(e) => setMonhoc(e.target.value)}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Học kì</CFormLabel>
                  <CFormSelect
                    id="inputState"
                    onChange={(e) => {
                      setHocky(e.target.value)
                    }}
                  >
                    <option>Chọn</option>
                    <option value={1}>Học kỳ 1</option>
                    <option value={2}>Học kỳ 2</option>
                    <option value={3}>Học kỳ hè</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputEmail4">Ghi chú:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập khoa"
                    aria-label="khoa"
                    onChange={(e) => {
                      setGhichu(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
                  <CButton onClick={handleSubmit}>Tạo</CButton>
                </CCol>
                <CCol xs={4}>
                  <CButton onClick={handleUpdate}>Cập nhật</CButton>
                </CCol>
                <CCol xs={4}>
                  <CButton onClick={handleDisplay}>Tất cả</CButton>
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
                    <CTableHeaderCell scope="col">Khoa </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ghi chú</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {danhsach &&
                    danhsach.map((el, index) => (
                      <CTableRow key={index} data={el.nganhhoc}>
                        <CTableDataCell>{el.hocky}</CTableDataCell>
                        <CTableDataCell>{el.monhoc}</CTableDataCell>
                        <CTableDataCell>{el.khoa}</CTableDataCell>
                        <CTableDataCell>{el.ghichu}</CTableDataCell>
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

export default StudyProgram
