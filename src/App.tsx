import { useEffect } from "react";
import { getTodaySummary } from "./api/weatherApi";

const App = () => {
  useEffect(() => {
    getTodaySummary("Delhi")
      .then(console.log)
      .catch(console.error);
  }, []);

  return <div className="p-8 text-xl">Weather Intelligence Dashboard</div>;
};

export default App;
