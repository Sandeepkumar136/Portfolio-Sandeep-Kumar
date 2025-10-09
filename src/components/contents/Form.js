import React from "react";

const Form = () => {
  return (
    <div className="bk-container">
      <div className="bk-head-container">
        <h3 className="bk-head">Fillup your Credential.</h3>
        <h6 className="bk-subtitle">Book your project now</h6>
      </div>
      <form action="" method="post" className="bk-form">
        <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">Enter name</h4>
          <div className="bk-inp-cov">
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                First Name
              </label>
            </div>
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Middle Name
              </label>
            </div>
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Last Name
              </label>
            </div>
          </div>
        </div>
        <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">Contact Number</h4>
          <div className="bk-inp-cov-hp">
            <div className="bk-fm-inp-contain">
              <input type="number" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Phone Number
              </label>
            </div>
            <div className="bk-lb-wh">
              <input
                type="checkbox"
                name=""
                defaultChecked={false}
                id=""
                className="bk-ch-fm"
              />
              Is it whatsapp number?
            </div>
          </div>
        </div>
        <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">E-Mail</h4>
          <div className="bk-inp-cov">
            <div className="bk-fm-inp-contain">
              <input
                type="email"
                placeholder="ex: example@example.com"
                name=""
                id=""
                className="bk-nm-inp"
              />
              <label htmlFor="" className="bk-nm-lb">
                example@example.com
              </label>
            </div>
          </div>
        </div>
        <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">Address</h4>
          <div className="bk-inp-cov">
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Address
              </label>
            </div>
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Street Address
              </label>
            </div>
          </div>
        </div>
                <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">Enter name</h4>
          <div className="bk-inp-cov">
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                Postal/Zip Code
              </label>
            </div>
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                City
              </label>
            </div>
            <div className="bk-fm-inp-contain">
              <input type="text" name="" id="" className="bk-nm-inp" />
              <label htmlFor="" className="bk-nm-lb">
                State
              </label>
            </div>
          </div>
        </div>
                <div className="bk-inp-contain-nme">
          <h4 className="heading-bk-fm">Enter name</h4>
          <div className="bk-inp-cov">
            <div className="bk-fm-inp-contain">
              <textarea name="" id="" className="txt-ar-bk-fm"></textarea>
              <label htmlFor="" className="bk-nm-lb">
                Enter Credentails
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
