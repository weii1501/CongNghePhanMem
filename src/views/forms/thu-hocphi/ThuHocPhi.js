import React, { useState, useEffect } from 'react'
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
  CRow,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const ThuHocPhi = () => {
  const [sophieuhocphi, setSophieuhocphi] = useState(null)
  const [mssv, setMssv] = useState(null)
  const [ngaylap, setNgaylap] = useState(null)
  const [sotienthu, setSotienthu] = useState(null)
  const [danhsach, setDanhsach] = useState(undefined)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [alert, setAlert] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [timkiem, setTimkiem] = useState(null)
  const string = `Phiếu thu được lập dựa trên phiếu đăng ký học phần của sinh viên trong một học kỳ. Sinh viên có thể đóng học phí nhiều lần cho một phiếu đăng ký nhưng phải hoàn thành việc đóng học phí trước thời hạn qui định đóng học phí của học kỳ đó (nếu không sẽ không được tham dự kỳ thi cuối kỳ).`

  const handleSubmit = () => {
    const data = {
      sophieuhocphi: sophieuhocphi,
      mssv: mssv,
      ngaylap: ngaylap,
      sotienthu: sotienthu,
    }

    axios
      .post('http://localhost:8080/api/phieuthuhocphi', data)
      .then((res) => {
        // console.log(res.data)
        setMessage('Thu học phí thành công')
        setDanhsach(res.data)
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(true)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setStatus('danger')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(false)
      })
  }

  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/phieuthuhocphi/${timkiem}`)
      .then((res) => {
        console.log(res.data)
        setDanhsach([res.data])
        setMessage('Tìm kiếm thành công môn học')
        setStatus('success')
        setDanhsach(res.data)
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(true)
      })
      .catch((err) => {
        setToggle(false)
        console.log(err.message)
      })
  }

  const reverseString = (str) => {
    return str.split('-').reverse().join('-')
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
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputEmail4">Số phiếu: </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setTimkiem(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSearch}>Tra cứu</CButton>
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
              <strong>TẠO PHIẾU THU HỌC PHÍ</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Số phiếu:</CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSophieuhocphi(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Mã số sinh viên:</CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setMssv(e.target.value)
                    }}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputState">Ngày lập:</CFormLabel>
                  <CFormInput
                    placeholder="2022-01-01"
                    onChange={(e) => {
                      setNgaylap(e.target.value)
                    }}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">Số tiền thu:</CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSotienthu(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSubmit}>Tạo</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          {toggle && (
            <CCard className="mb-4">
              <CCardHeader className="text-center">
                <strong>
                  <h4>HỒ SƠ SINH VIÊN</h4>
                </strong>
              </CCardHeader>
              <CCardBody>
                <div className="bd-example">
                  <dl className="row">
                    <dt className="col-sm-3">Số phiếu: </dt>
                    <dd className="col-sm-9">{danhsach.sophieuhocphi}</dd>

                    <dt className="col-sm-3">Ngày lập: </dt>
                    <dd className="col-sm-9">{reverseString(danhsach.ngaylap.substring(0, 10))}</dd>

                    <dt className="col-sm-3">Mã số sinh viên</dt>
                    <dd className="col-sm-9">{danhsach.mssv}</dd>

                    <dt className="col-sm-3">Số tiền thu</dt>
                    <dd className="col-sm-9">{danhsach.sotienthu}</dd>
                  </dl>
                </div>
              </CCardBody>
              <CCardBody>
                <p>
                  <strong>QĐ1: </strong>
                  {string}
                </p>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default ThuHocPhi
