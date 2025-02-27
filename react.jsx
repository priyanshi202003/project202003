import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Card, CardContent, Input } from "@/components/ui";
import { Upload } from "lucide-react";

const Home = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/api/disposal/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-bold text-center">Smart Medicine Disposal</h2>
          <p className="text-gray-600 text-center">Scan your medicine and get disposal recommendations.</p>
          <div className="mt-4 flex flex-col items-center">
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
            <Button onClick={handleFileUpload} className="flex items-center gap-2">
              <Upload size={16} /> Upload & Scan
            </Button>
            {result && <p className="mt-4 text-lg font-bold">Disposal Method: {result.method}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
