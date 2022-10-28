export default function Rightform({ deleteData, editData }) {
  const showData = JSON.parse(localStorage.getItem("saveData"));

  let str = "";
  let str1 = "English";
  let str2 = "Hindi";
  let str3 = "Gujarati";

  function languages(lang) {
    if (lang.english) {
      str = "".concat(str1);
    }
    if (lang.hindi) {
      str = "".concat(str2);
    }
    if (lang.gujarati) {
      str = "".concat(str3);
    }
    if (lang.english && lang.hindi) {
      str = "".concat(str1, " , ", str2);
    }
    if (lang.english && lang.gujarati) {
      str = "".concat(str1, " , ", str3);
    }
    if (lang.hindi && lang.gujarati) {
      str = "".concat(str2, " , ", str3);
    }
    if (lang.english && lang.hindi && lang.gujarati) {
      str = "".concat(str1, " , ", str2, " , ", str3);
    }
    return str;
  }

  return (
    <div className="column">
      {showData.length !== 0 ? (
        <div className="right-form" id="right-form">
          <div id="tst-right" className="tst-right-cls" />
          {showData.map((newdata, index) => {
            return (
              <div className="formdata" id="formdata" key={index}>
                <div className="full-detail">
                  <div className="left-detail">
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">First Name : </label>
                      </div>
                      <p>{newdata.firstName}</p>
                    </div>
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">Last Name: </label>
                      </div>
                      <p>{newdata.lastName}</p>
                    </div>
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">Gender : </label>
                      </div>
                      <p>{newdata.gender}</p>
                    </div>
                  </div>
                  <div className="right-detail">
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">Email Address : </label>
                      </div>
                      <p>{newdata.emailAddress}</p>
                    </div>
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">Contact Number : </label>
                      </div>
                      <p>{newdata.contactNumber}</p>
                    </div>
                    <div className="detail">
                      <div className="input-detail">
                        <label className="label1">Language : </label>
                      </div>
                      <p>{languages(newdata.language)}</p>
                    </div>
                  </div>
                </div>
                {newdata.aboutProject === "" ? null : (
                  <div className="about">
                    <label className="label1">About Project : </label>
                    <div className="msg">{newdata.aboutProject}</div>
                  </div>
                )}
                <div className="btn">
                  <button type="button" onClick={() => editData(newdata.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteData(newdata.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ): (
         null
      )}
    </div>
  );
}
