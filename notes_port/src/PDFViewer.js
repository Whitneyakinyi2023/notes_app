import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ANNOTATION_COLOR = 'red'; // Define annotation color as a constant

function PDFViewer() {
    const [pdfFile, setPDFFile] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const canvasRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = (e) => setPDFFile(e.target.result);
        } else {
            setPDFFile(null);
            console.log('Please select a valid PDF file.');
        }
    };

    const handleAnnotationClick = (annotation) => {
        // Implement logic to handle clicking an annotation (e.g., show details)
        console.log('Annotation clicked:', annotation);
    };

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setAnnotations([...annotations, { x, y }]);
    };

    const drawAnnotations = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        annotations.forEach((annotation) => {
            ctx.beginPath();
            ctx.arc(annotation.x, annotation.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = ANNOTATION_COLOR;
            ctx.fill();
        });
    };

    const handleCanvasRef = (canvas) => {
        if (canvas) {
            canvasRef.current = canvas;
            const ctx = canvas.getContext('2d');
            drawAnnotations(ctx);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawAnnotations(ctx);
        }
    }, [annotations]);

    return (
        <div className="container">
            <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                <input type="file" className="form-control" onChange={handleFileChange} accept=".pdf" />
                <button type="button" className="btn btn-success mt-2" onClick={() => setPDFFile(null)}>
                    Clear PDF
                </button>
            </form>
            <h2>View PDF</h2>
            {pdfFile && (
                <div className="pdf-container" style={{ position: 'relative' }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPlugin()]} />
                    </Worker>
                    <canvas
                        ref={handleCanvasRef}
                        onClick={handleCanvasClick}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto', // Allow clicks on the canvas
                        }}
                    />
                    {annotations.length > 0 && (
                        <div className="annotations">
                            {annotations.map((annotation, index) => (
                                <div
                                    key={index} // Use unique identifier for each annotation
                                    className="annotation"
                                    style={{
                                        position: 'absolute',
                                        left: `${annotation.x - 5}px`, // Center the circle
                                        top: `${annotation.y - 5}px`, // Center the circle
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: ANNOTATION_COLOR,
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleAnnotationClick(annotation)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PDFViewer;
