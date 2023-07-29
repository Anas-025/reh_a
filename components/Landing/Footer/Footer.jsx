import { TfiFacebook, TfiLinkedin, TfiTwitterAlt } from "react-icons/tfi";

const FooterList = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-3 text-[#FFF] md:py-6 ml-10 md:ml-0">
      <h4 className="font-bold">{title}</h4>
      {links?.map((link) => (
        <p key={link.name} className="hover:text-[#aaa] cursor-pointer">
          {link.name}
        </p>
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
    <div className="mt-24 pt-14 pb-8 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#1F1F1F] to-[#262626] absolute w-full">
      <div className="flex flex-col gap-10 w-full md:w-[95%] lg:w-[85%] m-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-4">
          <FooterList
            title="Product"
            links={[
              { name: "Employee Database", link: "" },
              { name: "Payroll", link: "" },
              { name: "Absences", link: "" },
              { name: "Time tracking", link: "" },
              { name: "Shift planner", link: "" },
              { name: "Recruiting", link: "" },
            ]}
          />
          <FooterList
            title="Information"
            links={[
              { name: "FAQ", link: "" },
              { name: "Blog", link: "" },
              { name: "Support", link: "" },
            ]}
          />
          <FooterList
            title="Company"
            links={[
              { name: "About us", link: "" },
              { name: "Careers", link: "" },
              { name: "Contact us", link: "" },
              { name: "Lift Media", link: "" },
            ]}
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
