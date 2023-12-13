import bigStar from "public/testimonial/bigStar.svg";
import bleed from "public/testimonial/bleed.svg";
import flower from "public/testimonial/flower.svg";
import stars from "public/testimonial/stars.svg";

export const testimonials = [
  {
    name: "Aarav Patel",
    reputation: "Software Engineer",
    content:
      "The online physiotherapy services on this website exceeded my expectations. The virtual sessions were convenient, and the personalized treatment plan helped me experience significant improvement in my mobility and well-being.",
    decorations: [
      {
        name: "stars",
        animation: "wobble",
        src: stars,
        styles: {
          top: "-50px",
          bottom: "unset",
          left: "-50px",
          right: "unset",
        },
      },
      {
        name: "bigStar",
        animation: "spin",
        src: bigStar,
        styles: {
          top: "unset",
          bottom: "-50px",
          left: "unset",
          right: "-50px",
        },
      },
      {
        name: "bleed",
        animation: "",
        src: bleed,
        styles: {
          width: "60px",
          top: "-45px",
          bottom: "unset",
          left: "unset",
          right: "-50px",
        },
      },
      {
        name: "flower",
        animation: "pulse",
        src: flower,
        styles: {
          top: "unset",
          bottom: "-250px",
          left: "-100px",
          right: "unset",
        },
      },
    ],
  },

  {
    name: "Nisha Sharma",
    reputation: "Graphic Designer",
    content:
      "I'm impressed with the effectiveness of the online physiotherapy provided here. The knowledgeable physiotherapists tailored a customized plan that addressed my specific needs, making my rehabilitation journey both efficient and enjoyable.",
    style: {
      
    },
  },

  {
    name: "Raj Singh",
    reputation: "Financial Analyst",
    content:
      "The platform's user-friendly interface and skilled physiotherapists made online sessions seamless and effective. I appreciate the dedication of the professionals behind this website, offering valuable insights and support throughout my entire recovery process.",
  },
];
