import React from "react";
import { useFetchJobs } from "./useFetchJobs";
import { Container } from "react-bootstrap";
function App() {
  const { jobs, loading, err } = useFetchJobs();

  return (
    <Container>
      {loading && <h1>Loading</h1>}
      {err && <h1>err</h1>}
      <h1>{jobs.length}</h1>
    </Container>
  );
}
export default App;
