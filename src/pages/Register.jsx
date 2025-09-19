import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserProfile } from "../api/profile";

const Register = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [progress, setProgress] = useState(0);

  const skillsOptions = [
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Web Development", label: "Web Development" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "AWS", label: "AWS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "SQL", label: "SQL" },
    { value: "NoSQL", label: "NoSQL" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "Android", label: "Android Development" },
    { value: "iOS", label: "iOS Development" },
    { value: "Flutter", label: "Flutter" },
    { value: "Docker", label: "Docker" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "DevOps", label: "DevOps" },
  ];

  const interestsOptions = [
    { value: "AI", label: "Artificial Intelligence" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Frontend", label: "Frontend Development" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Mobile Development", label: "Mobile App Development" },
    { value: "Game Development", label: "Game Development" },
    { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Product Management", label: "Product Management" },
    { value: "Research", label: "Research & Development" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Startups", label: "Startups" },
    { value: "Tech Blogging", label: "Tech Blogging" },
    { value: "Robotics", label: "Robotics" },
    { value: "IoT", label: "Internet of Things" },
    { value: "Sustainability", label: "Sustainability" },
  ];

  const cgpaOptions = [
    { value: "10", label: "Out of 10" },
    { value: "5", label: "Out of 5" },
    { value: "4", label: "Out of 4" },
    { value: "7", label: "Out of 7" },
    { value: "100", label: "Percentage (Out of 100)" },
  ];

  const onSubmit = async (data) => {
    try {
      // 1. Sign up user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // 2. Get token
      const token = await user.getIdToken();

      // 3. Prepare profile data
      const skillsArr = data.skills ? data.skills.map(item => item.value) : [];
      const interestsArr = data.interests ? data.interests.map(item => item.value) : [];

      const profileData = {
        name: data.name,
        email: data.email,
        college: data.college,
        cgpa: parseFloat(data.cgpa),
        skills: skillsArr,
        interests: interestsArr,
      };

      // 4. Call backend
      const result = await createUserProfile(profileData, token);
      if (result.status === "success") {
        toast.success("Registration Successful!");
        // Optionally navigate to profile
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error in registration:", err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleSectionChange = (section) => {
    let sectionProgress = 0;
    switch (section) {
      case 'basicInfo':
        sectionProgress = 25;
        break;
      case 'skills':
        sectionProgress = 50;
        break;
      case 'interests':
        sectionProgress = 75;
        break;
      case 'submit':
        sectionProgress = 100;
        break;
      default:
        sectionProgress = 0;
    }
    setProgress(sectionProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#01497C] to-[#468FAF] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-[#01497C] flex items-center justify-center text-white text-3xl font-semibold">
              R
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[#01497C]">Register</h2>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-[#00B4D8] to-[#01497C] rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between items-center" style={{ height: '100%' }}>
            <div className={`w-6 h-6 rounded-full ${progress >= 25 ? "bg-[#01497C]" : "bg-gray-300"} transition duration-200`} />
            <div className={`w-6 h-6 rounded-full ${progress >= 50 ? "bg-[#01497C]" : "bg-gray-300"} transition duration-200`} />
            <div className={`w-6 h-6 rounded-full ${progress >= 75 ? "bg-[#01497C]" : "bg-gray-300"} transition duration-200`} />
            <div className={`w-6 h-6 rounded-full ${progress >= 100 ? "bg-[#01497C]" : "bg-gray-300"} transition duration-200`} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
              placeholder="Enter your full name"
              onChange={() => handleSectionChange('basicInfo')}
            />
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Email</label>
            <input
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              type="email"
              className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
              placeholder="your@example.com"
              onChange={() => handleSectionChange('basicInfo')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: 6 })}
              type="password"
              className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
              placeholder="Enter your password"
              onChange={() => handleSectionChange('basicInfo')}
            />
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">College</label>
            <input
              {...register("college", { required: "College is required" })}
              type="text"
              className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
              placeholder="Enter your college"
              onChange={() => handleSectionChange('basicInfo')}
            />
            {errors.college && <p className="text-red-500 text-xs mt-2">{errors.college.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">CGPA</label>
            <input
              {...register("cgpa", { required: "CGPA is required", pattern: /^[0-9.]+$/ })}
              type="text"
              className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
              placeholder="Enter CGPA"
              onChange={() => handleSectionChange('skills')}
            />
            {errors.cgpa && <p className="text-red-500 text-xs mt-2">{errors.cgpa.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">CGPA Scale</label>
            <Controller
              name="cgpaScale"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cgpaOptions}
                  placeholder="Select scale"
                  className="w-full"
                  onChange={() => handleSectionChange('skills')}
                />
              )}
            />
            {errors.cgpaScale && <p className="text-red-500 text-xs mt-2">{errors.cgpaScale.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Skills</label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  {...field}
                  options={skillsOptions}
                  placeholder="Select your skills"
                  className="w-full"
                  onChange={() => handleSectionChange('interests')}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#01497C]">Interests</label>
            <Controller
              name="interests"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  {...field}
                  options={interestsOptions}
                  placeholder="Select your interests"
                  className="w-full"
                  onChange={() => handleSectionChange('submit')}
                />
              )}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#014F86] text-white py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { auth } from "../firebase";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// import { createUserProfile } from "../api/profile";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const { register, handleSubmit, control, formState: { errors } } = useForm();
//   const [progress, setProgress] = useState(0);
//   const navigate = useNavigate();

//   const skillsOptions = [
//     { value: "React", label: "React" },
//     { value: "Python", label: "Python" },
//     { value: "Machine Learning", label: "Machine Learning" },
//     { value: "Web Development", label: "Web Development" },
//     { value: "Node.js", label: "Node.js" },
//     { value: "Django", label: "Django" },
//     { value: "AWS", label: "AWS" },
//   ];

//   const interestsOptions = [
//     { value: "AI", label: "AI" },
//     { value: "Blockchain", label: "Blockchain" },
//     { value: "Frontend", label: "Frontend" },
//     { value: "Cybersecurity", label: "Cybersecurity" },
//   ];

//   const onSubmit = async (data) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//       const user = userCredential.user;
//       const token = await user.getIdToken();

//       const profileData = {
//         name: data.name,
//         email: data.email,
//         college: data.college,
//         cgpa: parseFloat(data.cgpa),
//         skills: data.skills ? data.skills.map(item => item.value) : [],
//         interests: data.interests ? data.interests.map(item => item.value) : [],
//       };

//       const result = await createUserProfile(profileData, token);
//       if (result.status === "success") {
//         toast.success("Registration Successful!");
//         setTimeout(() => navigate("/profile"), 1500);
//       } else {
//         toast.error(result.message || "Registration failed");
//       }
//     } catch (err) {
//       console.error("Error in registration:", err);
//       toast.error(err.message || "Registration failed");
//     }
//   };

//   const handleSectionChange = (section) => {
//     const sectionProgress = {
//       basicInfo: 25,
//       skills: 50,
//       interests: 75,
//       submit: 100
//     }[section] || 0;
//     setProgress(sectionProgress);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#01497C] to-[#468FAF] py-12 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10">
//         <h2 className="text-3xl font-semibold text-[#01497C] mb-8">Register</h2>

//         {/* Progress Bar */}
//         <div className="relative mb-6">
//           <div className="w-full h-2 bg-gray-300 rounded-full">
//             <div
//               className="h-2 bg-gradient-to-r from-[#00B4D8] to-[#01497C] rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">Name</label>
//             <input
//               {...register("name", { required: "Name is required" })}
//               type="text"
//               className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C]"
//               placeholder="Enter your full name"
//               onChange={() => handleSectionChange("basicInfo")}
//             />
//             {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">Email</label>
//             <input
//               {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
//               type="email"
//               className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C]"
//               placeholder="your@example.com"
//               onChange={() => handleSectionChange("basicInfo")}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">Password</label>
//             <input
//               {...register("password", { required: "Password is required", minLength: 6 })}
//               type="password"
//               className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C]"
//               placeholder="Enter your password"
//               onChange={() => handleSectionChange("basicInfo")}
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">College</label>
//             <input
//               {...register("college", { required: "College is required" })}
//               type="text"
//               className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C]"
//               placeholder="Enter your college"
//               onChange={() => handleSectionChange("basicInfo")}
//             />
//             {errors.college && <p className="text-red-500 text-xs mt-2">{errors.college.message}</p>}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">CGPA</label>
//             <input
//               {...register("cgpa", { required: "CGPA is required", pattern: /^[0-9.]+$/ })}
//               type="text"
//               className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C]"
//               placeholder="Enter CGPA"
//               onChange={() => handleSectionChange("skills")}
//             />
//             {errors.cgpa && <p className="text-red-500 text-xs mt-2">{errors.cgpa.message}</p>}
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">Skills</label>
//             <Controller
//               name="skills"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   isMulti
//                   {...field}
//                   options={skillsOptions}
//                   className="w-full"
//                   onChange={(value) => { field.onChange(value); handleSectionChange("interests"); }}
//                 />
//               )}
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold text-[#01497C]">Interests</label>
//             <Controller
//               name="interests"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   isMulti
//                   {...field}
//                   options={interestsOptions}
//                   className="w-full"
//                   onChange={(value) => { field.onChange(value); handleSectionChange("submit"); }}
//                 />
//               )}
//             />
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               type="submit"
//               className="bg-[#014F86] text-white py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Register;

// src/pages/Register.jsx

