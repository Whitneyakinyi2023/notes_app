import React, { useState, useRef, useEffect } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

const ANNOTATION_COLOR = '#FF4081'; // Update annotation color for a futuristic look

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        width: '80%',
        maxWidth: '800px',
        textAlign: 'center',
        paddingTop: theme.spacing(4),
    },
    pdfContainer: {
        position: 'relative',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
    },
    annotation: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: ANNOTATION_COLOR,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.2)',
        },
    },
}));

function PDFViewer() {
    const classes = useStyles();
    const [pdfFile, setPDFFile] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            const reader = new FileReader();
            setLoading(true);
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e) => {
                setPDFFile(e.target.result);
                setLoading(false);
            };
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
        <div className={classes.container}>
            <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept=".pdf"
                style={{ display: 'none' }} // Hide default file input styling
                id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
                <Tooltip title="Upload PDF" placement="right">
                    <IconButton component="span">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-upload"
                        >
                            <path d="M16 16l-4-4-4 4M12 12v9"></path>
                            <path d="M12 3v9"></path>
                            <path d="M21 12h-9"></path>
                        </svg>
                    </IconButton>
                </Tooltip>
            </label>
            {pdfFile && (
                <Tooltip title="Clear PDF" placement="right">
                    <IconButton
                        onClick={() => setPDFFile(null)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#FF4081' }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            )}
            <h2>View PDF</h2>
            {loading ? (
                <div className={classes.pdfContainer}>
                    <CircularProgress />
                </div>
            ) : (
                <div className={classes.pdfContainer}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPlugin()]} />
                    </Worker>
                    <canvas
                        ref={handleCanvasRef}
                        onClick={handleCanvasClick}
                        className={classes.canvas}
                    />
                    {annotations.length > 0 && (
                        <div className="annotations">
                            {annotations.map((annotation, index) => (
                                <div
                                    key={index}
                                    className={classes.annotation}
                                    style={{
                                        left: `${annotation.x - 5}px`,
                                        top: `${annotation.y - 5}px`,
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
