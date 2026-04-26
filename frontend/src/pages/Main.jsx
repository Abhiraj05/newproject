import React from "react";
import {
  ShieldCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Mail,
  Share2
} from "lucide-react";
import YellowButton from "../components/buttons/YellowButton";
import GrayButton from "../components/buttons/GrayButton";
import Card from "../components/cards/Card";
import CardContent from "../components/cards/CardContent";
import Navbar from "../components/NavBar";

const Main = () => {
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
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar></Navbar>
        <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 text-sm mb-6">
              AI Legal Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Your Intelligent Legal Partner
            </h1>
            <p className="mt-6 text-slate-300 text-lg max-w-xl">
              Modern legal workflows need speed, precision, and trust. Get
              research, drafting, and case insights in one premium workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <YellowButton
                size="lg"
                className="rounded-full px-8"
                title={"Get Started"}
              >
                {" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </YellowButton>
              <GrayButton
                size="lg"
                variant="outline"
                className="rounded-full text-black"
                title={"View Demo"}
              ></GrayButton>
            </div>
          </div>
          <div>
            <Card className="bg-white/5 border-white/10 rounded-3xl shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="h-56 rounded-2xl bg-linear-to-br from-amber-400/30 to-indigo-500/20" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-3xl font-bold">99.8%</p>
                    <p className="text-sm text-slate-400">Accuracy</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-3xl font-bold">14x</p>
                    <p className="text-sm text-slate-400">Faster Research</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={i}
                  className="bg-white text-slate-900 rounded-3xl border-0"
                >
                  <CardContent className="p-8">
                    <Icon className="w-10 h-10 text-amber-500 mb-5" />
                    <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
                    <p className="text-slate-600">{f.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="rounded-3xl bg-linear-to-r from-amber-400 to-orange-500 p-12 text-slate-950 text-center">
            <h2 className="text-4xl font-bold">
              Ready to upgrade your legal workflow?
            </h2>
            <p className="mt-4 mb-5 text-lg">
              Trusted by modern firms and in-house teams.
            </p>
            <GrayButton
              className="mt-8 rounded-full bg-slate-950 text-white hover:bg-slate-800"
              title={"Start Free Trial"}
            ></GrayButton>
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-slate-400">
            <p>© 2026 Lexis Counsel. All rights reserved.</p>
            <div className="flex gap-4">
              <Mail />
              <Share2 />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Main;
