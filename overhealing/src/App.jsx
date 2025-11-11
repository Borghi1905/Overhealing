import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const [burnout, setBurnout] = useState(false);

  return <Home burnout={burnout} setBurnout={setBurnout} />;
}
