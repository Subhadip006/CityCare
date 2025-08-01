import React, { useState, useEffect } from "react";

const OfficerOnboarding = () => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    phone: "",
    sector: "",
  });

  const [idImage, setIdImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImage(file);
      // Create object URL for preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Cleanup the object URL when component unmounts or previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", formData.username);
    form.append("department", formData.department);
    form.append("phone", formData.phone);
    form.append("sector", formData.sector);
    if (idImage) form.append("id_image", idImage);

    try {
      const res = await fetch(`${BASE_URL}officer/onboard/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      alert("Officer onboarded successfully!");

      setFormData({
        username: "",
        department: "",
        phone: "",
        sector: "",
      });
      setIdImage(null);
      setPreviewUrl(null);

      localStorage.setItem("officerId", data.user_id);
      window.location.href = "/officer/dashboard";
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error submitting data: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg p-8 bg-secondaryBackground shadow-2xl rounded-3xl">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-text">
          Officer Onboarding
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {["username", "department", "phone", "sector"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-text mb-1 capitalize">
                {field === "phone" ? "Phone Number" : field}
              </label>
              {field === "department" ? (
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Sanitation">Sanitation</option>
                  <option value="Road">Road</option>
                  <option value="Power">Power</option>
                  <option value="Water">Water Supply</option>
                </select>
              ) : (
                <input
                  type={field === "phone" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder={field === "phone" ? "e.g. 9876543210" : ""}
                  required
                />
              )}
            </div>
          ))}
          <div>
            <label className="block text-sm font-semibold text-text mb-1">
              Upload ID Image
            </label>
            <input
              type="file"
              name="id_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-white border border-secondary rounded-md"
            />
            {previewUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-text mb-1">
                  Preview:
                </label>
                <img
                  src={previewUrl}
                  alt="ID Preview"
                  className="max-h-40 rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition-all duration-300 font-semibold text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfficerOnboarding;
