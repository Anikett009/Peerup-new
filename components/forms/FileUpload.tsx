// components/forms/FileUpload.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

const FileUpload = () => {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('/api/docupload/document', {
        params: { userId: user.id }
      });
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.id);

    setUploading(true);
    try {
      const response = await axios.post('/api/docupload/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFiles(prevFiles => [...prevFiles, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setUploading(false);
  };

  const handleOpen = (file) => {
    window.open(`/api/docupload/document?id=${file._id}`, '_blank');
  };

  const handleDelete = async (file) => {
    try {
      await axios.delete(`/api/docupload/document?id=${file._id}`);
      setFiles(prevFiles => prevFiles.filter(f => f._id !== file._id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="mt-10">
      <input 
        type="file" 
        onChange={handleUpload} 
        disabled={uploading}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {uploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
      <ul className="mt-6 space-y-3">
        {files.map(file => (
          <li key={file._id} className="flex items-center justify-between p-3 bg-white shadow rounded-lg">
            <span className="text-sm font-medium text-gray-900">{file.originalName}</span>
            <div>
              <button 
                onClick={() => handleOpen(file)}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              >
                Open
              </button>
              <button 
                onClick={() => handleDelete(file)}
                className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;