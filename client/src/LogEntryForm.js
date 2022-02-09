import {useState} from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API.js";

function LogEntryForm({location, onClose}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      data.lat = location.lat;
      data.long = location.long;
      const created = await createLogEntry(data);
      console.log(created)
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false)
    }
  }

  return(
      <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
        {error ? <h3>{error}</h3> : null }
        <label htmlFor="title" >Title</label>
        <input type="text" {...register('title', { required: true })} />
        <label htmlFor="comments">Comments</label>
        <textarea {...register('comments')} rows="3" ></textarea>
        <label htmlFor="visitDate" required>Visit Date</label>
        <input type="date" {...register('visitDate')}  />
        <button disabled={loading} > {loading ? "Loading..." : "Create Entry"} </button>
      </form>
  );
}

export default LogEntryForm;
