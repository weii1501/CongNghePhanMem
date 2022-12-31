import React, { useState, useEffect } from "react"
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
  CTableHeaderCell,
  CTableRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableBody,
  CAlert,
} from "@coreui/react"
import axios from "axios"

const CourseRegistration = () => {
  const [namhoc, setNamhoc] = useState(null)
  const [hocky, setHocky] = useState(null)
  const [ngaylap, setNgaylap] = useState(null)
  const [sophieu, setSophieu] = useState(null)
  const [mssv, setMssv] = useState(null)
  const [danhsach, setdanhsach] = useState([])
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [toggle, setToggle] = useState(false)
  const [monhoc, setMonhoc] = useState(null)
  const [sotinchi, setSotinchi] = useState(null)
  const [object, setObject] = useState(null)
  const string = `Phòng tài vụ sẽ dựa trên số tín chỉ mà sinh viên đăng ký để thu học phí: nếu đăng ký môn LT sinh viên sẽ phải đóng 27.000đ/1 tín chỉ; với môn TH là 37.000đ/1 tín chỉ.
  Sinh viên chỉ được đăng ký các môn học có mở trong một học kỳ của năm học.`

  const handleDelete = (index, e) => {
    setdanhsach(danhsach.filter((v, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log(sophieu, namhoc, hocky, mssv, ngaylap)
    const data = {
      namhoc: namhoc,
      hocky: hocky,
      ngaylap: ngaylap,
      sophieu: sophieu,
      mssv: mssv,
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }

    axios
      .post("http://localhost:8080/api/dangkyhocphan", data)
      .then((res) => {
        // console.log(res.data)
        setMessage("Lập phiếu thành công")
        setObject(res.data)
        setStatus("success")
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(true)
      })
      .catch((err) => {
        // console.log(err.message)
        setMessage(err.message)
        setStatus("danger")
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(false)
      })
  }

  const handleAdd1 = (monhoc, sotinchi) => {
    const data = {
      sophieu: sophieu,
      tenmonhoc: monhoc,
      sotinchi: sotinchi,
    }
    console.log(data)
    axios
      .post("http://localhost:8080/api/monhocdangkyhocphan/", data)
      .then((res) => {
        // console.log(res.data)
        setMessage("Lập phiếu thành công")
        setdanhsach((prev) => [...prev, data])
        setStatus("success")
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
        setToggle(true)
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

  const handleAdd = () => {
    const data = {
      monhoc: monhoc,
      sotinchi: sotinchi,
    }
    setdanhsach((prev) => [...prev, data])
  }

  const handleAdd2 = () => {
    console.log()
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
              <strong>ĐĂNG KÝ MÔN HỌC</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputEmail4">Số phiếu: </CFormLabel>
                  <CFormInput
                    placeholder=""
                    aria-label="Full name"
                    onChange={(e) => {
                      setSophieu(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel
                    htmlFor="inputEmail4"
                    onChange={(e) => {
                      setMssv(e.target.value)
                    }}
                  >
                    Mã số sinh viên:
                  </CFormLabel>
                  <CFormInput
                    placeholder=""
                    aria-label=""
                    onChange={(e) => {
                      setMssv(e.target.value)
                    }}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel
                    htmlFor="inputState"
                    onChange={(e) => {
                      setNgaylap(e.target.value)
                    }}
                  >
                    Ngày lập:
                  </CFormLabel>
                  <CFormInput
                    placeholder=""
                    aria-label=""
                    onChange={(e) => {
                      setNgaylap(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={3}>
                  <CFormLabel
                    htmlFor="inputAddress2"
                    onChange={(e) => {
                      setHocky(e.target.value)
                    }}
                  >
                    Học kỳ:
                  </CFormLabel>
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
                <CCol md={3}>
                  <CFormLabel
                    htmlFor="inputCity"
                    onChange={(e) => {
                      setNamhoc(e.target.value)
                    }}
                  >
                    Năm học:
                  </CFormLabel>
                  <CFormInput
                    id="inputCity"
                    onChange={(e) => {
                      setNamhoc(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleSubmit}>Đăng ký môn</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Đăng kí môn</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 mt-1">
                <CCol xs={10}>
                  <CFormLabel htmlFor="inputEmail4">Môn học: </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setMonhoc(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={2}>
                  <CFormLabel htmlFor="inputEmail4">Số tín chỉ: </CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setSotinchi(e.target.value)
                    }}
                  />
                </CCol>
                <CCol xs={12}>
                  <CButton onClick={handleAdd}>Thêm</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
          {toggle && (
            <CCard className="mb-4">
              <CCardHeader className="text-center">
                <strong>
                  <h4>PHIẾU ĐĂNG KÍ HỌC PHẦN</h4>
                </strong>
              </CCardHeader>
              <CCardBody>
                <div className="bd-example">
                  <dl className="row">
                    <dt className="col-sm-3">Số phiếu: </dt>
                    <dd className="col-sm-9">{object.sophieu}</dd>

                    <dt className="col-sm-3">Mã số sinh viên: </dt>
                    <dd className="col-sm-9">{object.mssv}</dd>

                    <dt className="col-sm-3">Ngày lập:</dt>
                    <dd className="col-sm-9">{object.ngaylap}</dd>

                    <dt className="col-sm-3">Học kỳ:</dt>
                    <dd className="col-sm-9">{object.hocky}</dd>

                    <dt className="col-sm-3 text-truncate">Năm học:</dt>
                    <dd className="col-sm-9">{object.namhoc}</dd>
                  </dl>
                </div>
              </CCardBody>
              <CCardBody>
                <CTable>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell scope="col">Stt</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Số tín chỉ</CTableHeaderCell>
                      <CTableHeaderCell scope="col"></CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {danhsach &&
                      danhsach.map((el, index) => (
                        <CTableRow key={index} dataId={el.stt}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{el.monhoc}</CTableDataCell>
                          <CTableDataCell>{el.sotinchi}</CTableDataCell>
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
              <CCardBody>
                <p>
                  <strong>QĐ4: </strong>
                  {string}
                </p>
              </CCardBody>
              <CCol xs={12}>
                <CButton onClick={handleAdd2}>Thêm</CButton>
              </CCol>
            </CCard>
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default CourseRegistration
