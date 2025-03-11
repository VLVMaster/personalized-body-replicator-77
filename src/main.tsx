
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we're grabbing the correct root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Set up the root element to take full width
if (rootElement) {
  rootElement.style.width = "100%";
  rootElement.style.height = "100%";
  rootElement.style.margin = "0";
  rootElement.style.padding = "0";
}

const root = createRoot(rootElement);
root.render(<App />);
