import ExpComponent from "@/components/common/ExpComponent";
import "../../styles/pages/about.css"
const About = () => {
    return (
      <>
        <h1>About me</h1>
        <p className="my-8">
            I have been engaged in professional Web Development for several years.
            I create Full-Stack websites with a minimalist look and speed. I also
            focus on website accessibility, website optimization and SEO.
        </p>
        <p className="my-8">
            I like <strong>minimalism</strong>. I stand by the fact that the
            website should not be full of ads and trackers and completely useless
            JavaScript. On the other hand, I understand that sometimes a complex
            website hard to do without a lot of JavaScript. I also use React
            sometimes.
        </p>
        <p className="my-8">
            But I stand by the fact that{" "}
            <strong>
                it is possible to make a good website even without JavaScript
            </strong>
            . For example this one. This site is completely JavaScript-free.
            (except for Cloudflare email protection, so you won’t see my email
            without JS)
        </p>
        <div className="mt-16">
            <ExpComponent />
        </div>
        <div className="mt-16">
            
        </div>
      </>
    );
}

export default About;