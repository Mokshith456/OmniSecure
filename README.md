# OmniSecure

## Solution Overview and Objectives

### Overview
OmniSecure is a privacy-first security suite designed to protect end users from accidental data exposure and malicious content during real-time communications and digital interactions.

### Objectives
- **Real-time Privacy Protection:** Detect and blur sensitive information ("help" keywords, PII) on live video streams and screens.
- **Phishing Detection:** Analyze SMS and email content to score for phishing risk, generate human-readable explanations, and produce PDF reports.
- **Rapid Alerting:** Use Twilio API to notify guardians or admins when suspicious messages are detected.

## Tech Stack

- **Frontend:**
  - React (Vite) for a responsive web dashboard and attacker/client panels.
  - CSS Modules for theming (light/dark mode).
- **Backend Services:**
  - Flask for REST API providing SMS simulation and phishing detection.
  - Python libraries: `requests`, `re`, `urllib.parse` for text analysis.
  - Groq API integration for generating synthetic SMS and explanations.
  - Twilio API for alert messaging.
- **Real-time Blur Engine:**
  - Python + OpenCV + mss for screen capture and rendering.
  - PaddleOCR for text detection.
- **Reporting:**
  - FPDF for PDF generation of detection reports.
- **Storage:**
  - Local file system for storing PDF reports.
- **Deployment & Dev Tools:**
  - Vite for frontend build.
  - `pip` virtual environment for Python dependencies.
  - Docker (future).

## Architecture Diagram

Use draw.io to import the XML below:

```xml
<mxfile host=\"app.diagrams.net\">
 <diagram name=\"OmniSecure Architecture\">
  <mxGraphModel dx=\"827\" dy=\"533\" grid=\"1\" gridSize=\"10\">
    <root>
      <mxCell id=\"0\"/>
      <mxCell id=\"1\" parent=\"0\"/>
      <!-- React Frontend -->
      <mxCell id=\"2\" value=\"React Frontend\" style=\"rounded=1;fillColor=#e1f5fe;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"40\" y=\"40\" width=\"160\" height=\"80\" as=\"geometry\"/>
      </mxCell>
      <!-- Flask API -->
      <mxCell id=\"3\" value=\"Flask Backend\" style=\"rounded=1;fillColor=#fff9c4;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"260\" y=\"40\" width=\"160\" height=\"80\" as=\"geometry\"/>
      </mxCell>
      <!-- Privacy Blur Service -->
      <mxCell id=\"4\" value=\"Privacy Blur Service\" style=\"rounded=1;fillColor=#c8e6c9;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"480\" y=\"40\" width=\"160\" height=\"80\" as=\"geometry\"/>
      </mxCell>
      <!-- Groq API -->
      <mxCell id=\"5\" value=\"Groq LLM API\" style=\"rounded=1;fillColor=#ffe0b2;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"260\" y=\"160\" width=\"160\" height=\"60\" as=\"geometry\"/>
      </mxCell>
      <!-- Twilio API -->
      <mxCell id=\"6\" value=\"Twilio SMS API\" style=\"rounded=1;fillColor=#d1c4e9;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"260\" y=\"250\" width=\"160\" height=\"60\" as=\"geometry\"/>
      </mxCell>
      <!-- Storage -->
      <mxCell id=\"7\" value=\"Local FS Reports\" style=\"rounded=1;fillColor=#f8bbd0;\" vertex=\"1\" parent=\"1\">
        <mxGeometry x=\"480\" y=\"160\" width=\"160\" height=\"60\" as=\"geometry\"/>
      </mxCell>
      <!-- Connectors -->
      <mxCell id=\"8\" style=\"edgeStyle=orthogonalEdgeStyle;endArrow=classic;\" edge=\"1\" source=\"2\" target=\"3\" parent=\"1\">
        <mxGeometry as=\"geometry\"/>
      </mxCell>
      <mxCell id=\"9\" style=\"edgeStyle=orthogonalEdgeStyle;endArrow=classic;\" edge=\"1\" source=\"3\" target=\"5\" parent=\"1\">
        <mxGeometry as=\"geometry\"/>
      </mxCell>
      <mxCell id=\"10\" style=\"edgeStyle=orthogonalEdgeStyle;endArrow=classic;\" edge=\"1\" source=\"3\" target=\"6\" parent=\"1\">
        <mxGeometry as=\"geometry\"/>
      </mxCell>
      <mxCell id=\"11\" style=\"edgeStyle=orthogonalEdgeStyle;endArrow=classic;\" edge=\"1\" source=\"3\" target=\"7\" parent=\"1\">
        <mxGeometry as=\"geometry\"/>
      </mxCell>
      <mxCell id=\"12\" style=\"edgeStyle=orthogonalEdgeStyle;endArrow=classic;\" edge=\"1\" source=\"2\" target=\"4\" parent=\"1\">
        <mxGeometry as=\"geometry\"/>
      </mxCell>
    </root>
  </mxGraphModel>
 </diagram>
</mxfile>
```

## Implementation Challenges and Resolutions

- **Real-time OCR Performance**  
  *Challenge:* PaddleOCR on CPU yields latency.  
  *Resolution:* Implement GPU support and region-of-interest filtering to blur only sensitive keywords.
- **False Positives in Phishing Detection**  
  *Challenge:* Generic keywords may flag benign messages.  
  *Resolution:* Tuned scoring thresholds and aggregated keywords vs. link-based scoring.
- **API Rate Limits**  
  *Challenge:* Groq and Twilio quotas constrain live demos.  
  *Resolution:* Added caching for generated SMS and batched alerting.
- **Cross-Origin Requests (CORS)**  
  *Challenge:* Frontend fetch blocked by CORS.  
  *Resolution:* Enabled `flask_cors` on all endpoints.

## Future Scope and Productionization Plan

- **Scalability**  
  - Containerize services with Docker & Kubernetes.  
  - Migrate PDF storage to S3 or database.
- **Advanced Privacy Protections**  
  - Expand blur filters to detect PII (emails, SSNs) using regex/NER.
- **Machine Learning Integration**  
  - Train custom phishing classifier for higher accuracy.
- **Monitoring & Logging**  
  - Integrate Prometheus & Grafana for metrics, ELK stack for logs.
- **Authentication & Access Control**  
  - Add OAuth2 for user login and role-based dashboards.
- **Deployment**  
  - CI/CD pipeline with GitHub Actions, automated tests, and blue/green deploy.

----

`README.md` should now serve as both documentation and a starting point for onboarding new developers and stakeholders.
