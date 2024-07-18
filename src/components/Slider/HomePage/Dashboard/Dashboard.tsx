// import imageOne from "../../../../img/iconEnvelope.png";
// import iconBell from "../../../../img/iconBell.png";
// import iconDraft from "../../../../img/iconDraft.png";
// import iconOngoingTasks from "../../../../img/iconOngoingTasks.png";
// import { ChangeEvent, useEffect, useState } from "react";
// import { FaTrashAlt, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import useAxios from "../../../../api/useAxios";

// interface DataRow {
//   id: number;
//   date: string;
//   sender: string;
//   subject: string;
//   phone: string;
//   read: boolean;
//   type: string;
// }

// const DashBort = () => {
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState<DataRow[]>([]);
//   const [filteredData, setFilteredData] = useState<DataRow[]>([]);
//   const navigate = useNavigate();

//   const { getData, status, error } = useAxios<DataRow[]>();

//   useEffect(() => {
//     getData("http://192.168.100.18:8000/order/").then((response) => {
//       if (response) {
//         setData(response);
//         setFilteredData(response);
//       }
//     });
//     console.log("status",status);
//   }

//   , [getData]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result: DataRow[] = [
//   //       {
//   //         id: 1,
//   //         date: "1402/01/01",
//   //         sender: "محسن جوکار",
//   //         subject: "ثبت نامه با تک نیاز به پاسخ",
//   //         phone: "09123456789",
//   //         read: false,
//   //         type: "مهم",
//   //       },
//   //       {
//   //         id: 2,
//   //         date: "1402/10/12",
//   //         sender: "نرم افزار هلپیکال",
//   //         subject: "قرارداد ارسال از سمت مشتری",
//   //         phone: "09123456780",
//   //         read: false,
//   //         type: "وارد",
//   //       },
//   //       {
//   //         id: 3,
//   //         date: "1402/10/13",
//   //         sender: "محمد احمدی",
//   //         subject: "استعلام قیمت",
//   //         phone: "09123456781",
//   //         read: false,
//   //         type: "داخلی",
//   //       },
//   //       {
//   //         id: 4,
//   //         date: "1402/10/14",
//   //         sender: "علی کریمی",
//   //         subject: "درخواست جلسه",
//   //         phone: "09123456782",
//   //         read: false,
//   //         type: "وارد",
//   //       },
//   //       {
//   //         id: 5,
//   //         date: "1402/10/15",
//   //         sender: "حسین محمدی",
//   //         subject: "پیشنهاد همکاری",
//   //         phone: "09123456783",
//   //         read: false,
//   //         type: "داخلی",
//   //       },
//   //       {
//   //         id: 6,
//   //         date: "1402/10/16",
//   //         sender: "رضا رضایی",
//   //         subject: "ارسال مدارک",
//   //         phone: "09123456784",
//   //         read: false,
//   //         type: "وارد",
//   //       },
//   //     ];
//   //     setData(result);
//   //     setFilteredData(result);
//   //   };
//   //   fetchData();
//   // }, []);

//   const handleRowClicked = (row: DataRow) => {
//     changeReadStatus(row.id);
//     navigateToDetailPage(row.id);
//   };

//   const changeReadStatus = (id: number) => {
//     const newData = data.map((item) => {
//       if (item.id === id) {
//         return { ...item, read: !item.read };
//       }
//       return item;
//     });
//     setData(newData);
//     setFilteredData(newData);
//   };

//   const navigateToDetailPage = (id: number) => {
//     navigate(`/message/${id}`);
//   };

//   // const columns = [
//   //   {
//   //     name: "نوع نامه",
//   //     selector: (row: DataRow) => row.type,
//   //     cell: (row: DataRow) => (
//   //       <div
//   //         style={{
//   //           width: "100%",
//   //           overflow: "hidden",
//   //           textOverflow: "ellipsis",
//   //           whiteSpace: "nowrap",
//   //         }}
//   //       >
//   //         {row.type}
//   //       </div>
//   //     ),
//   //     width: "120px",
//   //   },
//   //   {
//   //     name: "وضعیت",
//   //     cell: (row: DataRow) => (
//   //       <div
//   //         onClick={() => changeReadStatus(row.id)}
//   //         style={{ cursor: "pointer" }}
//   //       >
//   //         {row.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
//   //       </div>
//   //     ),
//   //     width: "100px",
//   //   },
//   //   {
//   //     name: "موضوع نامه",
//   //     selector: (row: DataRow) => row.subject,
//   //     style: { flexGrow: 2 },
//   //     wrap: false,
//   //   },
//   //   {
//   //     name: "فرستنده نامه",
//   //     selector: (row: DataRow) => row.sender,
//   //     style: { flexGrow: 1 },
//   //     wrap: false,
//   //   },
//   //   {
//   //     name: "شماره تلفن",
//   //     selector: (row: DataRow) => row.phone,
//   //     style: { flexGrow: 1 },
//   //     wrap: false,
//   //   },
//   //   {
//   //     name: "تاریخ",
//   //     selector: (row: DataRow) => row.date,
//   //     style: { flexGrow: 0.5 },
//   //     wrap: false,
//   //   },
//   //   {
//   //     name: "",
//   //     cell: (row: DataRow) => (
//   //       <div style={{ textAlign: "center" }}>
//   //         <FaTrashAlt style={{ cursor: "pointer" }} />
//   //       </div>
//   //     ),
//   //     ignoreRowClick: true,
//   //     width: "50px",
//   //   },
//   // ];

//   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchText(value);
//     if (value === "") {
//       setFilteredData(data);
//     } else {
//       const filtered = data.filter((row) => row.phone.includes(value));
//       setFilteredData(filtered);
//     }
//   };

//   return (
//     <>
//       <div className="dashboard-container">
//         <div className="dashboard-panel">
//           <div className="panel-content">
//             <h2>خوانده نشده</h2>
//             <span>(4)</span>
//           </div>
//           <div className="panel-image">
//             <img src={imageOne} className="icon-image" />
//           </div>
//         </div>
//         <div className="dashboard-panel">
//           <div className="panel-content">
//             <h2>نیاز به پاسخ</h2>
//             <span>(7)</span>
//           </div>
//           <div className="panel-image">
//             <img src={iconBell} className="icon-image" />
//           </div>
//         </div>
//       </div>
//       <div className="dashboard-container">
//         <div className="dashboard-panel">
//           <div className="panel-content">
//             <h2>پیش نویس ها</h2>
//             <span>(4)</span>
//           </div>
//           <div className="panel-image">
//             <img src={iconDraft} className="icon-image" />
//           </div>
//         </div>
//         <div className="dashboard-panel">
//           <div className="panel-content">
//             <h2>وظایف در حال انجام</h2>
//             <span>(3)</span>
//           </div>
//           <div className="panel-image">
//             <img src={iconOngoingTasks} className="icon-image" />
//           </div>
//         </div>
//       </div>

//       <div
//         style={{
//           width: "100%",
//           height: "6%",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           style={{
//             width: "21%",
//             height: "100%",
//             backgroundColor: "#E8F3F4",
//             borderRadius: "8px",
//           }}
//         ></div>
//         <div
//           style={{
//             width: "7%",
//             height: "100%",
//             backgroundColor: "#E8F3F4",
//             borderRadius: "8px",
//           }}
//         ></div>

//         <input
//           type="search"
//           className="search-bar"
//           placeholder="جست و جو"
//           aria-label="Search"
//           aria-describedby="search-addon"
//           value={searchText}
//           onChange={handleSearch}
//         />
//       </div>

//       <div
//         style={{
//           width: "100%",
//           height: "54%",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <div className="data-table-container">
//           {/* <DataTable
//             columns={columns}
//             data={filteredData}
//             onRowClicked={handleRowClicked}
//             noHeader
//             defaultSortFieldId="id"
//             defaultSortAsc={false}
//             highlightOnHover
//             customStyles={{
//               rows: {
//                 style: {
//                   minHeight: "72px",
//                 },
//               },
//               headCells: {
//                 style: {
//                   paddingLeft: "8px",
//                   paddingRight: "8px",
//                 },
//               },
//               cells: {
//                 style: {
//                   paddingLeft: "8px",
//                   paddingRight: "8px",
//                 },
//               },
//             }}
//           /> */}
//         </div>
//       </div>
//     </>
//   );
// };
// export default DashBort;
import imageOne from "../../../../img/iconEnvelope.png";
import iconBell from "../../../../img/iconBell.png";
import iconDraft from "../../../../img/iconDraft.png";
import iconOngoingTasks from "../../../../img/iconOngoingTasks.png";
import { ChangeEvent, useEffect, useState } from "react";
import { FaTrashAlt, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import useAxios from "../../../../api/useAxios";

interface DataRow {
  id: number;
  delivery_date: string;
  customer_fullname: string;
  customer_mobile: string;
  status: string;
}

const DashBort = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]); // اضافه کردن وضعیت فیلتر شده
  const navigate = useNavigate();

  const { getData } = useAxios<DataRow[]>();

  useEffect(() => {
    getData("http://192.168.100.18:8000/order/").then((response) => {
      if (response) {
        setData(response);
        setFilteredData(response); // هنگام دریافت داده‌ها، فیلتر شده هم به همان مقدار داده می‌شود
      }
    });
  }, [getData]);

  const handleRowClicked = (id: number) => {
    navigate(`/home/message/${id}`);
  };



  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);

    const filtered = data.filter((row) => {
      // فیلتر بر اساس نام یا شماره تلفن
      return (
        row.customer_fullname.includes(value) ||
        row.customer_mobile.includes(value)
      );
    });

    setFilteredData(filtered); // بروزرسانی داده‌های فیلتر شده
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-panel">
          <div className="panel-content">
            <h2>خوانده نشده</h2>
            <span>(4)</span>
          </div>
          <div className="panel-image">
            <img src={imageOne} className="icon-image" alt="icon" />
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="panel-content">
            <h2>نیاز به پاسخ</h2>
            <span>(7)</span>
          </div>
          <div className="panel-image">
            <img src={iconBell} className="icon-image" alt="icon" />
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-panel">
          <div className="panel-content">
            <h2>پیش نویس ها</h2>
            <span>(4)</span>
          </div>
          <div className="panel-image">
            <img src={iconDraft} className="icon-image" alt="icon" />
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="panel-content">
            <h2>وظایف در حال انجام</h2>
            <span>(3)</span>
          </div>
          <div className="panel-image">
            <img src={iconOngoingTasks} className="icon-image" alt="icon" />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "6%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "21%",
            height: "100%",
            backgroundColor: "#E8F3F4",
            borderRadius: "8px",
          }}
        ></div>
        <div 
          style={{
            width: "7%",
            height: "100%",
            backgroundColor: "#E8F3F4",
            borderRadius: "8px",
          }}
        ></div>

        <input
          type="search"
          className="search-bar"
          placeholder="جست و جو"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div
        style={{
          width: "100%",
          height: "54%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="data-table-container">
          <table>
            <thead>
              <tr>
                <th>نام شرکت</th>
                <th>وضعیت نامه</th>
                <th>شماره تماس</th>
                <th>فرستنده نامه</th>
                <th>تاریخ تحویل</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} onClick={() => handleRowClicked(row.id)}>
                  <td>{row.customer_company}</td>
                  <td>{row.status}</td>
                  <td>{row.customer_mobile}</td>
                  <td>{row.customer_fullname}</td>
                  <td>{row.delivery_date}</td>
                  <td>
                    <FaEnvelope />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBort;
