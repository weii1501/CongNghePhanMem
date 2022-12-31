import React, { useState, useEffect, useCallback } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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

export default function StudentProfileGetAll() {
  const [danhsach, setDanhsach] = useState(undefined)
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [profile, setProfile] = useState(undefined)
  const string = `Quê quán gồm Huyện và Tỉnh. Cần lưu lại danh sách các Huyện và Tỉnh này, thông tin về Huyện sẽ cho biết Huyện đó có thuộc vùng sâu/vùng xa hay không.
  Sinh viên thuộc một trong các đối tượng ưu tiên sau: con liệt sĩ, con thương binh, vùng sâu, vùng xa…Mỗi đối tượng có một tỉ lệ tương ứng về việc giảm học phí (80%, 50%, 30%...), đối tượng của sinh viên là đối tượng có độ ưu tiên cao nhất mà sinh viên thuộc về.
  Mỗi Khoa có nhiều Ngành học, mỗi sinh viên học một Ngành học.`

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/hososinhvien')
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

  const handleDelete = (index, e) => {
    const data = e.target.parentNode.parentNode.getAttribute('dataId')
    // console.log(e.target.parentNode.parentNode.getAttribute('dataId'))
    axios
      .delete(`http://localhost:8080/api/hososinhvien/${data}`)
      .then((res) => {
        // console.log(res.message)
        setDanhsach(danhsach.filter((v, i) => i !== index))
        setMessage(`Xóa thành công hồ sơ sinh vien có MSSV là ${data}`)
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setProfile(undefined)
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

  const handleDeleteAll = (e) => {
    axios
      .delete(`http://localhost:8080/api/hososinhvien/`)
      .then((res) => {
        // console.log(res.message)
        setDanhsach(undefined)
        setMessage(`Xóa thành công tất cả hồ sơ sinh viên`)
        setStatus('success')
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setProfile(undefined)
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

  const find = (e) => {
    // console.log(e.target.parentNode.getAttribute('dataId'))
    const data = e.target.parentNode.getAttribute('dataId')
    axios
      .get(`http://localhost:8080/api/hososinhvien/${data}`)
      .then((res) => {
        // console.log(res.message)
        setMessage(`Tìm thấy hồ sơ sinh vien có MSSV là ${data}`)
        setStatus('success')
        setAlert(true)
        setProfile(res.data)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        // console.log(profile)
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
          <CButton
            onClick={(e) => {
              handleDeleteAll(e)
            }}
          >
            Xóa tất cả hồ sơ
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            {alert && (
              <CAlert className="fixed-bottom text-center" color={status}>
                {message}
              </CAlert>
            )}
            <CCardHeader className="text-center">
              <strong>TẤT CẢ HỒ SƠ SINH VIÊN</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Stt</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mssv</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Họ tên</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Giới tính</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quên quán</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Đối tượng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngành học</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {danhsach &&
                    danhsach.map((el, index) => (
                      <CTableRow key={index} dataId={el.mssv} onClick={find}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{el.mssv}</CTableDataCell>
                        <CTableDataCell>{el.hoten}</CTableDataCell>
                        <CTableDataCell>{el.ngaysinh}</CTableDataCell>
                        <CTableDataCell>{el.gioitinh}</CTableDataCell>
                        <CTableDataCell>{el.quequan}</CTableDataCell>
                        <CTableDataCell>{el.doituong}</CTableDataCell>
                        <CTableDataCell>{el.nganhhoc}</CTableDataCell>
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
          {profile && (
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
                    <dd className="col-sm-9">{profile.mssv}</dd>

                    <dt className="col-sm-3">Ho tên </dt>
                    <dd className="col-sm-9">{profile.hoten}</dd>

                    <dt className="col-sm-3">Ngày sinh</dt>
                    <dd className="col-sm-9">{profile.ngaysinh}</dd>

                    <dt className="col-sm-3">Giới Tính</dt>
                    <dd className="col-sm-9">{profile.gioitinh}</dd>

                    <dt className="col-sm-3 text-truncate">Quê quán</dt>
                    <dd className="col-sm-9">{profile.quequan}</dd>

                    <dt className="col-sm-3 text-truncate">Đối Tượng</dt>
                    <dd className="col-sm-9">{profile.doituong}</dd>

                    <dt className="col-sm-3 text-truncate">Ngành học</dt>
                    <dd className="col-sm-9">{profile.nganhhoc}</dd>
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
