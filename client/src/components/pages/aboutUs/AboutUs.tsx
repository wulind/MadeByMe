import React from 'react';
import Header from "../../navigation/Header";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="AboutUsPage"> 
        <Header />

        <div className="titleSection">
            <h2> About Us </h2>
            <div className="introTextBlock">
                <p>
                    Welcome to Made By Studios! We’re two friends who turned a shared hobby into something much more. Our journey began with a simple ball of yarn and a desire to make something meaningful with our hands. Late-night crafting sessions quickly became our favorite creative escape, and over time, crocheting evolved into a true passion. What started as gifting handmade items to friends and family soon sparked the idea to share our designs with a broader community.
                </p>

                <p>
                    At Made By Studios, we're driven by a love for all things handmade — especially cozy, cute, and heartfelt creations. Our goal is not only to share our own crochet patterns, but to inspire others to make them their own. The name Made By Studios reflects that vision: the patterns are made by us, but the magic happens when you bring them to life. Whether it’s a keychain with a personal twist or a wearable crafted for someone special, we love seeing how each creation carries a unique story.
                </p>

                <p>
                    We truly want this to be more than just a pattern shop — we hope to build a creative, uplifting space where makers of all levels can connect, share experiences, and support one another. We’d love to hear your stories, see your interpretations, and grow together as a community. Whether you're just picking up a hook for the first time or have years of experience, we're so glad you're here. Thank you for joining us on this journey — we can’t wait to see what you’ll make!
                </p>
            </div>
        </div>
        
        <div className="aboutUsContainer">
            <div className="textComponent">
                <h2> Linda </h2>
                <p className="handle">@linda.wu723</p>
                <p className="subheader">5+ year crochet experience, 100+ items crafted</p>
                <p className="description">
                    Linda discovered her passion for crocheting through a blend of hobbies and shared experiences with friends and family. What began as a casual interest soon blossomed into a heartfelt craft, as she found joy in creating cozy, fashionable pieces for the people she loves. Whether it’s a warm scarf for a sibling or a stylish accessory for a friend (& pet friend!), Linda pours care and creativity into every stitch. She focuses on making beautiful, functional items that are both comforting and stylish—always aiming to design projects that are not only impressive but also easy to follow, so others can enjoy the process as much as the final product.
                </p>
            </div>

            <div className="imageSection">
                <img src="/images/aboutUs2.jpg" />
            </div>
        </div>

        <div className="aboutUsContainer">
            <div className="imageSection">
                <img src="/images/aboutUs1.jpeg" />
            </div>

            <div className="textComponent">
                <h2> Junning </h2>
                <p className="handle">@attackonjun</p>
                <p className="subheader">2+ year crochet experience, 40+ items created</p>
                <p className="description">
                    Junning found her love for crochet through a fun activity with a friend, and from that moment on, she was hooked. What started as a simple pastime quickly turned into a growing passion, as she continued learning new stitches and techniques. Junning enjoys creating small, thoughtful items like keychains and cozy wearables that bring warmth and joy to her loved ones. She focuses on crafting pieces that are not only meaningful but also beginner-friendly, using her knowledge to design patterns that are easy to follow and fun to make. Always inspired and curious, Junning is excited to keep exploring new ideas and sharing them with others who are just starting their crochet journey.
                </p>
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
