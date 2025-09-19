// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import { getUserProfile, updateUserProfile } from "../api/profile";

const Profile = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const skillsOptions = [
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Web Development", label: "Web Development" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "AWS", label: "AWS" },
  ];

  const interestsOptions = [
    { value: "AI", label: "AI" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Frontend", label: "Frontend" },
    { value: "Cybersecurity", label: "Cybersecurity" },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("User not logged in");
          return;
        }

        const token = await user.getIdToken();
        const data = await getUserProfile(token);
        setUserProfile(data);

        // fill form
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("college", data.college);
        setValue("cgpa", data.cgpa.toString());
        setValue("skills", data.skills.map(s => ({ value: s, label: s })));
        setValue("interests", data.interests.map(i => ({ value: i, label: i })));
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Could not load profile");
      }
    };

    loadProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User not logged in");
        return;
      }

      const token = await user.getIdToken();

      const profileData = {
        name: data.name,
        email: data.email,
        college: data.college,
        cgpa: parseFloat(data.cgpa),
        skills: data.skills ? data.skills.map(item => item.value) : [],
        interests: data.interests ? data.interests.map(item => item.value) : [],
      };

      const result = await updateUserProfile(profileData, token);
      if (result.status === "success") {
        toast.success("Profile updated");
        setIsEditing(false);
        setUserProfile(profileData);
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#01497C] to-[#468FAF] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-[#01497C] flex items-center justify-center text-white text-3xl font-semibold">
              {userProfile ? userProfile.name.slice(0,1).toUpperCase() : "U"}
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[#01497C]">
                {userProfile ? userProfile.name : "Loading..."}
              </h2>
              <p className="text-gray-700">{userProfile ? userProfile.email : ""}</p>
              <p className="text-gray-700">{userProfile ? userProfile.college : ""}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(prev => !prev)}
            className="text-white bg-[#014F86] py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
            type="button"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-[#01497C]">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                disabled={!isEditing}
                defaultValue={userProfile ? userProfile.name : ""}
              />
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-[#01497C]">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                disabled
                defaultValue={userProfile ? userProfile.email : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-[#01497C]">College</label>
              <input
                {...register("college", { required: "College is required" })}
                type="text"
                className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                disabled={!isEditing}
                defaultValue={userProfile ? userProfile.college : ""}
              />
              {errors.college && <p className="text-red-500 text-xs mt-2">{errors.college.message}</p>}
            </div>

            <div>
              <label className="block text-lg font-semibold text-[#01497C]">CGPA</label>
              <input
                {...register("cgpa", { required: "CGPA is required", pattern: /^[0-9.]+$/ })}
                type="text"
                className="w-full p-4 border border-[#2C7DA0] rounded-lg shadow-md focus:ring-2 focus:ring-[#01497C] transition duration-200"
                disabled={!isEditing}
                defaultValue={userProfile ? userProfile.cgpa : ""}
              />
              {errors.cgpa && <p className="text-red-500 text-xs mt-2">{errors.cgpa.message}</p>}
            </div>
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
                  className="w-full"
                  defaultValue={userProfile ? userProfile.skills.map(s => ({ value: s, label: s })) : []}
                  isDisabled={!isEditing}
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
                  className="w-full"
                  defaultValue={userProfile ? userProfile.interests.map(i => ({ value: i, label: i })) : []}
                  isDisabled={!isEditing}
                />
              )}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-[#014F86] text-white py-3 px-8 rounded-full hover:bg-[#01497C] transition duration-300"
              >
                Save
              </button>
            </div>
          )}
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
