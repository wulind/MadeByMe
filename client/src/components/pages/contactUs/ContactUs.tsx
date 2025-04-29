import React from 'react';
import Header from "../../navigation/Header";
import ContactForm from "./ContactForm";
import "./ContactUs.css";

const ContactUs = () => {
    return (
        <div className="ContactUsPage">
            <Header />

            <div className="titleSection">
                <h2>
                    We are here for you!
                </h2>
            
                <div className="contactUsTextBlock">
                    <p>
                        We know that reading crochet patterns can be tricky, especially if you're just starting out. To help you get comfortable, we’ve linked a couple of helpful YouTube videos that explain how to read crochet patterns step by step:&nbsp;<a href="https://www.youtube.com/watch?v=rRM5C7C2sFI" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video 1</a> 
                        &nbsp;and&nbsp;<a href="https://www.youtube.com/watch?v=PZ8uV2-Z-Qg" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video 2</a>.
                    </p>

                    <p>
                    That said, we're only human—and sometimes our patterns may be unclear or contain mistakes. If you ever run into confusion or something doesn’t seem right, please don’t hesitate to reach out. We're always here to help. And when you do finish a project, we’d love to see it! Tag us on Instagram with <strong>#madeByStudiosMadeByMe</strong> so we can admire your work, cheer you on, and offer guidance or feedback if you’d like.
                    </p>
                </div> 
            </div>

        <ContactForm />
        
        </div>
    );
};

export default ContactUs;