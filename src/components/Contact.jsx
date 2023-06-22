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
      <h1 className="text-3xl font-bold text-center mb-8">Contact</h1>
      {error && (
        <p className="text-red-500 mb-4 text-xl">{error}</p>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className={`border p-2 w-full ${touched.name && !values.name ? 'border-red-500' : ''}`}
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
          required
        />
        {touched.name && !values.name && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`border p-2 w-full ${touched.email && !values.email ? 'border-red-500' : ''}`}
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
          required
        />
        {touched.email && !values.email && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      <div className="mb-4">
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
      </div>

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
        className={`bg-blue-500 text-white py-2 px-4 rounded-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={
          isLoading || !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}