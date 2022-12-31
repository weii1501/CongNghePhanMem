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
  CToast,
  CToastHeader,
  CToastBody,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const Tuition = () => {
  const [mssv, setMssv] = useState(null)
  const [namhoc, setNamhoc] = useState(null)
  const [hocky, setHocky] = useState(null)
  const [sotiendangky, setSotiendangky] = useState(null)
  const [sotienphaidong, setSotienphaidong] = useState(null)
  const [sotienconlai, setSotienconlai] = useState(null)
  const [danhsach, setDanhsach] = useState(undefined)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [alert, setAlert] = useState(false)
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/danhsachchuadonghocphi')
      .then((res) => {
        console.log(res.data)
        setDanhsach(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  const list = [
    {
      id: 1,
      studentCode: '19521812',
      registrationAmount: '12.000.000 VNĐ',
      amountPaid: '12.000.000 VNĐ',
      amountOwed: '0 VNĐ',
    },
  ]
  const [studentList, setStudentList] = useState(list)

  const handleSubmit = (e) => {
    // console.log(mamonhoc, tenmonhoc, loaimonhoc, sotiet)
    const data = {
      namhoc: namhoc,
      hocky: hocky,
      mssv: mssv,
      sotienconlai: sotienconlai,
      sotienphaidong: sotienphaidong,
      sotiendangky: sotiendangky,
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }
    axios
      .post('http://localhost:8080/api/danhsachchuadonghocphi', data, config)
      .then((res) => {
        console.log(res.data)
        setDanhsach((prev) => [...prev, res.data])
        setMessage('Tạo thành công môn học')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
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

  const handleUpdate = () => {
    // // console.log(mssv, hoten, ngaysinh, gioitinh, quequan, doituong, nganhhoc)
    const data = {
      namhoc: namhoc,
      hocky: hocky,
      sotienconlai: sotienconlai,
      sotiendangky: sotiendangky,
      sotienphaidong: sotienphaidong,
    }

    axios
      .put(`http://localhost:8080/api/danhsachchuadonghocphi/${mssv}`, data)
      .then((res) => {
        // console.log(res.data)
        setMessage('Cập nhật thành công')
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        axios
          .get('http://localhost:8080/api/danhsachchuadonghocphi')
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

  const handleDelete = (index, e) => {
    const data = e.target.parentNode.parentNode.getAttribute('data')
    // console.log(e.target.parentNode.parentNode.getAttribute('dataId'))
    axios
      .delete(`http://localhost:8080/api/danhsachchuadonghocphi/${data}`)
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

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Chon thời gian tra cứu học phí</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Học kì</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>Chọn</option>
                    <option>Học kỳ 1</option>
                    <option>Học kỳ 2</option>
                    <option>Học kỳ hè</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Năm học</CFormLabel>
                  <CFormInput placeholder="Nhập năm học" aria-label="scholastic" />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSubmit}>Tạo môn học mới</CButton>
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
              <strong>Tạo danh sách đóng học phí</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputEmail4">Mã số sinh viên:</CFormLabel>
                  <CFormInput
                    placeholder="Nhập mã số sinh viên"
                    aria-label="MSSV"
                    onChange={(e) => {
                      setMssv(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputEmail4">Năm học:</CFormLabel>
                  <CFormInput
                    placeholder="2022"
                    onChange={(e) => {
                      setNamhoc(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
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
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputAddress2">Số tiền đăng ký:</CFormLabel>
                  <CFormInput
                    id="inputAddress2"
                    onChange={(e) => {
                      setSotiendangky(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputAddress2">Số tiền phải đóng:</CFormLabel>
                  <CFormInput
                    id="inputAddress2"
                    onChange={(e) => {
                      setSotienphaidong(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel htmlFor="inputAddress2">Số tiền còn lại:</CFormLabel>
                  <CFormInput
                    id="inputAddress2"
                    onChange={(e) => {
                      setSotienconlai(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={4}>
                  <CButton onClick={handleSubmit}>Tạo</CButton>
                </CCol>
                <CCol xs={4}>
                  <CButton onClick={handleUpdate}>Cập nhật</CButton>
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
                    <CTableHeaderCell scope="col">Mã số sinh viên</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Năm học</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Học kỳ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số tiền đăng ký</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số tiền phải đóng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số tiền còn lại</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {danhsach &&
                    danhsach.map((el, index) => (
                      <CTableRow key={index} dataId={el.mssv}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{el.mssv}</CTableDataCell>
                        <CTableDataCell>{el.namhoc}</CTableDataCell>
                        <CTableDataCell>{el.hocky}</CTableDataCell>
                        <CTableDataCell>{el.sotiendangky}</CTableDataCell>
                        <CTableDataCell>{el.sotienphaidong}</CTableDataCell>
                        <CTableDataCell>{el.sotienconlai}</CTableDataCell>
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

export default Tuition
