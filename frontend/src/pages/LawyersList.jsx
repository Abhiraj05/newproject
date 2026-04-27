import { useState } from "react";
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

const lawyers = [
  {
    name: "Julianne Vance",
    role: "Senior Partner, Litigation",
    status: "Verified",
    tags: ["Corporate Law", "M&A", "Risk Mitigation"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "Marcus Thorne",
    role: "IP Specialist",
    status: "Review",
    tags: ["IP Rights", "Patent Law", "Tech Compliance"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Sarah Chen",
    role: "Global Compliance Lead",
    status: "Verified",
    tags: ["Data Privacy", "EU Regulation", "Fintech"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    name: "Daniel Reyes",
    role: "Criminal Defense Attorney",
    status: "Verified",
    tags: ["Criminal Law", "Trial Defense", "Appeals"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Priya Kapoor",
    role: "Family Law Specialist",
    status: "Verified",
    tags: ["Divorce", "Child Custody", "Mediation"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    name: "Liam O’Connor",
    role: "Real Estate Lawyer",
    status: "Review",
    tags: ["Property Law", "Leasing", "Land Disputes"],
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
  },
  {
    name: "Aisha Hassan",
    role: "Immigration Attorney",
    status: "Verified",
    tags: ["Visa Law", "Asylum", "Citizenship"],
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    name: "Ethan Brooks",
    role: "Tax Consultant",
    status: "Review",
    tags: ["Tax Law", "Corporate Tax", "IRS Disputes"],
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    name: "Mei Lin Zhang",
    role: "Environmental Law Expert",
    status: "Verified",
    tags: ["Environmental Policy", "Sustainability", "Regulation"],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  },
];

const LawyersList = () => {
  const [dataList, setDataList] = useState(lawyers);
  const [showLoader, setLoader] = useState(false);
  const navigate = useNavigate();

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
        <div className="min-h-screen bg-slate-950 text-white">
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
                  <Card className="bg-white text-slate-900 rounded-3xl overflow-hidden hover:scale-105 transition duration-300">
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
                          <h3 className="text-2xl font-bold">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {item.role}
                          </p>
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

                      <div className="flex flex-wrap gap-2 mb-6">
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
                        <YellowButton
                          className="w-full"
                          title="Contact"
                        />

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

        
          <section className="max-w-7xl mx-auto px-6 pb-24">
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
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default LawyersList;