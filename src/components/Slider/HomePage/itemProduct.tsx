import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../api/useAxios";
import { BsFileEarmarkText } from "react-icons/bs";
const ItemProduct = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const { getData } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(`http://192.168.100.18:8000/order/${id}`);
      setItemData(response);
    };

    fetchData();
  }, [id, getData]);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#E8F3F4",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>سفارش</h2>
            <BsFileEarmarkText />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>نام شرکت:</h4>
            <span>{itemData.order.customer_company}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>نام و نام خانوادگی:</h4>
            <span>{itemData.order.customer_fullname}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4> شماره تماس:</h4>
            <span>{itemData.order.customer_mobile}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>سمت:</h4>
            <span>{itemData.order.positon}</span>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>تاریخ</h2>
            <BsFileEarmarkText />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>مقدار:</h4>
            <span>{itemData.order.customer_company}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>تاریخ ثبت شده:</h4>
            <span>{itemData.order.date}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>تاریخ تحویل:</h4>
            <span>{itemData.order.delivery_date}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
      
          }}
        >
          {itemData.order_item.map((x) => (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={x.id}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h4>نام محصول:</h4>
                <span>{x.product.title}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h4>شماره سریال:</h4>
                <span>{x.product.serial}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <h4>توضیحات:</h4>
                <span>{x.product.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemProduct;
