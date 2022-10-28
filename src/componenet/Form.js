import { useEffect, useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import Rightform from "./RightForm";

export default function Form() {
  const localStorageData = JSON.parse(localStorage.getItem("saveData"));
  const date = new Date();
  const time = date.getTime();

  const [formData, setFormdata] = useState({
    id: time,
    firstName: "",
    lastName: "",
    emailAddress: "",
    contactNumber: "",
    gender: "",
    language: {
      english: false,
      hindi: false,
      gujarati: false,
    },
    aboutProject: "",
  });

  const [error, setError] = useState({});
  const [storedata, setStoredata] = useState([]);

  // const handlechange =(e) => {
  //   setCountry(e.target.value);
  // }

  // validation
  const validate = () => {
    let erros = {};
    if (!formData.firstName) {
      erros.firstName = "please write your first name here";
      setError(erros);
      return false;
    }
    if (!formData.lastName) {
      erros.lastName = "please write your last name here";
      setError(erros);
      return false;
    }
    const validEmail = (emailAddress) => {
      return !emailAddress.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
      );
    };
    if (validEmail(formData.emailAddress)) {
      erros.emailAddress = "please write your valid email here";
      setError(erros);
      return false;
    }
    const validNumber = (contactNumber) => {
      return !contactNumber.match(
        /(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})/
      );
    };
    if (
      validNumber(formData.contactNumber) ||
      formData.contactNumber.length > 10
    ) {
      erros.contactNumber = "please write your contact number here";
      setError(erros);
      return false;
    }
    if (!formData.gender) {
      erros.gender = "please select valid genders";
      setError(erros);
      return false;
    }
    if (
      formData.language.english === false &&
      formData.language.hindi === false &&
      formData.language.gujarati === false
    ) {
      erros.language = " please select valid languages";
      setError(erros);
      return false;
    }
    setError(erros);
    return true;
  };
  // handle events
  const handleInputs = (e) => {
    let { name, checked, type, id } = e.target;
    let value = type === "checkbox" ? checked : e.target.value;
    if (id === "language") {
      setFormdata({
        ...formData,
        language: {
          ...formData.language,
          [name]: value,
        },
      });
    } else {
      setFormdata({
        ...formData,
        [name]: value,
      });
    }
  };

  let storeData = () => {
    const data = [];
    const result = data.concat(localStorageData || [], formData);
    localStorage.setItem("saveData", JSON.stringify(result));
  };

  function clearForm() {
    setFormdata({
      id: time,
      firstName: "",
      lastName: "",
      emailAddress: "",
      contactNumber: "",
      gender: "",
      language: {
        english: false,
        hindi: false,
        gujarati: false,
      },
      aboutProject: "",
    });
  }

  useEffect(() => {
    if (localStorageData) {
      setStoredata(localStorageData);
    } else {
      setStoredata([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteData = (id) => {
    const filterdata = storedata.filter((elements) => {
      return elements.id !== id;
    });
    setStoredata(filterdata);
    localStorage.setItem("saveData", JSON.stringify(filterdata));
  };

  const editData = (id) => {
    const finddata = storedata.find((elements) => {
      return elements.id === id;
    });
    console.log(finddata);
    setFormdata({
      id: finddata.id,
      firstName: finddata.firstName,
      lastName: finddata.lastName,
      emailAddress: finddata.emailAddress,
      contactNumber: finddata.contactNumber,
      gender: finddata.gender,
      language: {
        english: finddata.language.english,
        hindi: finddata.language.hindi,
        gujarati: finddata.language.gujarati,
      },
      aboutProject: finddata.aboutProject,
    });
  };
  // another method for update

  // const updateData = (id) => {
  //   const index = localStorageData.findIndex((elements) => {
  //     return elements.id === id;
  //   });
  //   localStorageData[index] = { ...localStorageData[index], ...formData };
  //   localStorage.setItem("saveData", JSON.stringify(localStorageData));
  // };

  const handleSubmit = (e) => {
    const index = storedata.find((elements) => {
      return elements.id === formData.id;
    });
    e.preventDefault();
    if (validate()) {
      if (index === undefined) {
        console.log("__store");
        storeData();
      } else {
        console.log("__update");
        let updatevalue = storedata.map((item) =>
          item.id === formData.id ? formData : item
        );
        localStorage.setItem("saveData", JSON.stringify(updatevalue));
      }

      e.target.reset();
      clearForm();
    } else {
      console.log("not__validate", formData);
    }
  };
  // console.log("__phone", phone);
  return (
    <div className="row">
      <div className="column">
        <form
          className="left-form"
          name="Myform"
          id="Myform"
          onSubmit={handleSubmit}
          method="post"
        >
          <h1 className="title">Lets Talk About Business</h1>
          <p className="para main">Fields marked with * are mandatory</p>
          <div className="inner-form">
            <div className="label">
              <label id="label">First Name*</label>
            </div>
            <input
              type="text"
              className="input"
              id="fname"
              name="firstName"
              value={formData.firstName}
              placeholder="write your first name here eg. Apurv"
              onChange={handleInputs}
            />
            {!error.firstName ? (
              ""
            ) : (
              <p className="para" id="no-valid-fname">
                {error.firstName}
              </p>
            )}
          </div>
          <div className="inner-form">
            <div className="label">
              <label id="label">Last Name*</label>
            </div>
            <input
              type="text"
              className="input"
              id="lname"
              name="lastName"
              value={formData.lastName}
              placeholder="write your Last name here eg. Khalas"
              onChange={handleInputs}
            />
            {!error.lastName ? (
              ""
            ) : (
              <p className="para" id="no-valid-fname">
                {error.lastName}
              </p>
            )}
          </div>
          <div className="inner-form">
            <div className="label">
              <label>Email Address*</label>
            </div>
            <input
              type="email"
              className="input"
              name="emailAddress"
              value={formData.emailAddress}
              id="email"
              placeholder="Email Address eg. apurv@dws.com"
              onChange={handleInputs}
            />
            {!error.emailAddress ? null : (
              <p className="para" id="no-valid-fname">
                {error.emailAddress}
              </p>
            )}
          </div>
          <div className="inner-form">
            <div className="label">
              <label>Contact Number*</label>
            </div>
            <input
              type="number"
              className="input"
              name="contactNumber"
              value={formData.contactNumber}
              id="num"
              placeholder="Contect Number eg. 7685459687"
              onChange={handleInputs}
            />
            {!error.contactNumber ? (
              ""
            ) : (
              <p className="para" id="no-valid-fname">
                {error.contactNumber}
              </p>
            )}
          </div>
          {/* <div className="inner-form">
            <div className="label">
              <label>Select Country</label>
            </div>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div> */}
          <div className="inner-form">
            <div className="label">
              <label>Gender*</label>
            </div>
            <div className="select">
              <input
                type="radio"
                id="male"
                name="gender"
                checked={formData.gender === "Male" ? true : false}
                defaultValue="Male"
                onChange={handleInputs}
              />
              Male
              <input
                type="radio"
                name="gender"
                id="female"
                checked={formData.gender === "Female" ? true : false}
                defaultValue="Female"
                onChange={handleInputs}
              />
              Female
            </div>
            {!error.gender ? (
              ""
            ) : (
              <p className="para" id="no-valid-fname">
                {error.gender}
              </p>
            )}
          </div>
          <div className="inner-form">
            <div className="label">
              <label>Luaguages you know*</label>
            </div>
            <div className="select">
              <input
                type="checkbox"
                name="english"
                id="language"
                checked={formData.language.english}
                onChange={handleInputs}
              />
              English
              <input
                type="checkbox"
                name="hindi"
                id="language"
                checked={formData.language.hindi}
                onChange={handleInputs}
              />
              Hindi
              <input
                type="checkbox"
                name="gujarati"
                id="language"
                checked={formData.language.gujarati}
                onChange={handleInputs}
              />
              Gujarati
            </div>
            {!error.language ? (
              ""
            ) : (
              <p className="para" id="no-valid-fname">
                {error.language}
              </p>
            )}
          </div>
          <textarea
            className="rbox"
            name="aboutProject"
            id="txt"
            value={formData.aboutProject}
            placeholder="Brief about the project"
            onChange={handleInputs}
          />
          <br />
          <br />
          <button type="sumbit" className="submit inner" value="submit">
            Submit
          </button>
        </form>
      </div>
      <Rightform
        deleteData={deleteData}
        editData={editData}
        storedata={storedata}
      />
    </div>
  );
}
// storeData();
