'use client';
import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Loading from '@/component/Loading';

// Define the type for the form data
interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const ContactForm: React.FC = () => {

const [loading, setLoading] = useState<boolean>(false)

if(!loading){
 <Loading />
}

useEffect(()=>{
  setLoading(true)
},[])
  // Ref for the form
  const form = useRef<HTMLFormElement>(null);

  // Send email function
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_a74p3lq',  // Replace with your Service ID
          'template_rj9o3gh',  // Replace with your Template ID
          form.current,
          'Xw7wXCrT-U-eXZ5UI'    // Replace with your Public Key
        )
        .then(
          (result) => {
            alert('Message sent successfully!');
            console.log(result.text);
          },
          (error) => {
            alert('Error sending message, please try again.');
            console.log(error.text);
          }
        );

      // Reset the form after submission
      form.current.reset();
    }
  };

  return (
    <div className="bg-[#140c1c] rounded-lg p-4 sm:p-10">
      <h1 className="text-bg text-2xl md:text-3xl lg:text-[2.5rem] font-bold">Let's Work Together</h1>
      <p className="text-gray-200 mt-3 lg:text-base md:text-sm text-xs">Got an idea or a project in mind? Let's make it happen!</p>
      <form ref={form} onSubmit={sendEmail} className="mt-8 block w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200/15 outline-none w-full"
          />
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200/15 outline-none w-full"
          />
        </div>
        <div className="flex flex-col mt-5 md:flex-row items-center justify-between gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200/15 outline-none w-full"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200/15 outline-none w-full"
          />
        </div>
        <div className="relative w-full mt-5">
          <select
            name="service"
            defaultValue=""
            className="w-full bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.5px] border-gray-200/15 outline-none appearance-none"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Frontend">Frontend Development</option>
            <option value="Backend">Backend Development</option>
            <option value="Fullstack">FullStack Development</option>
          </select>
        </div>
        <textarea
          name="message"
          rows={7}
          placeholder="Message"
          className="w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.5px] border-gray-200/15 outline-none"
        />
        <div className="mt-4">
          <button type="submit" className="px-8 py-3.5 bg-[#7947df] text-white hover:bg-[#5c2fb7] transition-all duration-150 rounded-full">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
