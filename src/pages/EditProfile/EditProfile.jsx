import React, { useState, useEffect } from 'react';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    profilePicture: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/current', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (result.success) {
          const { userName, email, phone, profilePicture } = result.user;
          setFormData({ userName, email, phone, profilePicture });
          
          if (profilePicture) {
            setPreviewImage(`/profile_pictures/${profilePicture}`);
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profilePicture: file }));
    
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      let profilePictureName = formData.profilePicture;

      if (formData.profilePicture instanceof File) {
        const pictureFormData = new FormData();
        pictureFormData.append('profilePicture', formData.profilePicture);
        
        const uploadResponse = await fetch('/api/user/profile_picture', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: pictureFormData
        });
        
        const uploadResult = await uploadResponse.json();
        profilePictureName = uploadResult.profilePicture;
      }

      const updateData = {
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        profilePicture: profilePictureName
      };

      const updateResponse = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const updateResult = await updateResponse.json();
      alert(updateResult.message || 'Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Profile update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {previewImage && (
          <div className="mb-4 flex justify-center">
            <img 
              src={previewImage} 
              alt="Profile Preview" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        
        <div className="mb-4">
          <label className="block mb-2">Profile Picture</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter phone number"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;