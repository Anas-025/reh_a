import { TfiFacebook, TfiLinkedin, TfiTwitterAlt } from "react-icons/tfi";

const FooterList = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-3 text-[#FFF] md:py-6 ml-10 md:ml-0">
      <h4 className="font-bold">{title}</h4>
      {links?.map((link) => (
        <a href={link.link}>
          <p key={link.name} className="hover:text-[#aaa] cursor-pointer">
            {link.name}
          </p>
        </a>
      ))}
    </div>
  );
};

const FooterIcon = ({ Icon }) => {
  return (
    <div className="rounded-full border-[1.5px] border-[#aaa] w-[35px] h-[35px] flex flex-row items-center justify-center hover:bg-[#fff] text-[#aaa] hover:border-[#fff] cursor-pointer">
      {Icon && <Icon />}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-24 pt-14 pb-8 md:py-24 px-4 md:px-8 bg-[black] absolute w-full">
      <div className="flex flex-col gap-10 w-full md:w-[95%] lg:w-[85%] m-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-4">
          <FooterList
            title="Menu"
            links={[
              { name: "App", link: "/app" },
              { name: "About us", link: "/about" },
              { name: "Services", link: "#services" },
              { name: "Sign in", link: "/sigin" },
            ]}
          />
          <FooterList
            title="Information"
            links={[
              { name: "Blog", link: "/blogs" },
              { name: "Support", link: "" },
            ]}
          />
          <FooterList
            title="Reh a"
            links={[{ name: "Contact us", link: "/contact" }]}
          />
        </div>
        <div className="h-[1px] bg-[#eee] border-none"></div>
        <div className="text-[#FFF] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-row gap-10">
            <span className="hover:text-[#aaa] cursor-pointer">Terms</span>
            <span className="hover:text-[#aaa] cursor-pointer">Privacy</span>
            <span className="hover:text-[#aaa] cursor-pointer">Cookies</span>
          </div>
          <div className="flex flex-row gap-4">
            <FooterIcon Icon={() => <TfiLinkedin />} />
            <FooterIcon Icon={() => <TfiFacebook />} />
            <FooterIcon Icon={() => <TfiTwitterAlt />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
