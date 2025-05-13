import Header from "../../navigation/Header";
import { aboutUsStrings } from '../../../assets/strings/aboutUs';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        <Header />

        <div className="pt-12 px-20">
            <h2 className="text-4xl font-bold mb-2"> {aboutUsStrings.ABOUT_US_TITLE} </h2>
            <div className="mb-2 mt-2 space-y-4">
                <p> {aboutUsStrings.INTRO_PARAGRAPH_1} </p>
                <p> {aboutUsStrings.INTRO_PARAGRAPH_2} </p>
                <p> {aboutUsStrings.INTRO_PARAGRAPH_3} </p>
            </div>
        </div>
        
        <div className="flex flex-col items-center text-left gap-16 pt-16 px-20 flex-wrap md:flex-row md:items-start">
            <div className="flex flex-1 flex-col">
                <h2 className="text-4xl font-bold mb-2"> {aboutUsStrings.PROFILE_1_NAME} </h2>
                <a
                    href={aboutUsStrings.PROFILE_1_IG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block max-w-max px-3 py-1 text-base font-medium text-white bg-gray-600 rounded-full hover:bg-gray-700 transition"
                >
                    {aboutUsStrings.PROFILE_1_HANDLE}
                </a>
                <p className="mb-2 mt-2">{aboutUsStrings.PROFILE_1_SUBHEADER}</p>
                <p className="leading-relax">
                    {aboutUsStrings.PROFILE_1_PARAGRAPH}
                </p>
            </div>

            <img 
                className="w-full max-w-[600px] aspect-[1.5/1] object-cover rounded-md"
                src="/images/aboutUs1.jpg" 
            />
        </div>

        <div className="flex flex-col items-center text-left gap-16 pt-16 pb-16 px-20 flex-wrap md:flex-row md:items-start">
            <img 
                className="w-full max-w-[600px] aspect-[1.5/1] object-cover rounded-md"
                src="/images/aboutUs2.jpg" 
            />
            
            <div className="flex flex-1 flex-col">
                <h2 className="text-4xl font-bold mb-2"> {aboutUsStrings.PROFILE_2_NAME} </h2>
                <a
                    href={aboutUsStrings.PROFILE_2_IG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block max-w-max px-3 py-1 text-base font-medium text-white bg-gray-600 rounded-full hover:bg-gray-700 transition"
                >
                    {aboutUsStrings.PROFILE_2_HANDLE}
                </a>
                <p className="mb-2 mt-2">{aboutUsStrings.PROFILE_2_SUBHEADER}</p>
                <p className="leading-relax">
                    {aboutUsStrings.PROFILE_2_PARAGRAPH}
                </p>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
