import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { AiOutlineDownload } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import manualPdf from './Manual.pdf';
import manualPdf2 from './Manual2.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ManualUsuario = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Container fluid className="manual-section text-center p-4">
        <Row className="justify-content-center mb-4">
          <Button
            variant="primary"
            href={manualPdf}
            download="Manual.pdf"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Manual
          </Button>
        </Row>

        <Row className="justify-content-center mb-4">
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Document file={manualPdf2} className="d-flex justify-content-center">
              <Page 
                pageNumber={1} 
                width={width > 1000 ? 1000 : width * 0.8} // Adjust width for smaller screens
              />
            </Document>
          </div>
        </Row>
      </Container>
      <footer className="footerHome">
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

export default ManualUsuario;
