import "./RequestForm.css";
import iconKindOfProduct from "../../../img/iconkindOfProduct.png";
import iconAmountAndDate from "../../../img/iconAmountAndDate.png";
import iconCustomerRegistration from "../../../img/iconCustomerRegistration.png";
import FirstStage from "./firstStage";
import SecondStage from "./SecondStage";
import ThirdStage from "./ThirdStage";
import { useState } from "react";

interface IResult {
  name: string;
  Number: number;
  SerialNumber: string;
  Description: string;
}


const RequestForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [results, setResults] = useState<IResult[]>([]);

  
const [idProduct, setIdProduct] = useState<number>(0);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const finishStep = () => {
    setStep(1);
    setResults([]);
  };
  const appendItem = (item: IResult) => {
    setResults((prevResults) => [...prevResults, item]);
  };

  return (
    <div className="form-container">
      <div id="msform">
        <div className="form-container-step">
          <ul id="progressbar">
            <progress
              value={step === 1 ? 0 : step === 2 ? 0.5 : 1}
              style={{
                width: "68%",
                position: "absolute",
                marginLeft: "16%",
                marginRight: "16%",
                marginBottom: "20px",
                height: "5px",
              }}
            />
            <li className={step >= 1 ? "active" : ""}>
              <div className="icon-container">
                <img src={iconCustomerRegistration} alt="ثبت مشتری" />
              </div>
              ثبت مشتری
            </li>
            <li className={step >= 2 ? "active" : ""}>
              <div className="icon-container">
                <img src={iconKindOfProduct} alt="نوع محصول" />
              </div>
              نوع محصول
            </li>
            <li className={step >= 3 ? "active" : ""}>
              <div className="icon-container">
                <img src={iconAmountAndDate} alt="تاریخ و زمان" />
              </div>
              تاریخ و زمان
            </li>
          </ul>
        </div>

        <div className="form-container-form">
          {step === 1 && (
            <FirstStage nextStep={nextStep} setIdProduct={setIdProduct} />
          )}
          {step === 2 && (
            <SecondStage
              nextStep={nextStep}
              prevStep={prevStep}
              appendItem={appendItem}
              results={results}
              idProduct={idProduct}
            />
          )}
          {step === 3 && (
            <ThirdStage finishStep={finishStep} prevStep={prevStep} idProduct={idProduct}/>
          )}
        </div>
      </div>

      {step === 2 && (
        <div className="product-list-container">
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>نام محصول</th>
                  <th>تعداد</th>
                  <th>شماره سریال</th>
                  <th>توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {results.map((field, index) => (
                  <tr key={index}>
                    <td>{field.name}</td>
                    <td>{field.Number}</td>
                    <td>{field.SerialNumber}</td>
                    <td>{field.Description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
