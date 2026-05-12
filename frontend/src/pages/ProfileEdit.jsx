import { useState } from "react";
import Navbar from "../components/others/NavBar";
import Footer from "../components/others/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Scale,
} from "lucide-react";

const ProfileEdit = () => {
  const [showLoader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    gender: "",
    dob: "",
    role: "",
    address: "",
    speciality: "",
    experience: "",
    fees: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!formData.name &&
        !formData.email &&
        !formData.phone_no &&
        !formData.gender &&
        !formData.dob &&
        !formData.role &&
        !formData.address) ||
      (!formData.speciality &&
        !formData.experience &&
        !formData.fees &&
        !formData.password)
    ) {
      alert("please fill the details !");
      return;
    } else {
      try {
        await axios.put(
          "http://127.0.0.1:8000/api/auth/edit_profile/",
          formData,
        );

        setFormData({
          name: "",
          email: "",
          password: "",
          phone_no: "",
          gender: "",
          dob: "",
          role: "",
          address: "",
          speciality: "",
          experience: "",
          fees: "",
        });
        alert("profile updated successfully !");
        return;
      } catch (error) {
        console.log(error);
        alert("failed to updated profile !");
        return;
      }
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
        <div className="min-h-screen bg-slate-950 text-white px-4">
          <Navbar navigate={redirect} />
          <div className="max-w-5xl mx-auto py-16">
            <div className="text-center mb-12">
              <span className="inline-flex px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 text-sm mb-5">
                Profile Settings
              </span>

              <h1 className="text-5xl font-bold">Edit Profile</h1>

              <p className="text-slate-400 mt-4 text-lg">
                Manage your account information and lawyer details.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="flex flex-col items-center mb-12">
                <div className="w-28 h-28 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-slate-950 shadow-lg shadow-amber-500/30">
                  A
                </div>

                <h2 className="text-2xl font-semibold mt-5"></h2>

                <p className="text-slate-400">Lawyer Account</p>
              </div>

              <form
                className="grid md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Date of Birth
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Role
                  </label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="user">User</option>
                    <option value="lawyer">Lawyer</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-300 mb-2">
                    Address
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-5 w-4 h-4 text-slate-400" />

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter your address"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                    ></textarea>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4">
                  <h3 className="text-2xl font-semibold mb-5 flex items-center gap-2">
                    <Scale className="text-amber-400" />
                    Lawyer Details
                  </h3>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Speciality
                  </label>

                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      placeholder="Corporate Law"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full px-5 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Consultation Fees
                  </label>

                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                      placeholder="2500"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-amber-500/20"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="flex-1 py-3 rounded-2xl bg-slate-900 text-white border border-white/10 hover:bg-slate-800 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
