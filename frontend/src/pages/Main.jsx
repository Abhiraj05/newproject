import { useState } from "react";
import { motion } from "motion/react";
import YellowButton from "../components/buttons/YellowButton";
import GrayButton from "../components/buttons/GrayButton";
import Card from "../components/cards/Card";
import CardContent from "../components/cards/CardContent";
import Navbar from "../components/others/NavBar";
import Footer from "../components/others/Footer";
import Loader from "../components/others/Loader";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, FileText, ArrowRight, CheckCircle2 } from "lucide-react";

const Main = () => {
  const navigate = useNavigate();
  const [showLoader, setLoader] = useState(false);

  const redirect = (url) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(url);
    }, 1500);
  };

  const features = [
    {
      title: "Deep Case Analysis",
      desc: "Find precedents, risks, and opportunities instantly with AI-powered legal research.",
      icon: ShieldCheck,
    },
    {
      title: "Contract Review",
      desc: "Review long agreements in seconds and flag risky clauses automatically.",
      icon: FileText,
    },
    {
      title: "Compliance Research",
      desc: "Stay current with regulations across multiple jurisdictions.",
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      {showLoader && <Loader />}

      {!showLoader && (
        <div className="min-h-screen bg-linear-to-l from-slate-950 via-slate-900 to-slate-950 text-white">
          <Navbar navigate={redirect} />

          <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 text-sm mb-6">
                AI Legal Intelligence
              </span>
              <h1
                className="font-[Inter] text-5xl md:text-7xl font-extrabold leading-tight
                bg-linear-to-r from-gray-300 via-purple-300 to-amber-200
                bg-clip-text text-transparent"
              >
                Your Intelligent Legal Partner
              </h1>
              <p className="mt-6 font-[Inter] text-slate-300 text-lg max-w-xl">
                Modern legal workflows need speed, precision, and trust. Get
                research, drafting, and case insights in one premium workspace.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a onClick={() => redirect("/signup")}>
                  <YellowButton
                    size="lg"
                    className="rounded-full px-8"
                    title="Get Started"
                  >
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </YellowButton>
                </a>

                <a onClick={() => redirect("/chat")}>
                  <GrayButton
                    size="lg"
                    className="rounded-full text-black"
                    title="Chat Now"
                  />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Card className="bg-white/5 border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <motion.div
                    className="relative h-56 rounded-2xl overflow-hidden"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000"
                      alt="Lawyer"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent"></div>

                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-xl font-semibold font-[Inter]">
                        Trusted Legal AI
                      </p>
                      <p className="text-slate-300 text-sm font-[Inter]">
                        Smart Research & Case Analysis
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      className="p-4 rounded-2xl bg-white/5"
                    >
                      <p className="text-3xl font-bold font-[Inter]">99.8%</p>
                      <p className="text-sm text-slate-400 font-[Inter]">
                        Accuracy
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      className="p-4 rounded-2xl bg-white/5"
                    >
                      <p className="text-3xl font-bold">14x</p>
                      <p className="text-sm text-slate-400">Faster Research</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white/5 border border-white/10  hover:border-amber-400 hover:-translate-y-2 duration-300 rounded-3xl hover:scale-105 transition">
                      <CardContent className="p-8">
                        <Icon className="w-10 h-10 text-amber-500 mb-5" />
                        <h3 className="text-2xl font-[Inter] text-gray-100 font-semibold mb-3">
                          {f.title}
                        </h3>
                        <p className="text-slate-500 font-[Inter]">{f.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-linear-to-r from-amber-400 to-orange-500 p-12 text-slate-950 text-center"
            >
              <h2 className="text-4xl font-bold font-[Inter]">
                Ready to upgrade your legal workflow?
              </h2>

              <p className="mt-4 mb-5 text-lg font-[Inter]">
                Trusted by modern firms and in-house teams.
              </p>

              <a onClick={() => redirect("/signup")}>
                <GrayButton
                  className="mt-8 rounded-full bg-slate-950 text-white hover:bg-slate-800"
                  title="Register Now"
                />
              </a>
            </motion.div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Main;
