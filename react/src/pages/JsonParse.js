import { useState, useEffect } from "react";
import "../Styles/Welcome.scss";

export default function JsonParse() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1234/api/json-complex", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  // const unwrap = (obj, prefix) => {
  //   let res = [];
  //   for (let k of Object.keys(obj)) {
  //     let val = obj[k],
  //       key = prefix ? prefix + "." + k : k;
  //     if (typeof val === "object")
  //       Object.assign(res, unwrap(val, key)); // <-- recursion
  //     else res[key] = val;
  //   }
  //   return res;
  // };
  let list = [];
  const handleJson = (obj, index) => {
    index++;
    for(let key in obj) {
      if (typeof obj[key] === 'object') {
        list.push("    ".repeat(index) + key)
        handleJson(obj[key], index)
      }
      else {
        list.push("    ".repeat(index) + key + " " + obj[key])
      }
    }
  }

  handleJson(data, 0);

  return (
    <div className="json-container">
      {/* {data.length > 0 ? 
            <div className="json-ceva">
              <div>{Object.keys(data[0])[0]} : {data[0].arr}</div>
              <div>{Object.keys(data[0])[1]} : {data[0].di}</div>
              <div>{Object.keys(data[0])[2]} : {data[0].e}</div>
              <div>{Object.keys(data[1])[0]} : {data[1][0]}</div>
              <div>{Object.keys(data[1][1])[0]} : {data[1][1].ANDROID_BACKUP}</div>
              <div>{Object.keys(data[1][1])[1]} : {data[1][1].BATTERY_STATS}</div>
              <div>{Object.keys(data[1][1])[2]} : {data[1][1].SMART_SETUP}</div>
              <div>{Object.keys(data[1][1])[3]} : {data[1][1].TRON}</div>
              <div>{Object.keys(data[1][2])} : {data[1][2][175237375]}</div>
            </div>
          
        : ""} */}
        <br />
      <div className="json_ceva">
        <pre>
          {list.map((elem, ndx) => {
            return (
              <div key={`${ndx}-key`}>{elem}</div>
            )
          })}
        </pre>
      </div>
    </div>
  );
}
