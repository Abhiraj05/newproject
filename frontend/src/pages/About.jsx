import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Shield,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import Card from "../components/cards/Card";
import CardContent from "../components/cards/CardContent";
import Loader from "../components/others/Loader";
import Footer from "../components/others/Footer";
import NavBar from "../components/others/NavBar";

const values = [
  {
    title: "Integrity",
    desc: "Built on privacy, discretion and trusted client confidentiality.",
    icon: Shield,
  },
  {
    title: "Innovation",
    desc: "Modern AI systems designed for advanced legal reasoning.",
    icon: Sparkles,
  },
  {
    title: "Accuracy",
    desc: "Every insight is structured for reliability and precision.",
    icon: BadgeCheck,
  },
];

const About = () => {
  const navigate = useNavigate();
  const [showLoader, setLoader] = useState(false);

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
          <NavBar navigate={redirect} />

          <main className="max-w-5xl mx-auto px-6 py-24 space-y-28">

            
            <section className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-5"
              >
                Our Legacy
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              >
                The Silent Partner in Modern Jurisprudence
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg max-w-2xl mx-auto italic"
              >
                Bridging traditional law with the speed and precision of
                artificial intelligence.
              </motion.p>
            </section>

        
            <section>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-0.5 bg-amber-400 mb-8"
              />

              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-10"
              >
                Our Story
              </motion.h2>

              <div className="space-y-8 text-slate-400 text-lg leading-8">
                {[
                  "Law Mate was built on one belief — modern legal challenges need smarter tools. Traditional research and document review can no longer keep pace with today’s volume and complexity.",
                  "We saw legal professionals spending countless hours reviewing documents, validating clauses and analyzing risk. AI should not replace lawyers — it should empower them.",
                  "Today, Law Mate helps firms move faster, work smarter and act with confidence through trusted legal intelligence.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </section>

   
            <section>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-center mb-14"
              >
                Foundational Principles
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-white/5 border border-white/10 rounded-3xl hover:border-amber-400 hover:-translate-y-2 transition duration-300">
                        <CardContent className="p-8">
                          <Icon className="w-10 h-10 text-amber-400 mb-6" />

                          <h3 className="text-2xl font-bold mb-4 text-white">
                            {item.title}
                          </h3>

                          <p className="text-slate-400 leading-7">
                            {item.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="border-y border-white/10 py-16 text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-3xl italic text-slate-300 max-w-3xl mx-auto"
              >
                “Authority is not granted; it is built through consistent,
                reliable intelligence.”
              </motion.p>
            </section>

          </main>

          <Footer />
        </div>
      )}
    </>
  );
};

export default About;