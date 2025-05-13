import Header from "../../navigation/Header";
import ContactForm from "./ContactForm";
import { contactUsString } from '../../../assets/strings/contactUs';

const ContactUs = () => {
    const intro_1 = contactUsString.INTRO_PARAGRAPH_1;
    const [beforeLink1, rest] = intro_1.split("{link1}");
    const [betweenLinks, afterLink2] = rest.split("{link2}");

    const intro_2 = contactUsString.INTRO_PARAGRAPH_2;
    const [beforeBold, boldAndAfter] = intro_2.split("<strong>");
    const [boldText, afterBold] = boldAndAfter.split("</strong>");

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="pt-12 px-20">
                <div className="mt-6 flex flex-col lg:flex-row gap-12">

                
                    <div className="lg:w-1/2 space-y-4">


                        <div className="text-4xl font-bold mb-2">
                            {contactUsString.CONTACT_US_PAGE_TITLE}
                        </div>
                        
                        <p>
                        {beforeLink1}
                        <a
                            href={contactUsString.VIDEO_1_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {contactUsString.VIDEO_1_STRING}
                        </a>
                        {betweenLinks}
                        <a
                            href={contactUsString.VIDEO_2_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {contactUsString.VIDEO_2_STRING}
                        </a>
                        {afterLink2}
                        </p>

                        <p>
                        {beforeBold}
                        <strong className="font-semibold">{boldText}</strong>
                        {afterBold}
                        </p>
                    </div>

                    <div className="lg:w-1/2">
                        <ContactForm />
                    </div>

                </div> 
            </div>
        </div>
    );
};

export default ContactUs;