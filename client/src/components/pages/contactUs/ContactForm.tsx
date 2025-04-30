import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [result, setResult] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "573a7c48-7b84-41c8-b49b-c7e8eee147dc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST", 
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="firstName" className="text-sm text-gray-700 mb-1">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label htmlFor="lastName" className="text-sm text-gray-700 mb-1">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-700 mb-1">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="JohnDoe@mail.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="text-sm text-gray-700 mb-1">Your Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="For crochet pattern xxx, I'm stuck on step #3..."
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Submit
      </button>

      <div>
        {result}
      </div>
      
    </form>
  );
};

export default ContactForm;
