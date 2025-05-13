import React, { useState } from 'react';
import { contactUsString } from '../../../assets/strings/contactUs';

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

  const formAccessKey = process.env.REACT_APP_WEB3FORM_KEY!;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", formAccessKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST", 
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult(contactUsString.CONTACT_FORM_SUCCESS_MESSAGE);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    } else {
      console.log("Error", data.message);
      setResult(contactUsString.CONTACT_FORM_FAILURE_MESSAGE);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl pb-4 pt-4 space-y-4">
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="firstName" className="mb-1"> {contactUsString.CONTACT_FORM_LABEL_FIRST_NAME} </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label htmlFor="lastName" className="mb-1"> {contactUsString.CONTACT_FORM_LABEL_LAST_NAME} </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1"> {contactUsString.CONTACT_FORM_LABEL_EMAIL_ADDRESS} </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" className="mb-1"> {contactUsString.CONTACT_FORM_LABEL_YOUR_MSG} </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 p-2 mb-1 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-800 transition"
      >
        {contactUsString.CONTACT_FORM_LABEL_SUBMIT_BUTTON}
      </button>

      <div>
        {result}
      </div>

    </form>
  );
};

export default ContactForm;
