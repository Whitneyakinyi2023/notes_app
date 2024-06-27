import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PDFViewer() {
    const [pdfFile, setPDFFile] = useState(null);
    const [viewPDF, setViewPDF] = useState(null);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = (e) => {
                setPDFFile(e.target.result);
                setViewPDF(null); // Reset viewPDF when a new file is selected
            };
        } else {
            setPDFFile(null);
            setViewPDF(null);
            console.log("Please select a valid PDF file.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pdfFile) {
            setViewPDF(pdfFile);
        } else {
            console.log("No PDF file selected.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-group">
                <input type="file" className="form-control" onChange={handleChange} />
                <button type="submit" className="btn btn-success mt-2">View PDF</button>
            </form>
            <h2>View PDF</h2>
            {viewPDF && (
                <div className="pdf-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={viewPDF} plugins={[defaultLayoutPlugin()]} />
                    </Worker>
                </div>
            )}
        </div>
    );
}

export default PDFViewer;
