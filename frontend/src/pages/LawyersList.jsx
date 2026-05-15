import { useEffect, useState } from "react";
import { motion } from "motion/react";
import YellowButton from "../components/buttons/YellowButton";
import GrayButton from "../components/buttons/GrayButton";
import Card from "../components/cards/Card";
import CardContent from "../components/cards/CardContent";
import Navbar from "../components/others/NavBar";
import Footer from "../components/others/Footer";
import Loader from "../components/others/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Mail } from "lucide-react";
import { data } from "../data.js";
import "../App.css";

const LawyersList = () => {
  const [dataList, setDataList] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  // get's lawyers list
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/lawyer/get_lawyers/",
      );
      setDataList(response.data.lawyers_list);
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = (url) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(url);
    }, 1500);
  };

  return (
    <>
      {showLoader && <Loader />}

      {!showLoader && (
        <div className="min-h-screen bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 text-white font-[Inter]">
          <Navbar navigate={redirect} />

          <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Elite Legal Representation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg max-w-2xl mb-10"
            >
              Access our network of trusted advocates for litigation,
              compliance, advisory and business law.
            </motion.p>
          </section>

          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dataList?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 border border-white/10 hover:border-amber-400 hover:-translate-y-2 rounded-3xl overflow-hidden hover:scale-105 transition duration-300">
                    <div className="h-52 bg-linear-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                      <h2 className="text-5xl font-bold text-white">
                        {item.user__name?.charAt(0)}
                      </h2>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl text-gray-100 font-bold">
                            {item.user__name}
                          </h3>

                          <p className="text-sm text-slate-400 capitalize">
                            {item.speciality} Lawyer
                          </p>
                        </div>

                        <span className="text-xs px-3 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                          Verified
                        </span>
                      </div>
                      <div className="space-y-2 mb-5 text-sm text-gray-300">
                        <p>
                          <span className="font-semibold text-white">
                            Experience:
                          </span>{" "}
                          {item.experience} Years
                        </p>

                        <p>
                          <span className="font-semibold text-white">
                            Fees:
                          </span>{" "}
                          ₹{item.fees}
                        </p>

                        <p>
                          <span className="font-semibold text-white">
                            Gender:
                          </span>{" "}
                          {item.user__gender}
                        </p>

                        <p className="line-clamp-2">
                          <span className="font-semibold text-white">
                            Address:
                          </span>{" "}
                          {item.user__address}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs bg-slate-100 text-gray-900 px-3 py-1 rounded-full capitalize">
                          {item.speciality}
                        </span>

                        <span className="text-xs bg-slate-100 text-gray-900 px-3 py-1 rounded-full">
                          {item.experience}+ Years
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <a href={`tel:${item.user__phone_no}`}>
                          <YellowButton title="Contact">
                          </YellowButton>
                        </a>
                        <a href={`mailto:${item.user__email}`}>
                          <GrayButton title="Send Mail">
                            <Mail className="w-4 h-4" />
                          </GrayButton>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
};

export default LawyersList;
