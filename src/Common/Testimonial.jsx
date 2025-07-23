import "./navbar.css";
import profile from "../assets/google.jpeg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TESTIMONIAL = [
  // Manali (cityId: 1)
  {
    cityId: 1,
    review:
      "Our Manali adventure was thrilling! Paragliding and the apple orchard stay were beautiful. Smooth bookings too.",
    name: "Ananya Mehra",
  },
  {
    cityId: 1,
    review:
      "We had the best snow fun and nature retreat in Manali. The team arranged everything perfectly.",
    name: "Vikas Rawat",
  },
  {
    cityId: 1,
    review:
      "Loved our Manali photography tour! The guides were helpful and the stay was super comfy.",
    name: "Pooja Singh",
  },

  // Goa (cityId: 2)
  {
    cityId: 2,
    review:
      "Goa beach holiday and island hopping were amazing. Great stays and super service!",
    name: "Rajat Sharma",
  },
  {
    cityId: 2,
    review:
      "We booked a Goa carnival trip — best time ever! Fun, safe and all planned well.",
    name: "Deepika Nair",
  },
  {
    cityId: 2,
    review:
      "Our Goa romantic escape was dreamy — private dinners and spa days. Highly recommended!",
    name: "Anil Menon",
  },

  // Jaipur (cityId: 3)
  {
    cityId: 3,
    review:
      "Our Jaipur royal palace stay was beautiful! Loved the camel safari too. Great support from the team.",
    name: "Priya Sinha",
  },
  {
    cityId: 3,
    review:
      "The Jaipur heritage tour and food trip were top notch. We explored so much in two days.",
    name: "Rohit Agarwal",
  },
  {
    cityId: 3,
    review:
      "Shopping in Jaipur's local markets was fun! Good guides and easy bookings.",
    name: "Komal Jain",
  },

  // Delhi (cityId: 4)
  {
    cityId: 4,
    review:
      "The Delhi monuments tour was great! We loved the evening heritage walk and the food trail too.",
    name: "Amit Verma",
  },
  {
    cityId: 4,
    review:
      "Delhi shopping spree and museum crawl were very interesting. The team made it hassle-free.",
    name: "Surbhi Khanna",
  },
  {
    cityId: 4,
    review:
      "A perfect cultural walk in Delhi — covered markets, street food and famous sites.",
    name: "Nikhil Sharma",
  },

  // Shimla (cityId: 5)
  {
    cityId: 5,
    review:
      "Our Shimla honeymoon and toy train ride were so romantic! Loved the snowy weekend too.",
    name: "Sneha Kapoor",
  },
  {
    cityId: 5,
    review:
      "Shimla campfire nights and village tour were the best part of our trip. Highly organized.",
    name: "Karan Thakur",
  },
  {
    cityId: 5,
    review:
      "We enjoyed our family trip to Shimla — snowfall, cottages and great food!",
    name: "Neha Joshi",
  },
];


function Testimonial({state}) {

  const [reivews , setReviews] = useState([]);

  const slideInAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  useEffect(()=>{

    if(state.cityId){
        const filter = TESTIMONIAL.filter((test)=> test.cityId === state.cityId);
        setReviews(filter);
    }

  },[state])

  return (
    <div className="testiwrap">
      <div className="testiCont">
        <div className="testtop">
          <p className="testitag">Reviews of Trips</p>
          <h2>What Our Travellers Say</h2>
        </div>

        <div className="testiGrid">
          {reivews.map((item, index) => (
            <motion.div
              className="singletebox"
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInAnimation}
              whileHover={{
                y: -8,
                boxShadow: "0px 12px 20px -4px rgba(0, 0, 0, 0.15)",
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <p className="estipara">“{item.review}”</p>
              <div className="profildea">
                <img src={profile} alt="Profile" />
                <div className="profc">
                  <p className="namep">{item.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
