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

export default function StudentProfile() {
  const [mssv, setMssv] = useState(null)
  const [hoten, setHoten] = useState(null)
  const [ngaysinh, setNgaysinh] = useState(null)
  const [gioitinh, setGioitinh] = useState(null)
  const [quequan, setQuequan] = useState(null)
  const [doituong, setDoituong] = useState(null)
  const [nganhhoc, setNganhhoc] = useState(null)
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [toggle, setToggle] = useState(false)
  const [khoa, setKhoa] = useState('')
  const string = `Quê quán gồm Huyện và Tỉnh. Cần lưu lại danh sách các Huyện và Tỉnh này, thông tin về Huyện sẽ cho biết Huyện đó có thuộc vùng sâu/vùng xa hay không.
  Sinh viên thuộc một trong các đối tượng ưu tiên sau: con liệt sĩ, con thương binh, vùng sâu, vùng xa…Mỗi đối tượng có một tỉ lệ tương ứng về việc giảm học phí (80%, 50%, 30%...), đối tượng của sinh viên là đối tượng có độ ưu tiên cao nhất mà sinh viên thuộc về.
  Mỗi Khoa có nhiều Ngành học, mỗi sinh viên học một Ngành học.`

  const handleMssv = (e) => {
    setMssv(e.target.value)
    // console.log(mssv)
  }

  const handleHoten = (e) => {
    setHoten(e.target.value)
    // console.log(hoten)
  }

  const handleNgaysinh = (e) => {
    setNgaysinh(e.target.value)
    // console.log(ngaysinh)
  }

  const handleGioitinh = (e) => {
    setGioitinh(e.target.value)
    // console.log(gioitinh)
  }

  const handlequequan = (e) => {
    setQuequan(e.target.value)
    // console.log(quequan)
  }

  const handleDoituong = (e) => {
    setDoituong(e.target.value)
    // console.log(doituong)
  }

  const handleNganhhoc = (e) => {
    setNganhhoc(e.target.value)
    // console.log(nganhhoc)
  }

  const handleKhoa = (e) => {
    setNganhhoc(e.target.value)
    // console.log(khoa)
  }

  const handleSubmit = () => {
    // // console.log(mssv, hoten, ngaysinh, gioitinh, quequan, doituong, nganhhoc)
    // setToggle(!toggle)
    const data = {
      mssv: mssv,
      hoten: hoten,
      ngaysinh: ngaysinh,
      gioitinh: gioitinh,
      doituong: doituong,
      quequan: quequan,
      nganhhoc: nganhhoc,
    }

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }

    axios
      .post('http://localhost:8080/api/hososinhvien', data)
      .then((res) => {
        // console.log(res.data)
        setMessage('Lập hồ sơ sinh viên thành công')
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

  const handleUpdate = () => {
    // // console.log(mssv, hoten, ngaysinh, gioitinh, quequan, doituong, nganhhoc)
    setToggle(false)
    const data = {
      hoten: hoten,
      ngaysinh: ngaysinh,
      gioitinh: gioitinh,
      doituong: doituong,
      quequan: quequan,
      nganhhoc: nganhhoc,
      khoa: khoa,
    }

    axios
      .put(`http://localhost:8080/api/hososinhvien/${mssv}`, data)
      .then((res) => {
        // console.log(res.data)
        setMessage('Cập nhật hồ sơ sinh viên thành công')
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          {alert && (
            <CAlert className="fixed-bottom text-center" color={status}>
              {message}
            </CAlert>
          )}
          <CCardHeader>
            <strong>Lập hồ sơ sinh viên</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 mt-1">
              <CCol xs={3}>
                <CFormLabel htmlFor="inputEmail4">Mã số sinh viên:</CFormLabel>
                <CFormInput
                  placeholder="Nhập mã số sinh viên"
                  aria-label="MSSV"
                  onChange={handleMssv}
                />
              </CCol>
              <CCol xs={5}>
                <CFormLabel htmlFor="inputEmail4">Họ tên:</CFormLabel>
                <CFormInput
                  placeholder="Nhập họ tên đầy đủ"
                  aria-label="Full name"
                  onChange={handleHoten}
                />
              </CCol>
              <CCol xs={2}>
                <CFormLabel htmlFor="inputEmail4">Ngày sinh:</CFormLabel>
                <CFormInput
                  placeholder="Nhập ngày sinh"
                  aria-label="Date of birth"
                  onChange={handleNgaysinh}
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="inputState">Giới tính:</CFormLabel>
                <CFormSelect id="inputState" onChange={handleGioitinh}>
                  <option>Chọn</option>
                  <option>Nam</option>
                  <option>Nữ</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="inputAddress2">Quên quán:</CFormLabel>
                <CFormInput
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  onChange={handlequequan}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputCity">Đối tượng:</CFormLabel>
                <CFormInput id="inputCity" onChange={handleDoituong} />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="">Ngành học:</CFormLabel>
                <CFormInput id="" onChange={handleNganhhoc} />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="">Khoa:</CFormLabel>
                <CFormInput id="" onChange={handleKhoa} />
              </CCol>
              <CCol xs={2}>
                <CButton onClick={handleSubmit}>Lập hồ sơ</CButton>
              </CCol>
              <CCol xs={2}>
                <CButton onClick={handleUpdate}>Cập nhật</CButton>
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
                  <dt className="col-sm-3">MSSV: </dt>
                  <dd className="col-sm-9">{mssv}</dd>

                  <dt className="col-sm-3">Ho tên </dt>
                  <dd className="col-sm-9">{hoten}</dd>

                  <dt className="col-sm-3">Ngày sinh</dt>
                  <dd className="col-sm-9">{ngaysinh}</dd>

                  <dt className="col-sm-3">Giới Tính</dt>
                  <dd className="col-sm-9">{gioitinh}</dd>

                  <dt className="col-sm-3 text-truncate">Quê quán</dt>
                  <dd className="col-sm-9">{quequan}</dd>

                  <dt className="col-sm-3 text-truncate">Đối Tượng</dt>
                  <dd className="col-sm-9">{doituong}</dd>

                  <dt className="col-sm-3 text-truncate">Ngành học</dt>
                  <dd className="col-sm-9">{nganhhoc}</dd>
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
  )
}
