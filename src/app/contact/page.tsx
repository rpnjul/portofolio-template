import Link from "next/link";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { IoMailOutline } from "react-icons/io5";

const Contact = () => {
    const contact = [
      {
        link: "https://github.com/rpnjul",
        icon: <FaGithub />,
        label: "Github",
      },
      {
        link: "https://www.linkedin.com/in/satriaaprilian18/",
        icon: <FaLinkedin />,
        label: "Linkedin",
      },
      {
        link: "https://discord.com/users/471581847227203594",
        icon: <FaDiscord />,
        label: "Discord",
      },
    ];
    const contactLink = [
      {
        link: "#",
        icon: <GrLocationPin />,
        label: "Jakarta, Indonesia",
      },
      {
        link: "mailto:satriaaprilian18@gmail.com",
        icon: <IoMailOutline />,
        label: "satriaaprilian18@gmail.com",
      },
      {
        link: "https://wa.me/62895371529602",
        icon: <FaWhatsapp />,
        label: "+62 8953 7152 9602",
      },
      {
        link: "https://instagram.com/sssssatria",
        icon: <FaInstagram />,
        label: "@sssssatria",
      },
    ];
    return (
      <>
        <div className="card">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row w-full justify-between gap-2">
              <h1 className="unset text-4xl" style={{ margin: 0 }}>
                Satria Aprilian
              </h1>
              <div className="flex gap-2 justify-end" style={{ margin: 0 }}>
                {contact.map((v, i) => (
                  <Link
                    key={i}
                    href={v.link}
                    target="_blank"
                    aria-label={v.label}
                    data-toggle="tooltip"
                    title={v.label}
                  >
                    <div
                      className="card"
                      style={{ padding: 10, lineHeight: 0, margin: 0 }}
                    >
                      <div className="w-[20px] h-[20px]">{v.icon}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-0 mt-4">
            {contactLink.map((v, i) => {
              if (v.link == "#") {
                return (
                  <div className="flex justify-start items-center mt-4" key={i}>
                    <div className="h-[20px] w-[20px] custom mr-2">
                      {v.icon}
                    </div>
                    <span className="w-fit" style={{ margin: 0 }}>
                      {v.label}
                    </span>
                  </div>
                );
              }
              return (
                <Link
                  className="flex justify-start items-center mt-4"
                  key={i}
                  href={v.link}
                  target="_blank"
                  style={{ color: "#fff" }}
                >
                  <div className="h-[20px] w-[20px] custom mr-2">{v.icon}</div>
                  <span className="w-fit" style={{ margin: 0 }}>
                    {v.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-8">
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/cv.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
          >
            <button
              className="cursor-pointer bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border hover-gray-500 hover:border-transparent rounded-lg w-full"
            >
              Hire Me
            </button>
          </a>
        </div>
      </>
    );
}

export default Contact;