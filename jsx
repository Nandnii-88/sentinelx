// frontend/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import DocShield from './components/DocShield';
import PhishShield from './components/PhishShield';
import FraudDNA from './components/FraudDNA';
import Navbar from './components/Navbar';

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'docshield' && <DocShield />}
        {activePage === 'phishshield' && <PhishShield />}
        {activePage === 'fraud-dna' && <FraudDNA />}
      </main>
    </div>
  );
}

// frontend/app/components/DocShield.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DocShield() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('http://localhost:8000/api/documents/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  const getRiskColor = (level) => {
    if (level === 'HIGH RISK') return 'text-red-600 bg-red-50';
    if (level === 'SUSPICIOUS') return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">DocShield Analyzer</h1>
        <p className="text-gray-600 mt-1">Upload documents for AI-powered fraud detection</p>
        
        <div
          {...getRootProps()}
          className={`mt-6 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
          <p className="text-gray-600">
            {isDragActive ? 'Drop your document here' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</p>
        </div>
        
        {analyzing && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
              <span>Analyzing document...</span>
            </div>
          </div>
        )}
        
        {result && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg border ${getRiskColor(result.risk_level)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{result.filename}</h3>
                  <p className="text-sm mt-1">Processing time: {result.processing_time_ms}ms</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{result.risk_score}</span>
                  <p className="text-sm">{result.risk_level}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Explainable Indicators</h4>
              <ul className="space-y-2">
                {result.indicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm">
                    <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
                    <span>{indicator.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Fraud Fingerprint Generated</h4>
              <p className="text-sm font-mono">{result.fingerprint.doc_hash.substring(0, 32)}...</p>
              <p className="text-sm mt-1">Editor tool: {result.fingerprint.editor_tool}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
