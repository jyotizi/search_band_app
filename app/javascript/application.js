// Entry point for the build script in your package.json
import "@hotwired/turbo-rails";
import "./controllers";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import Bands from "./components/BandSearch";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Bands />);
}
