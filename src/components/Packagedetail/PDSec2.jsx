import { useEffect, useRef, useState } from "react";
import "./pd.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { Endpoints } from "../../services/api";
import ShowHotels from "../ShowHotels";
import toast from "react-hot-toast";

function PDSec2({ contactRef , data, isInView2 }) {


  const [isInView, setIsInView] = useState(false);
  const [isInView3, setIsInView3] = useState(false);
  const sectionRef = useRef(null);
  const sectionRef2 = useRef(null);
  const [disable , setDisable] = useState(false);
    const [allHotels, setAllHotels] = useState([]);


  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    nb_trav: "",
    mobile: "",
    dates: "",
    dur: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));
  };

  const fetchHotelsHandler = async () => {
    try {
      const resp = await axios.get(
        Endpoints.GET_HOTEL_BY_CITY + `/${data?.cityId}`
      );

      if (resp?.data) {
        setAllHotels(resp?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.cityId) {
      fetchHotelsHandler();
    }
  }, [data]);

  return (
    <>
      <div ref={contactRef} className="pdSec2wrap ">
        {/* left side */}
        <div className="pdSec2left">
     

          <h2> {data?.title}</h2>


          <div className="flex justify-between gap-2 items-center px-2">
           <p>{data?.description}</p>
            <p className="pdsltf mt-2">{data?.duration}</p>
          </div>

    
          <p className="line2"></p>

              <ShowHotels  allHotels={allHotels} />


        </div>

        {/* right side  */}
        <div className="pdSec2Right">

          <div ref={sectionRef2} className="sec2ritop">
            <div className="s2ttop">
              {/* left  */}

              <div className="pds2left">
                <p className="pdlepar1">
                  <div>INR</div> <p> {data?.price}</p>
                </p>
              </div>
            </div>

            <p className="line1"></p>
          </div>

          <div
            className={`formdetail ${
              isInView && !isInView2 && !isInView3 ? "fixed-position" : ""
            }`}
          >
            <h3> Contact Us Now!</h3>

            <form onSubmit={(e)=>{
              e.preventDefault();
              
              const toastId = toast.loading("Loading...");
              setDisable(true);
               setTimeout(()=>{
                 toast.success("Our team will Contact You soon");
                 toast.dismiss(toastId)
                 setDisable(false);
               },[2000])
            }}>
              <label>
                <p>
                  Full Name <span>*</span>
                </p>
                <input
                  type="text"
                  name="from_name"
                  value={formData?.from_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                <p>
                  Email <span>*</span>
                </p>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                />
              </label>


              <PhoneInput
                country={"in"}
                value={formData.mobile}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "mobile",
                  required: true,
                  autoFocus: true,
                }}
                inputClass="myphone"
              />

              <div className="dohalf">
                <input
                  type="text"
                  placeholder="Travel Date"
                  className="Traveldate"
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  className="Duration"
                  name="dur"
                  value={formData.dur}
                  onChange={handleChange}
                />
              </div>

              <textarea
                className="textaremesge"
                placeholder="Message..."
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button disabled={disable} type="submit" className="requeeqebtn">
                <span>Contact Us</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}

export default PDSec2;
