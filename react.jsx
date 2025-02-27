import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Card, CardContent, Input } from "@/components/ui";
import { Upload } from "lucide-react";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-bold text-center">Smart Medicine Disposal</h2>
        <p className="text-gray-600 text-center">Scan your medicine and get proper disposal recommendations.</p>
        <div className="mt-4 flex flex-col items-center">
          <Input type="file" className="mb-4" />
          <Button className="flex items-center gap-2">
            <Upload size={16} /> Upload & Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

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
