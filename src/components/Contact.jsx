import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      // Display success message
      alert("Message sent successfully.");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h1 className="text-2xl font-bold text-center p-4">Let's work together</h1>
      {error && (
        <p className="text-red-500 mb-4 text-xl">{error}</p>
      )}
      <form className='max-w-[600px] m-auto'>
      <div className="grid grid-cols-2 gap-2">
        <input
          id="name"
          name="name"
          type="text"
          className={`border shadow-lg p-3 ${touched.name && !values.name ? 'border-red-500' : ''}`}
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder='Name' 
          required
        />
        {touched.name && !values.name && (
          <p className="text-red-500 mt-1">Required</p>
        )}
        <input
          id="email"
          name="email"
          type="email"
          className={`border p-2 w-full ${touched.email && !values.email ? 'border-red-500' : ''}`}
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder='Emai' 
          required
        />
        {touched.email && !values.email && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>


        <label htmlFor="subject" className="block mb-2 font-semibold">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={`border p-2 w-full ${touched.subject && !values.subject ? 'border-red-500' : ''}`}
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
          required
        />
        {touched.subject && !values.subject && (
          <p className="text-red-500 mt-1">Required</p>
        )}

      <div className="mb-4">
        <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`border p-2 w-full ${touched.message && !values.message ? 'border-red-500' : ''}`}
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
          required
        />
        {touched.message && !values.message && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      <button
        className={`bg-blue-500 border shadow-lg p-3 w-full mt-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={
          isLoading || !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      </form>
    </div>
  );
}