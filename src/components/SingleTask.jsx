import  { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SingleTask() {
  const { id } = useParams();
  const [data, setData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { authenticationToken } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/task/getSingleTask/${id}`, {
        headers: {
          Authorization: authenticationToken,
        },
      });
      setData(response.data);
      console.log(response.data);
      
    } catch (err) {
      console.error("Error fetching single task:", err);
      setError("Failed to fetch the task.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!data) {
    return <h2>No task found.</h2>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.task}</p>
    </div>
  );
}

export default SingleTask;
