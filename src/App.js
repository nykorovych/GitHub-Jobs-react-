import React, { useState } from "react";
import { useFetchJobs } from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, err } = useFetchJobs(params, page);

  return (
    <Container>
      {loading && <h1>Loading</h1>} 
      {err && <h1>err</h1>}
      {<h1>{jobs.map(job => {
        return <Job key={job.id} job={job}></Job>
      })}</h1>}
    </Container>
  );
}
export default App;
