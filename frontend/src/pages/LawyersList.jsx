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
import {data} from "../data.js"
import "../App.css";



const LawyersList = () => {
  const [dataList, setDataList] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/lawyer/get_lawyers/",
      );
      // setDataList(response.data.lawyers_list)
      setDataList(data)
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

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-5 flex flex-col md:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, expertise..."
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none"
                />
              </div>

              <GrayButton title="Filters">
                <Filter className="w-4 h-4 mr-2" />
              </GrayButton>

              <YellowButton title="Search" />
            </motion.div>
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
                  <Card className="bg-white/5 border border-white/10  hover:border-amber-400 hover:-translate-y-2  rounded-3xl overflow-hidden hover:scale-105 transition duration-300">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={item.image}
                      alt={item.name}
                      className="h-72 w-full object-cover"
                    />

                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl  text-gray-100 font-bold">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-500">{item.role}</p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            item.status === "Verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 text-gray-900">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <YellowButton className="w-full" title="Contact" />

                        <GrayButton title="Send Mail">
                          <Mail className="w-4 h-4" />
                        </GrayButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* <section className="max-w-7xl mx-auto px-6 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-linear-to-r from-amber-400 to-orange-500 p-10 text-black flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Need custom recommendation?
                </h2>

                <p className="text-black/80">
                  Our AI engine finds the best lawyer based on your case.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <YellowButton
                  className="bg-black text-white hover:bg-slate-800"
                  title="Start AI Match"
                />
              </motion.div>
            </motion.div>
          </section> */}

          <Footer />
        </div>
      )}
    </>
  );
};

export default LawyersList;
